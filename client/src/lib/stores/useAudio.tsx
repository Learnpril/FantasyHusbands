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
          // Create sophisticated medieval fantasy soundscape
          const createInstrument = (frequency: number, startTime: number, duration: number, type: 'bass' | 'chord' | 'melody' | 'arp', volume: number = 0.05) => {
            const oscillator = context.createOscillator();
            const gainNode = context.createGain();
            const filterNode = context.createBiquadFilter();
            
            oscillator.connect(filterNode);
            filterNode.connect(gainNode);
            gainNode.connect(context.destination);
            
            oscillator.frequency.setValueAtTime(frequency, startTime);
            
            // Different instrument timbres
            switch (type) {
              case 'bass':
                oscillator.type = 'sawtooth';
                filterNode.type = 'lowpass';
                filterNode.frequency.setValueAtTime(300, startTime);
                break;
              case 'chord':
                oscillator.type = 'triangle';
                filterNode.type = 'bandpass';
                filterNode.frequency.setValueAtTime(800, startTime);
                break;
              case 'melody':
                oscillator.type = 'sine';
                filterNode.type = 'highpass';
                filterNode.frequency.setValueAtTime(400, startTime);
                // Add vibrato for more organic sound
                const vibrato = context.createOscillator();
                const vibratoGain = context.createGain();
                vibrato.frequency.setValueAtTime(5, startTime);
                vibratoGain.gain.setValueAtTime(10, startTime);
                vibrato.connect(vibratoGain);
                vibratoGain.connect(oscillator.frequency);
                vibrato.start(startTime);
                vibrato.stop(startTime + duration);
                break;
              case 'arp':
                oscillator.type = 'square';
                filterNode.type = 'lowpass';
                filterNode.frequency.setValueAtTime(1200, startTime);
                // Add resonance for more character
                filterNode.Q.setValueAtTime(5, startTime);
                break;
            }
            
            // Dynamic envelope based on instrument type
            gainNode.gain.setValueAtTime(0, startTime);
            if (type === 'bass') {
              gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.05);
              gainNode.gain.setValueAtTime(volume * 0.8, startTime + duration - 0.2);
              gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
            } else if (type === 'arp') {
              gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.01);
              gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);
            } else {
              gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.1);
              gainNode.gain.linearRampToValueAtTime(volume * 0.6, startTime + duration - 0.5);
              gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
            }
            
            oscillator.start(startTime);
            oscillator.stop(startTime + duration);
          };
          
          // Medieval fantasy chord progression (Am - F - C - G - Dm - Am - E - Am)
          const playFantasyProgression = (startTime: number) => {
            const chordDuration = 1.5;
            
            // Chord 1: Am (A minor) - mysterious opening
            createInstrument(110, startTime, chordDuration * 2, 'bass', 0.04); // A2
            createInstrument(220, startTime + 0.1, chordDuration, 'chord', 0.025); // A3
            createInstrument(261.63, startTime + 0.2, chordDuration, 'chord', 0.02); // C4
            createInstrument(329.63, startTime + 0.3, chordDuration, 'chord', 0.018); // E4
            // Arpeggiated pattern
            createInstrument(440, startTime + 0.4, 0.3, 'arp', 0.015); // A4
            createInstrument(523.25, startTime + 0.8, 0.3, 'arp', 0.012); // C5
            createInstrument(659.25, startTime + 1.2, 0.3, 'arp', 0.01); // E5
            
            // Chord 2: F major - hopeful lift
            const t1 = startTime + chordDuration;
            createInstrument(87.31, t1, chordDuration * 2, 'bass', 0.04); // F2
            createInstrument(174.61, t1 + 0.1, chordDuration, 'chord', 0.025); // F3
            createInstrument(220, t1 + 0.2, chordDuration, 'chord', 0.02); // A3
            createInstrument(261.63, t1 + 0.3, chordDuration, 'chord', 0.018); // C4
            createInstrument(349.23, t1 + 0.4, 0.3, 'arp', 0.015); // F4
            createInstrument(440, t1 + 0.8, 0.3, 'arp', 0.012); // A4
            
            // Chord 3: C major - bright resolution
            const t2 = startTime + chordDuration * 2;
            createInstrument(65.41, t2, chordDuration * 2, 'bass', 0.04); // C2
            createInstrument(130.81, t2 + 0.1, chordDuration, 'chord', 0.025); // C3
            createInstrument(164.81, t2 + 0.2, chordDuration, 'chord', 0.02); // E3
            createInstrument(196, t2 + 0.3, chordDuration, 'chord', 0.018); // G3
            createInstrument(261.63, t2 + 0.4, 0.3, 'arp', 0.015); // C4
            createInstrument(329.63, t2 + 0.8, 0.3, 'arp', 0.012); // E4
            createInstrument(392, t2 + 1.2, 0.3, 'arp', 0.01); // G4
            
            // Chord 4: G major - return to mystery
            const t3 = startTime + chordDuration * 3;
            createInstrument(98, t3, chordDuration * 2, 'bass', 0.04); // G2
            createInstrument(196, t3 + 0.1, chordDuration, 'chord', 0.025); // G3
            createInstrument(246.94, t3 + 0.2, chordDuration, 'chord', 0.02); // B3
            createInstrument(293.66, t3 + 0.3, chordDuration, 'chord', 0.018); // D4
            
            // Chord 5: Dm (D minor) - deeper mystery
            const t4 = startTime + chordDuration * 4;
            createInstrument(73.42, t4, chordDuration * 2, 'bass', 0.04); // D2
            createInstrument(146.83, t4 + 0.1, chordDuration, 'chord', 0.025); // D3
            createInstrument(174.61, t4 + 0.2, chordDuration, 'chord', 0.02); // F3
            createInstrument(220, t4 + 0.3, chordDuration, 'chord', 0.018); // A3
            createInstrument(293.66, t4 + 0.4, 0.3, 'arp', 0.015); // D4
            createInstrument(349.23, t4 + 0.8, 0.3, 'arp', 0.012); // F4
            
            // Chord 6: Am - return home
            const t5 = startTime + chordDuration * 5;
            createInstrument(110, t5, chordDuration * 2, 'bass', 0.04); // A2
            createInstrument(220, t5 + 0.1, chordDuration, 'chord', 0.025); // A3
            createInstrument(261.63, t5 + 0.2, chordDuration, 'chord', 0.02); // C4
            createInstrument(329.63, t5 + 0.3, chordDuration, 'chord', 0.018); // E4
            
            // Chord 7: E major - tension before resolution
            const t6 = startTime + chordDuration * 6;
            createInstrument(82.41, t6, chordDuration, 'bass', 0.04); // E2
            createInstrument(164.81, t6 + 0.1, chordDuration, 'chord', 0.025); // E3
            createInstrument(207.65, t6 + 0.2, chordDuration, 'chord', 0.02); // G#3
            createInstrument(246.94, t6 + 0.3, chordDuration, 'chord', 0.018); // B3
            
            // Final Am - peaceful resolution with melody
            const t7 = startTime + chordDuration * 7;
            createInstrument(110, t7, chordDuration * 2, 'bass', 0.04); // A2
            createInstrument(220, t7 + 0.1, chordDuration * 1.5, 'chord', 0.025); // A3
            createInstrument(261.63, t7 + 0.2, chordDuration * 1.5, 'chord', 0.02); // C4
            createInstrument(329.63, t7 + 0.3, chordDuration * 1.5, 'chord', 0.018); // E4
            // Beautiful ending melody
            createInstrument(440, t7 + 0.4, 0.4, 'melody', 0.018); // A4
            createInstrument(523.25, t7 + 0.8, 0.4, 'melody', 0.016); // C5
            createInstrument(440, t7 + 1.2, 0.6, 'melody', 0.014); // A4
          };
          
          // Play the medieval fantasy progression and loop
          const loopMusic = () => {
            const now = context.currentTime;
            playFantasyProgression(now);
            
            // Schedule next loop (12 seconds for full progression)
            setTimeout(() => {
              if (get().isBackgroundMusicPlaying) {
                loopMusic();
              }
            }, 12000); // 12 second loop for richer progression
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
    
    // Handle background music based on mute state
    if (!newMutedState && !get().isMusicMuted) {
      get().playBackgroundMusic();
    } else {
      get().stopBackgroundMusic();
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
    
    // If unmuting music, start playing it
    if (!newMutedState && !get().isMuted) {
      get().playBackgroundMusic();
    } else {
      get().stopBackgroundMusic();
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
    
    console.log(`🎤 Original text for ${characterId}: "${text}"`);
    
    // Filter out action text in asterisks - only speak the dialogue
    const cleanText = text.replace(/\*[^*]*\*/g, '').trim();
    
    console.log(`🎤 Filtered text for ${characterId}: "${cleanText}"`);
    
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
        console.log(`🎤 Speaking as ${characterId}: "${cleanText}"`);
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