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
  isMuted: true, // Start muted by default
  masterVolume: 1.0,
  musicVolume: 0.7,
  soundVolume: 0.8,
  voiceVolume: 0.9,
  ambientVolume: 0.6,
  
  // Playback state
  isVoicePlaying: false,
  currentVoiceId: null,
  
  // Setters
  setBackgroundMusic: (music) => set({ backgroundMusic: music }),
  setAmbientSound: (sound) => set({ ambientSound: sound }),
  setHitSound: (sound) => set({ hitSound: sound }),
  setSuccessSound: (sound) => set({ successSound: sound }),
  setButtonHoverSound: (sound) => set({ buttonHoverSound: sound }),
  setButtonClickSound: (sound) => set({ buttonClickSound: sound }),
  setPageTransitionSound: (sound) => set({ pageTransitionSound: sound }),
  setCharacterVoice: (characterId, voice) => {
    const { characterVoices } = get();
    set({ 
      characterVoices: { 
        ...characterVoices, 
        [characterId]: voice 
      } 
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
  
  playHit: () => {
    const { hitSound, isMuted, soundVolume, masterVolume } = get();
    if (hitSound && !isMuted) {
      const soundClone = hitSound.cloneNode() as HTMLAudioElement;
      soundClone.volume = soundVolume * masterVolume * 0.5;
      soundClone.play().catch(error => {
        console.log("Hit sound play prevented:", error);
      });
    }
  },
  
  playSuccess: () => {
    const { successSound, isMuted, soundVolume, masterVolume } = get();
    if (successSound && !isMuted) {
      successSound.currentTime = 0;
      successSound.volume = soundVolume * masterVolume * 0.6;
      successSound.play().catch(error => {
        console.log("Success sound play prevented:", error);
      });
    }
  },
  
  playButtonHover: () => {
    const { buttonHoverSound, isMuted, soundVolume, masterVolume } = get();
    if (buttonHoverSound && !isMuted) {
      const soundClone = buttonHoverSound.cloneNode() as HTMLAudioElement;
      soundClone.volume = soundVolume * masterVolume * 0.3;
      soundClone.play().catch(error => {
        console.log("Button hover sound play prevented:", error);
      });
    }
  },
  
  playButtonClick: () => {
    const { buttonClickSound, isMuted, soundVolume, masterVolume } = get();
    if (buttonClickSound && !isMuted) {
      const soundClone = buttonClickSound.cloneNode() as HTMLAudioElement;
      soundClone.volume = soundVolume * masterVolume * 0.4;
      soundClone.play().catch(error => {
        console.log("Button click sound play prevented:", error);
      });
    }
  },
  
  playPageTransition: () => {
    const { pageTransitionSound, isMuted, soundVolume, masterVolume } = get();
    if (pageTransitionSound && !isMuted) {
      pageTransitionSound.currentTime = 0;
      pageTransitionSound.volume = soundVolume * masterVolume * 0.5;
      pageTransitionSound.play().catch(error => {
        console.log("Page transition sound play prevented:", error);
      });
    }
  },
  
  playCharacterVoice: (characterId: string, dialogueId: string) => {
    const { 
      characterVoices, 
      currentVoice, 
      isMuted, 
      voiceVolume, 
      masterVolume 
    } = get();
    
    // Stop current voice if playing
    if (currentVoice) {
      currentVoice.pause();
      currentVoice.currentTime = 0;
    }
    
    // Try to find character-specific voice file
    const voiceKey = `${characterId}_${dialogueId}`;
    let voiceAudio = characterVoices[voiceKey];
    
    // Fallback to character generic voice
    if (!voiceAudio) {
      voiceAudio = characterVoices[characterId];
    }
    
    if (voiceAudio && !isMuted) {
      voiceAudio.currentTime = 0;
      voiceAudio.volume = voiceVolume * masterVolume;
      
      set({ 
        currentVoice: voiceAudio,
        isVoicePlaying: true,
        currentVoiceId: voiceKey
      });
      
      // Setup event listeners
      voiceAudio.onended = () => {
        set({ 
          isVoicePlaying: false,
          currentVoiceId: null
        });
      };
      
      voiceAudio.onerror = () => {
        console.log(`Voice playback error for ${voiceKey}`);
        set({ 
          isVoicePlaying: false,
          currentVoiceId: null
        });
      };
      
      voiceAudio.play().catch(error => {
        console.log(`Voice play prevented for ${voiceKey}:`, error);
        set({ 
          isVoicePlaying: false,
          currentVoiceId: null
        });
      });
    }
  },
  
  stopVoice: () => {
    const { currentVoice } = get();
    if (currentVoice) {
      currentVoice.pause();
      currentVoice.currentTime = 0;
      set({ 
        isVoicePlaying: false,
        currentVoiceId: null
      });
    }
  },
  
  pauseVoice: () => {
    const { currentVoice } = get();
    if (currentVoice) {
      currentVoice.pause();
      set({ isVoicePlaying: false });
    }
  },
  
  resumeVoice: () => {
    const { currentVoice, isMuted } = get();
    if (currentVoice && !isMuted) {
      currentVoice.play().catch(error => {
        console.log("Voice resume prevented:", error);
      });
      set({ isVoicePlaying: true });
    }
  },
  
  playAmbient: (soundKey: string) => {
    const { ambientSound, isMuted, ambientVolume, masterVolume } = get();
    
    // Stop current ambient sound
    if (ambientSound) {
      ambientSound.pause();
    }
    
    // Create new ambient audio
    const newAmbient = new Audio(`/sounds/ambient/${soundKey}.mp3`);
    newAmbient.loop = true;
    newAmbient.volume = ambientVolume * masterVolume;
    newAmbient.muted = isMuted;
    
    set({ ambientSound: newAmbient });
    
    if (!isMuted) {
      newAmbient.play().catch(error => {
        console.log(`Ambient sound play prevented for ${soundKey}:`, error);
      });
    }
  },
  
  stopAmbient: () => {
    const { ambientSound } = get();
    if (ambientSound) {
      ambientSound.pause();
      set({ ambientSound: null });
    }
  }
}));