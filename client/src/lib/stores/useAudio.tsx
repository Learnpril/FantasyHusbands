import { create } from "zustand";

interface AudioState {
  // Web Audio API context for programmatic sound generation
  audioContext: AudioContext | null;
  
  // Single background music system
  backgroundMusic: HTMLAudioElement | null;
  isBackgroundMusicPlaying: boolean;
  
  // Volume controls
  isMuted: boolean;
  isMusicMuted: boolean;
  masterVolume: number;
  musicVolume: number;
  voiceVolume: number;
  
  // Voice playback state (text-to-speech only)
  isVoicePlaying: boolean;
  currentVoiceId: string | null;
  
  // Control functions
  initAudioContext: () => void;
  
  // Background music controls
  playBackgroundMusic: () => void;
  stopBackgroundMusic: () => void;
  toggleBackgroundMusic: () => void;
  
  // Volume controls
  setMasterVolume: (volume: number) => void;
  setMusicVolume: (volume: number) => void;
  setVoiceVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleMusicMute: () => void;
  
  // Simple UI sound effects (programmatically generated)
  playButtonHover: () => void;
  playButtonClick: () => void;
  playSuccess: () => void;
  
  // Voice acting (text-to-speech)
  playCharacterVoice: (characterId: string, text: string) => void;
  stopVoice: () => void;
  pauseVoice: () => void;
  resumeVoice: () => void;
}

export const useAudio = create<AudioState>((set, get) => ({
  // Initial state
  audioContext: null,
  backgroundMusic: null,
  isBackgroundMusicPlaying: false,
  
  // Volume controls
  isMuted: false,
  isMusicMuted: false,
  masterVolume: 0.7,
  musicVolume: 0.5,
  voiceVolume: 0.8,
  
  // Voice state
  isVoicePlaying: false,
  currentVoiceId: null,
  
  // Initialize Web Audio API context
  initAudioContext: () => {
    const { audioContext } = get();
    if (!audioContext) {
      const context = new (window.AudioContext || (window as any).webkitAudioContext)();
      set({ audioContext: context });
      
      // Create a simple fantasy background music using Web Audio API
      const createFantasyMusicLoop = () => {
        if (!context) return;
        
        try {
          // Create a simple, pleasant background loop
          const createTone = (frequency: number, startTime: number, duration: number, volume: number = 0.05) => {
            const oscillator = context.createOscillator();
            const gainNode = context.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(context.destination);
            
            oscillator.frequency.setValueAtTime(frequency, startTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0, startTime);
            gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.1);
            gainNode.gain.linearRampToValueAtTime(volume * 0.7, startTime + duration - 0.5);
            gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
            
            oscillator.start(startTime);
            oscillator.stop(startTime + duration);
          };
          
          // Simple fantasy chord progression
          const playChord = (startTime: number) => {
            // Am chord (A-C-E)
            createTone(220, startTime, 2, 0.03); // A3
            createTone(261.63, startTime, 2, 0.025); // C4
            createTone(329.63, startTime, 2, 0.02); // E4
            
            // F chord (F-A-C) 
            createTone(174.61, startTime + 2, 2, 0.03); // F3
            createTone(220, startTime + 2, 2, 0.025); // A3
            createTone(261.63, startTime + 2, 2, 0.02); // C4
            
            // C chord (C-E-G)
            createTone(130.81, startTime + 4, 2, 0.03); // C3
            createTone(164.81, startTime + 4, 2, 0.025); // E3
            createTone(196, startTime + 4, 2, 0.02); // G3
            
            // G chord (G-B-D)
            createTone(98, startTime + 6, 2, 0.03); // G2
            createTone(123.47, startTime + 6, 2, 0.025); // B2
            createTone(146.83, startTime + 6, 2, 0.02); // D3
          };
          
          // Play the progression and loop
          const loopMusic = () => {
            const now = context.currentTime;
            playChord(now);
            
            // Schedule next loop
            setTimeout(() => {
              if (get().isBackgroundMusicPlaying) {
                loopMusic();
              }
            }, 8000); // 8 second loop
          };
          
          return loopMusic;
        } catch (error) {
          console.log('Failed to create fantasy music:', error);
          return null;
        }
      };
      
      const musicLoop = createFantasyMusicLoop();
      set({ backgroundMusic: musicLoop as any });
      console.log('🎵 Fantasy music system created with Web Audio API');
      
      console.log('🎵 Audio system initialized with fantasy soundtrack');
    }
  },
  
  // Background music controls
  playBackgroundMusic: () => {
    const { backgroundMusic, isMusicMuted, isMuted } = get();
    if (backgroundMusic && !isMusicMuted && !isMuted) {
      set({ isBackgroundMusicPlaying: true });
      (backgroundMusic as any)(); // Call the music loop function
      console.log('🎵 Fantasy soundtrack started');
    }
  },
  
  stopBackgroundMusic: () => {
    set({ isBackgroundMusicPlaying: false });
    console.log('🎵 Fantasy soundtrack stopped');
  },
  
  toggleBackgroundMusic: () => {
    const { isBackgroundMusicPlaying } = get();
    if (isBackgroundMusicPlaying) {
      get().stopBackgroundMusic();
    } else {
      get().playBackgroundMusic();
    }
  },
  
  // Volume controls
  setMasterVolume: (volume) => {
    set({ masterVolume: volume });
    const { backgroundMusic, musicVolume } = get();
    if (backgroundMusic) {
      backgroundMusic.volume = musicVolume * volume;
    }
  },
  
  setMusicVolume: (volume) => {
    set({ musicVolume: volume });
    const { backgroundMusic, masterVolume } = get();
    if (backgroundMusic) {
      backgroundMusic.volume = volume * masterVolume;
    }
  },
  
  setVoiceVolume: (volume) => set({ voiceVolume: volume }),
  
  toggleMute: () => {
    const newMutedState = !get().isMuted;
    set({ isMuted: newMutedState });
    
    const { backgroundMusic } = get();
    if (backgroundMusic) {
      backgroundMusic.muted = newMutedState;
    }
    
    if (window.speechSynthesis.speaking) {
      if (newMutedState) {
        window.speechSynthesis.pause();
      } else {
        window.speechSynthesis.resume();
      }
    }
    
    console.log(`Audio ${newMutedState ? 'muted' : 'unmuted'}`);
  },
  
  toggleMusicMute: () => {
    const newMutedState = !get().isMusicMuted;
    set({ isMusicMuted: newMutedState });
    
    const { backgroundMusic } = get();
    if (backgroundMusic) {
      backgroundMusic.muted = newMutedState || get().isMuted;
    }
    
    console.log(`Music ${newMutedState ? 'muted' : 'unmuted'}`);
  },
  
  // Simple UI sound effects using Web Audio API
  playButtonHover: () => {
    const { audioContext, isMuted, masterVolume } = get();
    if (!audioContext || isMuted) return;
    
    try {
      // Create a brief soft tone for hover
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1 * masterVolume, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      console.log('Button hover sound failed:', error);
    }
  },
  
  playButtonClick: () => {
    const { audioContext, isMuted, masterVolume } = get();
    if (!audioContext || isMuted) return;
    
    try {
      // Create a click sound
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.15 * masterVolume, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.15);
    } catch (error) {
      console.log('Button click sound failed:', error);
    }
  },
  
  playSuccess: () => {
    const { audioContext, isMuted, masterVolume } = get();
    if (!audioContext || isMuted) return;
    
    try {
      // Create a pleasant success chime
      const frequencies = [523, 659, 784]; // C5, E5, G5 chord
      
      frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
        
        const startTime = audioContext.currentTime + (index * 0.1);
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.1 * masterVolume, startTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + 0.4);
      });
    } catch (error) {
      console.log('Success sound failed:', error);
    }
  },
  
  // Text-to-speech voice acting
  playCharacterVoice: (characterId: string, text: string) => {
    const { voiceVolume, isMuted } = get();
    
    if (isMuted || voiceVolume === 0) {
      console.log(`🔇 Voice muted for ${characterId}`);
      return;
    }
    
    // Stop any current speech
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    
    // Filter out action text in asterisks - only speak the dialogue
    const cleanText = text.replace(/\\*[^*]*\\*/g, '').trim();
    
    if (!cleanText) {
      console.log(`No dialogue to speak for ${characterId} after filtering actions`);
      return;
    }
    
    // Create speech synthesis utterance
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Wait for voices to load if needed
    const configureAndSpeak = (voices: SpeechSynthesisVoice[]) => {
      let selectedVoice = null;
      
      // Find masculine voices - prioritize explicitly male voices
      const explicitMaleVoices = voices.filter(voice => 
        voice.lang.startsWith('en') && 
        (voice.name.toLowerCase().includes('male') || 
         voice.name.toLowerCase().includes('man'))
      );
      
      // Find deep-voiced male names
      const deepMaleVoices = voices.filter(voice => 
        voice.lang.startsWith('en') && 
        (voice.name.toLowerCase().includes('david') ||
         voice.name.toLowerCase().includes('daniel') ||
         voice.name.toLowerCase().includes('james') ||
         voice.name.toLowerCase().includes('thomas') ||
         voice.name.toLowerCase().includes('aaron') ||
         voice.name.toLowerCase().includes('mark') ||
         voice.name.toLowerCase().includes('paul') ||
         voice.name.toLowerCase().includes('mike') ||
         voice.name.toLowerCase().includes('john') ||
         voice.name.toLowerCase().includes('alex'))
      );
      
      // Combine for maximum masculine voice selection
      const maleVoices = [...explicitMaleVoices, ...deepMaleVoices];
      
      // Assign different voices to each character
      switch (characterId) {
        case 'akira':
          // Deep, authoritative voice
          selectedVoice = maleVoices.find(voice => 
            voice.name.toLowerCase().includes('david') || 
            voice.name.toLowerCase().includes('daniel')
          ) || maleVoices[0] || voices.find(voice => voice.lang.startsWith('en'));
          utterance.pitch = 0.8; // Deep voice
          break;
        case 'felix':
          // Charming, masculine voice - prioritize explicit male voices
          selectedVoice = explicitMaleVoices.find(voice => 
            voice.name.toLowerCase().includes('male')
          ) || deepMaleVoices.find(voice => 
            voice.name.toLowerCase().includes('alex') || 
            voice.name.toLowerCase().includes('mark') ||
            voice.name.toLowerCase().includes('james')
          ) || maleVoices[1] || voices.find(voice => voice.lang.startsWith('en'));
          utterance.pitch = 0.75; // Much deeper, masculine voice
          break;
        case 'dante':
          // Romantic, refined voice
          selectedVoice = maleVoices.find(voice => 
            voice.name.toLowerCase().includes('thomas') || 
            voice.name.toLowerCase().includes('paul')
          ) || maleVoices[2] || voices.find(voice => voice.lang.startsWith('en'));
          utterance.pitch = 0.85; // Refined voice
          break;
        case 'kai':
          // Deep, mysterious masculine voice
          selectedVoice = explicitMaleVoices.find(voice => 
            voice.name.toLowerCase().includes('male')
          ) || deepMaleVoices.find(voice => 
            voice.name.toLowerCase().includes('aaron') || 
            voice.name.toLowerCase().includes('mike') ||
            voice.name.toLowerCase().includes('david')
          ) || maleVoices[3] || voices.find(voice => voice.lang.startsWith('en'));
          utterance.pitch = 0.65; // Very deep, mysterious voice
          break;
        case 'ryuu':
          // Strong, confident masculine English voice
          selectedVoice = explicitMaleVoices.find(voice => 
            voice.name.toLowerCase().includes('male')
          ) || deepMaleVoices.find(voice => 
            voice.name.toLowerCase().includes('james') || 
            voice.name.toLowerCase().includes('john') ||
            voice.name.toLowerCase().includes('daniel') ||
            voice.name.toLowerCase().includes('thomas')
          ) || maleVoices[4] || voices.find(voice => voice.lang.startsWith('en'));
          utterance.pitch = 0.75; // Deep, confident masculine voice
          break;
        case 'zephyr':
          // Intelligent, sophisticated voice
          selectedVoice = maleVoices.find(voice => 
            voice.name.toLowerCase().includes('daniel') || 
            voice.name.toLowerCase().includes('david')
          ) || maleVoices[5] || voices.find(voice => voice.lang.startsWith('en'));
          utterance.pitch = 0.95; // Sophisticated voice
          break;
        default:
          selectedVoice = maleVoices[0] || voices.find(voice => voice.lang.startsWith('en'));
          utterance.pitch = 0.9;
      }
      
      // Set normal pace for all characters
      utterance.rate = 1.0;
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      
      utterance.volume = voiceVolume;
      
      // Set up event listeners
      utterance.onstart = () => {
        set({ 
          isVoicePlaying: true,
          currentVoiceId: `${characterId}_tts`
        });
        console.log(`🎤 Speaking as ${characterId}: "${cleanText.substring(0, 50)}..."`);
      };
      
      utterance.onend = () => {
        set({ 
          isVoicePlaying: false,
          currentVoiceId: null
        });
      };
      
      utterance.onerror = (error) => {
        console.log(`Speech error for ${characterId}:`, error);
        set({ 
          isVoicePlaying: false,
          currentVoiceId: null
        });
      };
      
      // Speak the text
      window.speechSynthesis.speak(utterance);
    };
    
    // Get voices and configure
    let voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      configureAndSpeak(voices);
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        voices = window.speechSynthesis.getVoices();
        configureAndSpeak(voices);
      };
    }
  },
  
  stopVoice: () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    set({ 
      isVoicePlaying: false,
      currentVoiceId: null
    });
  },
  
  pauseVoice: () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      set({ isVoicePlaying: false });
    }
  },
  
  resumeVoice: () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      set({ isVoicePlaying: true });
    }
  }
}));