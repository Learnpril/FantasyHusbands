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
    
    if (window.speechSynthesis && window.speechSynthesis.speaking) {
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
  
  // Universal voice acting using Web Audio API (works on all devices)
  playCharacterVoice: (characterId: string, text: string) => {
    const { voiceVolume, isMuted } = get();
    
    if (isMuted || voiceVolume === 0) {
      console.log(`🔇 Voice muted for ${characterId}`);
      return;
    }
    
    console.log(`🎤 Original text for ${characterId}: "${text}"`);
    
    // Filter out action text in asterisks - only speak the dialogue
    const cleanText = text.replace(/\*[^*]*\*/g, '').trim();
    
    console.log(`🎤 Filtered text for ${characterId}: "${cleanText}"`);
    
    if (!cleanText) {
      console.log(`No dialogue to speak for ${characterId} after filtering actions`);
      return;
    }
    
    // Use Web Audio API for universal compatibility
    const context = get().audioContext;
    if (!context) {
      console.log(`🚫 Audio context not available for voice synthesis`);
      return;
    }
    
    // Stop any current voice playback
    if (get().currentVoiceId) {
      get().stopVoice();
    }
    
    // Character voice profiles - each has unique frequency and timing characteristics
    const voiceProfiles = {
      'akira': { 
        baseFreq: 120, // Deep, authoritative knight
        formants: [150, 300, 450],
        pace: 0.15, // Slower, more deliberate
        modulation: 3,
        resonance: 8
      },
      'felix': { 
        baseFreq: 160, // Bright, energetic mage
        formants: [200, 400, 600], 
        pace: 0.12, // Quick and lively
        modulation: 5,
        resonance: 6
      },
      'dante': { 
        baseFreq: 140, // Smooth, refined poet
        formants: [180, 350, 520],
        pace: 0.14, // Measured, elegant
        modulation: 2,
        resonance: 10
      },
      'kai': { 
        baseFreq: 110, // Mysterious, low shadow
        formants: [130, 280, 420],
        pace: 0.16, // Slow, mysterious
        modulation: 1,
        resonance: 12
      },
      'ryuu': { 
        baseFreq: 150, // Confident dragon tamer
        formants: [170, 340, 510],
        pace: 0.13, // Steady confidence
        modulation: 4,
        resonance: 7
      },
      'zephyr': { 
        baseFreq: 135, // Intellectual scholar
        formants: [165, 330, 495],
        pace: 0.13, // Thoughtful cadence
        modulation: 2,
        resonance: 9
      }
    };
    
    const profile = voiceProfiles[characterId as keyof typeof voiceProfiles] || voiceProfiles['akira'];
    
    // Create realistic speech synthesis using formant frequencies
    const createVoiceSound = (frequency: number, startTime: number, duration: number, isVowel: boolean = true) => {
      const oscillators = [];
      const gainNodes = [];
      const filterNodes = [];
      
      profile.formants.forEach((formant: number, index: number) => {
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
        const filterNode = context.createBiquadFilter();
        
        // Configure formant filter for realistic voice resonance
        filterNode.type = 'bandpass';
        filterNode.frequency.setValueAtTime(formant, startTime);
        filterNode.Q.setValueAtTime(profile.resonance, startTime);
        
        // Set up signal chain
        oscillator.connect(filterNode);
        filterNode.connect(gainNode);
        gainNode.connect(context.destination);
        
        // Configure oscillator with character-specific waveform
        oscillator.type = index === 0 ? 'sawtooth' : 'triangle';
        const harmonic = frequency * (1 + index * 0.2);
        oscillator.frequency.setValueAtTime(harmonic, startTime);
        
        // Add natural vibrato for organic voice quality
        const vibrato = context.createOscillator();
        const vibratoGain = context.createGain();
        vibrato.frequency.setValueAtTime(profile.modulation, startTime);
        vibratoGain.gain.setValueAtTime(harmonic * 0.015, startTime);
        vibrato.connect(vibratoGain);
        vibratoGain.connect(oscillator.frequency);
        
        // Natural voice envelope with character-specific dynamics
        const baseVolume = voiceVolume * 0.08 * (1 - index * 0.25);
        const envelope = isVowel ? 0.8 : 0.4; // Vowels stronger than consonants
        
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(baseVolume * envelope, startTime + 0.03);
        gainNode.gain.linearRampToValueAtTime(baseVolume * envelope * 0.7, startTime + duration - 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        
        // Start oscillators
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
        vibrato.start(startTime);
        vibrato.stop(startTime + duration);
        
        oscillators.push(oscillator);
        gainNodes.push(gainNode);
        filterNodes.push(filterNode);
      });
    };
    
    // Advanced speech synthesis with phoneme approximation
    const synthesizeSpeech = () => {
      const now = context.currentTime;
      let currentTime = now;
      
      const words = cleanText.toLowerCase().split(' ');
      
      words.forEach((word, wordIndex) => {
        for (let i = 0; i < word.length; i++) {
          const char = word[i];
          let frequency = profile.baseFreq;
          let isVowel = false;
          
          // Advanced phoneme mapping for realistic speech patterns
          if ('aeiou'.includes(char)) {
            isVowel = true;
            switch (char) {
              case 'a': frequency = profile.baseFreq * 1.4; break;
              case 'e': frequency = profile.baseFreq * 1.6; break;
              case 'i': frequency = profile.baseFreq * 1.8; break;
              case 'o': frequency = profile.baseFreq * 1.2; break;
              case 'u': frequency = profile.baseFreq * 1.0; break;
            }
          } else if ('bcdfghjklmnpqrstvwxyz'.includes(char)) {
            // Consonant frequency mapping
            switch (char) {
              case 'r': frequency = profile.baseFreq * 0.7; break;
              case 'l': frequency = profile.baseFreq * 0.8; break;
              case 'm': case 'n': frequency = profile.baseFreq * 0.6; break;
              case 's': case 'f': frequency = profile.baseFreq * 1.5; break;
              case 't': case 'k': case 'p': frequency = profile.baseFreq * 0.9; break;
              default: frequency = profile.baseFreq * 0.8; break;
            }
          }
          
          const phonemeDuration = isVowel ? profile.pace * 1.2 : profile.pace * 0.6;
          createVoiceSound(frequency, currentTime, phonemeDuration, isVowel);
          currentTime += profile.pace * 0.8;
        }
        
        // Natural pause between words
        currentTime += profile.pace * 0.8;
      });
      
      // Set voice as playing
      set({ 
        isVoicePlaying: true,
        currentVoiceId: characterId 
      });
      
      console.log(`🎤 Playing universal voice for ${characterId}: "${cleanText}"`);
      
      // Stop voice after completion
      const totalDuration = (currentTime - now) * 1000;
      setTimeout(() => {
        if (get().currentVoiceId === characterId) {
          set({ 
            isVoicePlaying: false,
            currentVoiceId: null 
          });
        }
      }, totalDuration);
    };
    
    synthesizeSpeech();
  },
  
  stopVoice: () => {
    // Stop Web Audio API voice (no browser speech synthesis needed)
    set({ 
      isVoicePlaying: false,
      currentVoiceId: null
    });
  },
  
  pauseVoice: () => {
    // Pause not supported for Web Audio API voice synthesis
    set({ isVoicePlaying: false });
  },
  
  resumeVoice: () => {
    // Resume not supported for Web Audio API voice synthesis
    set({ isVoicePlaying: true });
  }
}));