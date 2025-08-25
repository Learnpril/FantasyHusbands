import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Audio Store - Simplified HTML5 Audio System
 * Handles background music and UI sounds using HTML5 audio elements
 */

interface AudioState {
  // Audio control states
  isMuted: boolean;
  isMusicMuted: boolean;
  volume: number;
  musicVolume: number;
  
  // Audio elements
  backgroundMusic: HTMLAudioElement | null;
  isBackgroundMusicPlaying: boolean;
  
  // Actions
  initAudioSystem: () => void;
  toggleMute: () => void;
  toggleMusicMute: () => void;
  setVolume: (volume: number) => void;
  setMusicVolume: (volume: number) => void;
  playBackgroundMusic: () => void;
  stopBackgroundMusic: () => void;
  playUISound: (soundType: 'click' | 'hover' | 'select') => void;
}

export const useAudio = create<AudioState>()(
  persist(
    (set, get) => ({
      // Initial state
      isMuted: false,
      isMusicMuted: false,
      volume: 0.7,
      musicVolume: 0.6,
      backgroundMusic: null,
      isBackgroundMusicPlaying: false,

      // Initialize audio system
      initAudioSystem: () => {
        const currentState = get();
        if (currentState.backgroundMusic) {
          console.log('🎵 Audio system already initialized');
          return;
        }

        try {
          // Create background music audio element
          const bgMusic = new Audio();
          
          // Set up Whispers of the Vale ambient soundtrack
          bgMusic.src = '/audio/Whispers of the Vale.mp3';
          
          // Handle load errors gracefully
          bgMusic.addEventListener('error', () => {
            console.log('🎵 Whispers of the Vale soundtrack not found - check audio file in /public/audio/');
          });
          
          bgMusic.loop = true;
          bgMusic.volume = currentState.musicVolume;
          bgMusic.preload = 'auto';

          // Handle audio events
          bgMusic.addEventListener('play', () => {
            set({ isBackgroundMusicPlaying: true });
          });

          bgMusic.addEventListener('pause', () => {
            set({ isBackgroundMusicPlaying: false });
          });

          bgMusic.addEventListener('ended', () => {
            set({ isBackgroundMusicPlaying: false });
          });

          set({ backgroundMusic: bgMusic });
          console.log('🎵 Audio system initialized with HTML5 audio');
          console.log('✨ Audio system ready - add music files to /audio folder');
        } catch (error) {
          console.log('Failed to initialize audio system:', error);
        }
      },

      // Toggle all audio
      toggleMute: () => {
        const { isMuted } = get();
        const newMuted = !isMuted;
        set({ isMuted: newMuted });
        
        if (newMuted) {
          get().stopBackgroundMusic();
          console.log('All audio muted');
        } else {
          // Auto-play music when unmuting if it was playing before
          if (!get().isMusicMuted) {
            get().playBackgroundMusic();
          }
          console.log('All audio unmuted');
        }
      },

      // Toggle background music
      toggleMusicMute: () => {
        const { isMusicMuted, isMuted } = get();
        const newMusicMuted = !isMusicMuted;
        set({ isMusicMuted: newMusicMuted });
        
        if (newMusicMuted || isMuted) {
          get().stopBackgroundMusic();
          console.log('Music muted');
        } else {
          get().playBackgroundMusic();
          console.log('Music unmuted');
        }
      },

      // Set master volume
      setVolume: (volume: number) => {
        set({ volume: Math.max(0, Math.min(1, volume)) });
      },

      // Set music volume
      setMusicVolume: (volume: number) => {
        const newVolume = Math.max(0, Math.min(1, volume));
        set({ musicVolume: newVolume });
        
        const { backgroundMusic } = get();
        if (backgroundMusic) {
          backgroundMusic.volume = newVolume;
        }
      },

      // Play background music
      playBackgroundMusic: () => {
        const { backgroundMusic, isMuted, isMusicMuted, isBackgroundMusicPlaying } = get();
        
        if (!backgroundMusic || isMuted || isMusicMuted || isBackgroundMusicPlaying) {
          return;
        }

        try {
          const playPromise = backgroundMusic.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                console.log('🎵 Background music started');
              })
              .catch((error) => {
                console.log('Failed to play background music:', error);
              });
          }
        } catch (error) {
          console.log('Error playing background music:', error);
        }
      },

      // Stop background music
      stopBackgroundMusic: () => {
        const { backgroundMusic } = get();
        
        if (backgroundMusic && !backgroundMusic.paused) {
          backgroundMusic.pause();
          backgroundMusic.currentTime = 0;
          console.log('🎵 Background music stopped');
        }
        
        set({ isBackgroundMusicPlaying: false });
      },

      // Play UI sound effects
      playUISound: (soundType: 'click' | 'hover' | 'select') => {
        const { isMuted, volume } = get();
        
        if (isMuted) return;

        try {
          // Create a new audio element for each sound effect
          const sound = new Audio();
          
          // TODO: Replace with actual sound files
          // sound.src = `/audio/ui-${soundType}.mp3`;
          // Disable placeholder sounds for now
          return;
          
          sound.volume = volume * 0.3; // UI sounds are quieter
          sound.play().catch(() => {
            // Ignore errors for UI sounds
          });
        } catch (error) {
          // Ignore UI sound errors
        }
      },
    }),
    {
      name: 'fantasy-hearts-audio',
      partialize: (state) => ({
        isMuted: state.isMuted,
        isMusicMuted: state.isMusicMuted,
        volume: state.volume,
        musicVolume: state.musicVolume,
      }),
    }
  )
);