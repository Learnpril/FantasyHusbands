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
    const { backgroundMusic } = get();
    
    // Stop ALL existing audio elements that might be background music
    const existingAudio = document.querySelectorAll('audio');
    existingAudio.forEach(audio => {
      if (audio.src.includes('background.mp3') && !audio.paused) {
        audio.pause();
        audio.currentTime = 0;
        audio.src = ''; // Clear source to prevent reuse
      }
    });
    
    // Stop current stored music if exists
    if (backgroundMusic) {
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;
      backgroundMusic.src = '';
    }
    
    set({ backgroundMusic: music });
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
    const { isMusicMuted, backgroundMusic, ambientSound } = get();
    const newMutedState = !isMusicMuted;
    
    set({ isMusicMuted: newMutedState });
    
    // Stop ALL background music if muting
    if (newMutedState) {
      const existingAudio = document.querySelectorAll('audio');
      existingAudio.forEach(audio => {
        if (audio.src.includes('background.mp3')) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
    }
    
    if (backgroundMusic) {
      backgroundMusic.muted = newMutedState;
    }
    if (ambientSound) {
      ambientSound.muted = newMutedState;
    }
    
    console.log(`Music ${newMutedState ? 'muted' : 'unmuted'}`);
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
  
  playCharacterVoice: (characterId: string, dialogueId: string) => {
    const { 
      characterVoices, 
      currentVoice, 
      voiceVolume, 
      masterVolume 
    } = get();
    
    // Stop current voice if playing
    if (currentVoice) {
      currentVoice.pause();
      currentVoice.currentTime = 0;
    }
    
    // Get character voice
    const voiceAudio = characterVoices[characterId];
    
    if (voiceAudio && voiceVolume > 0) {
      try {
        // Reset and configure the audio for maximum audibility
        voiceAudio.currentTime = 0;
        voiceAudio.volume = 1.0; // Max volume for voices to ensure they're heard
        voiceAudio.muted = false; // Never mute voices
        
        // Set state immediately
        set({ 
          currentVoice: voiceAudio,
          isVoicePlaying: true,
          currentVoiceId: `${characterId}_${dialogueId}`
        });
        
        // Setup event listeners
        voiceAudio.onended = () => {
          set({ 
            isVoicePlaying: false,
            currentVoiceId: null
          });
        };
        
        voiceAudio.onerror = (error) => {
          console.log(`Voice error for ${characterId}:`, error);
          set({ 
            isVoicePlaying: false,
            currentVoiceId: null
          });
        };
        
        // Force play the audio with user interaction
        const playPromise = voiceAudio.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            console.log(`🔊 VOICE PLAYING for ${characterId} - you should hear this!`);
          }).catch(error => {
            console.log(`Voice play blocked for ${characterId}:`, error.message);
            set({ 
              isVoicePlaying: false,
              currentVoiceId: null
            });
          });
        }
      } catch (error) {
        console.log(`Voice playback error for ${characterId}:`, error);
        set({ 
          isVoicePlaying: false,
          currentVoiceId: null
        });
      }
    } else {
      console.log(`No voice available for ${characterId} (available: ${Object.keys(characterVoices).join(', ')}, volume: ${voiceVolume})`);
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
  
  // Global music cleanup function
  stopAllMusic: () => {
    const { backgroundMusic, ambientSound } = get();
    
    // Stop ALL audio elements that could be background music
    const existingAudio = document.querySelectorAll('audio');
    existingAudio.forEach(audio => {
      if (audio.src.includes('background.mp3') || audio.src.includes('ambient/')) {
        audio.pause();
        audio.currentTime = 0;
        audio.src = '';
      }
    });
    
    // Clear stored references
    if (backgroundMusic) {
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;
      backgroundMusic.src = '';
    }
    
    if (ambientSound) {
      ambientSound.pause();
      ambientSound.currentTime = 0;
      ambientSound.src = '';
    }
    
    set({ backgroundMusic: null, ambientSound: null });
  },

  playAmbient: (soundKey: string) => {
    const { ambientSound, backgroundMusic, isMusicMuted, ambientVolume, masterVolume } = get();
    
    // Stop ALL existing music first (including background music)
    const existingAudio = document.querySelectorAll('audio');
    existingAudio.forEach(audio => {
      if (audio.src.includes('background.mp3') || audio.src.includes('ambient/')) {
        audio.pause();
        audio.currentTime = 0;
        audio.src = '';
      }
    });
    
    // Stop current stored music
    if (backgroundMusic) {
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;
      backgroundMusic.src = '';
    }
    
    if (ambientSound) {
      ambientSound.pause();
      ambientSound.currentTime = 0;
      ambientSound.src = '';
    }
    
    // Create new ambient audio
    const newAmbient = new Audio(`/sounds/ambient/${soundKey}.mp3`);
    newAmbient.loop = true;
    newAmbient.volume = ambientVolume * masterVolume;
    newAmbient.muted = isMusicMuted;
    
    set({ ambientSound: newAmbient, backgroundMusic: null });
    
    if (!isMusicMuted) {
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