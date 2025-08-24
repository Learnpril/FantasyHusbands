import { create } from "zustand";

interface AudioState {
  // Music and ambient sounds
  backgroundMusic: HTMLAudioElement | null;
  ambientSound: HTMLAudioElement | null;
  
  // UI Sound effects
  hitSound: HTMLAudioElement | null;
  successSound: HTMLAudioElement | null;
  buttonHoverSound: HTMLAudioElement | null;
  buttonClickSound: HTMLAudioElement | null;
  pageTransitionSound: HTMLAudioElement | null;
  
  // Voice acting
  currentVoice: HTMLAudioElement | null;
  characterVoices: Record<string, HTMLAudioElement>;
  
  // Volume controls
  isMuted: boolean;
  isMusicMuted: boolean;
  isSoundMuted: boolean;
  masterVolume: number;
  musicVolume: number;
  soundVolume: number;
  voiceVolume: number;
  ambientVolume: number;
  
  // Current playback state
  isVoicePlaying: boolean;
  currentVoiceId: string | null;
  
  // Setter functions
  setBackgroundMusic: (music: HTMLAudioElement) => void;
  setAmbientSound: (sound: HTMLAudioElement) => void;
  setHitSound: (sound: HTMLAudioElement) => void;
  setSuccessSound: (sound: HTMLAudioElement) => void;
  setButtonHoverSound: (sound: HTMLAudioElement) => void;
  setButtonClickSound: (sound: HTMLAudioElement) => void;
  setPageTransitionSound: (sound: HTMLAudioElement) => void;
  setCharacterVoice: (characterId: string, voice: HTMLAudioElement) => void;
  
  // Volume controls
  setMasterVolume: (volume: number) => void;
  setMusicVolume: (volume: number) => void;
  setSoundVolume: (volume: number) => void;
  setVoiceVolume: (volume: number) => void;
  setAmbientVolume: (volume: number) => void;
  
  // Control functions
  toggleMute: () => void;
  toggleMusicMute: () => void;
  toggleSoundMute: () => void;
  playHit: () => void;
  playSuccess: () => void;
  playButtonHover: () => void;
  playButtonClick: () => void;
  playPageTransition: () => void;
  playCharacterVoice: (characterId: string, dialogueId: string) => void;
  stopVoice: () => void;
  pauseVoice: () => void;
  resumeVoice: () => void;
  playAmbient: (soundKey: string) => void;
  stopAmbient: () => void;
  stopAllMusic: () => void;
}

export const useAudio = create<AudioState>((set, get) => ({
  // Initial state
  backgroundMusic: null,
  ambientSound: null,
  hitSound: null,
  successSound: null,
  buttonHoverSound: null,
  buttonClickSound: null,
  pageTransitionSound: null,
  currentVoice: null,
  characterVoices: {},
  
  // Volume state
  isMuted: false, // Start unmuted so voice can be heard
  isMusicMuted: false,
  isSoundMuted: false,
  masterVolume: 1.0,
  musicVolume: 0.7,
  soundVolume: 0.8,
  voiceVolume: 0.9,
  ambientVolume: 0.6,
  
  // Playback state
  isVoicePlaying: false,
  currentVoiceId: null,
  
  // Setters
  setBackgroundMusic: (music) => {
    // Background music is disabled - reject all attempts to set it
    console.log("🔇 Background music disabled - ignoring setBackgroundMusic call");
    if (music) {
      music.pause();
      music.src = '';
    }
    set({ backgroundMusic: null });
  },
  setAmbientSound: (sound) => set({ ambientSound: sound }),
  setHitSound: (sound) => set({ hitSound: sound }),
  setSuccessSound: (sound) => set({ successSound: sound }),
  setButtonHoverSound: (sound) => set({ buttonHoverSound: sound }),
  setButtonClickSound: (sound) => set({ buttonClickSound: sound }),
  setPageTransitionSound: (sound) => set({ pageTransitionSound: sound }),
  setCharacterVoice: (characterId, voice) => {
    console.log(`🎤 Setting voice for ${characterId}`);
    const { characterVoices } = get();
    const newVoices = { 
      ...characterVoices, 
      [characterId]: voice 
    };
    console.log(`Voice storage updated:`, Object.keys(newVoices));
    set({ 
      characterVoices: newVoices
    });
  },
  
  // Volume controls
  setMasterVolume: (volume) => set({ masterVolume: volume }),
  setMusicVolume: (volume) => set({ musicVolume: volume }),
  setSoundVolume: (volume) => set({ soundVolume: volume }),
  setVoiceVolume: (volume) => set({ voiceVolume: volume }),
  setAmbientVolume: (volume) => set({ ambientVolume: volume }),
  
  toggleMute: () => {
    const { isMuted, backgroundMusic, ambientSound, currentVoice } = get();
    const newMutedState = !isMuted;
    
    set({ isMuted: newMutedState });
    
    // Update volume for currently playing audio
    if (backgroundMusic) {
      backgroundMusic.muted = newMutedState;
    }
    if (ambientSound) {
      ambientSound.muted = newMutedState;
    }
    if (currentVoice) {
      currentVoice.muted = newMutedState;
    }
    
    console.log(`Sound ${newMutedState ? 'muted' : 'unmuted'}`);
  },
  
  toggleMusicMute: () => {
    const { isMusicMuted, ambientSound } = get();
    const newMutedState = !isMusicMuted;
    
    set({ isMusicMuted: newMutedState });
    
    console.log('🔇 Background music disabled - music mute toggle has no effect');
    
    if (ambientSound) {
      ambientSound.muted = newMutedState;
    }
    
    console.log(`Music controls ${newMutedState ? 'muted' : 'unmuted'} (background music disabled)`);
  },
  
  toggleSoundMute: () => {
    const { isSoundMuted } = get();
    const newMutedState = !isSoundMuted;
    
    set({ isSoundMuted: newMutedState });
    
    console.log(`Sound effects ${newMutedState ? 'muted' : 'unmuted'}`);
  },
  
  playHit: () => {
    const { hitSound, isSoundMuted, soundVolume, masterVolume } = get();
    if (hitSound && !isSoundMuted) {
      const soundClone = hitSound.cloneNode() as HTMLAudioElement;
      soundClone.volume = soundVolume * masterVolume * 0.5;
      soundClone.play().catch(error => {
        console.log("Hit sound play prevented:", error);
      });
    }
  },
  
  playSuccess: () => {
    const { successSound, isSoundMuted, soundVolume, masterVolume } = get();
    if (successSound && !isSoundMuted) {
      successSound.currentTime = 0;
      successSound.volume = soundVolume * masterVolume * 0.6;
      successSound.play().catch(error => {
        console.log("Success sound play prevented:", error);
      });
    }
  },
  
  playButtonHover: () => {
    const { buttonHoverSound, isSoundMuted, soundVolume, masterVolume } = get();
    if (buttonHoverSound && !isSoundMuted) {
      const soundClone = buttonHoverSound.cloneNode() as HTMLAudioElement;
      soundClone.volume = soundVolume * masterVolume * 0.3;
      soundClone.play().catch(error => {
        console.log("Button hover sound play prevented:", error);
      });
    }
  },
  
  playButtonClick: () => {
    const { buttonClickSound, isSoundMuted, soundVolume, masterVolume } = get();
    if (buttonClickSound && !isSoundMuted) {
      const soundClone = buttonClickSound.cloneNode() as HTMLAudioElement;
      soundClone.volume = soundVolume * masterVolume * 0.4;
      soundClone.play().catch(error => {
        console.log("Button click sound play prevented:", error);
      });
    }
  },
  
  playPageTransition: () => {
    const { pageTransitionSound, isSoundMuted, soundVolume, masterVolume } = get();
    if (pageTransitionSound && !isSoundMuted) {
      pageTransitionSound.currentTime = 0;
      pageTransitionSound.volume = soundVolume * masterVolume * 0.5;
      pageTransitionSound.play().catch(error => {
        console.log("Page transition sound play prevented:", error);
      });
    }
  },
  
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
    
    // Create speech synthesis utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Wait for voices to load if needed
    const configureAndSpeak = (voices: SpeechSynthesisVoice[]) => {
      let selectedVoice = null;
      
      // Try to find appropriate voices for each character
      switch (characterId) {
      case 'akira':
        selectedVoice = voices.find(voice => 
          voice.name.includes('Male') || voice.name.includes('Daniel') || voice.gender === 'male'
        ) || voices.find(voice => voice.lang.startsWith('en'));
        utterance.pitch = 0.9;
        utterance.rate = 0.9;
        break;
      case 'felix':
        selectedVoice = voices.find(voice => 
          voice.name.includes('Male') || voice.name.includes('Alex') || voice.gender === 'male'
        ) || voices.find(voice => voice.lang.startsWith('en'));
        utterance.pitch = 1.1;
        utterance.rate = 1.0;
        break;
      case 'dante':
        selectedVoice = voices.find(voice => 
          voice.name.includes('Male') || voice.name.includes('Thomas') || voice.gender === 'male'
        ) || voices.find(voice => voice.lang.startsWith('en'));
        utterance.pitch = 0.8;
        utterance.rate = 0.8;
        break;
      case 'kai':
        selectedVoice = voices.find(voice => 
          voice.name.includes('Male') || voice.name.includes('Aaron') || voice.gender === 'male'
        ) || voices.find(voice => voice.lang.startsWith('en'));
        utterance.pitch = 1.0;
        utterance.rate = 1.1;
        break;
      case 'ryuu':
        selectedVoice = voices.find(voice => 
          voice.name.includes('Male') || voice.name.includes('James') || voice.gender === 'male'
        ) || voices.find(voice => voice.lang.startsWith('en'));
        utterance.pitch = 0.85;
        utterance.rate = 0.9;
        break;
      case 'zephyr':
        selectedVoice = voices.find(voice => 
          voice.name.includes('Male') || voice.name.includes('David') || voice.gender === 'male'
        ) || voices.find(voice => voice.lang.startsWith('en'));
        utterance.pitch = 1.05;
        utterance.rate = 0.95;
        break;
        default:
          selectedVoice = voices.find(voice => voice.lang.startsWith('en'));
      }
      
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
        console.log(`🎤 Speaking as ${characterId}: "${text.substring(0, 50)}..."`);
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
  },
  
  // Stop ALL audio completely - no music allowed
  stopAllMusic: () => {
    const { ambientSound, backgroundMusic } = get();
    
    console.log("🔇 FORCIBLY STOPPING ALL AUDIO - no background music allowed");
    
    // Stop EVERY audio element on the page
    const existingAudio = document.querySelectorAll('audio');
    existingAudio.forEach(audio => {
      console.log("🔇 Force stopping audio:", audio.src);
      audio.pause();
      audio.currentTime = 0;
      audio.volume = 0;
      audio.muted = true;
      audio.src = '';
      // Try to remove from DOM
      try {
        if (audio.parentNode) {
          audio.parentNode.removeChild(audio);
        }
      } catch (e) {
        // Ignore removal errors
      }
    });
    
    // Clear all stored audio references
    if (ambientSound) {
      ambientSound.pause();
      ambientSound.currentTime = 0;
      ambientSound.src = '';
    }
    
    if (backgroundMusic) {
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;
      backgroundMusic.src = '';
    }
    
    set({ ambientSound: null, backgroundMusic: null });
  },

  playAmbient: (soundKey: string) => {
    console.log(`🔇 Ambient sound playback disabled - ignoring ${soundKey}`);
    // All ambient sounds are disabled - do nothing
  },
  
  stopAmbient: () => {
    const { ambientSound } = get();
    if (ambientSound) {
      ambientSound.pause();
      set({ ambientSound: null });
    }
  }
}));