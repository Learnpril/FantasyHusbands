import { useEffect } from "react";
import { useAudio } from "./lib/stores/useAudio";
import { GameScene } from "./components/game/GameScene";
import "@fontsource/inter";

function App() {
  const { 
    setBackgroundMusic, 
    setHitSound, 
    setSuccessSound, 
    setButtonHoverSound,
    setButtonClickSound,
    setPageTransitionSound,
    setCharacterVoice,
    isMuted,
    isMusicMuted 
  } = useAudio();

  // Initialize audio on component mount - singleton pattern with global flag
  useEffect(() => {
    // Global singleton flag to prevent multiple initializations
    if (window.fantasyHeartsAudioInitialized) {
      console.log("🎵 Audio system already exists globally, skipping initialization");
      return;
    }

    // Mark as initialized globally to prevent future initializations
    window.fantasyHeartsAudioInitialized = true;

    const initAudio = () => {
      console.log("🎵 Creating singleton audio system...");
      
      // Absolutely destroy any existing background music
      const existingAudio = document.querySelectorAll('audio');
      existingAudio.forEach(audio => {
        if (audio.src.includes('background.mp3')) {
          audio.pause();
          audio.currentTime = 0;
          audio.src = '';
          if (audio.parentNode) {
            audio.parentNode.removeChild(audio);
          }
        }
      });
      
      // Create THE ONLY background music instance
      const bgMusic = new Audio('/sounds/background.mp3');
      bgMusic.loop = true;
      bgMusic.volume = 0.3;
      bgMusic.id = 'singleton-background-music';
      
      // Store globally to prevent re-creation
      window.singletonBackgroundMusic = bgMusic;
      
      setBackgroundMusic(bgMusic);

      // Sound effects - initialize only once
      const hitSfx = new Audio('/sounds/hit.mp3');
      hitSfx.volume = 0.5;
      setHitSound(hitSfx);

      const successSfx = new Audio('/sounds/success.mp3');
      successSfx.volume = 0.6;
      setSuccessSound(successSfx);

      // UI Sound effects
      const buttonHoverSfx = new Audio('/sounds/ui/button-hover.mp3');
      buttonHoverSfx.volume = 0.3;
      setButtonHoverSound(buttonHoverSfx);

      const buttonClickSfx = new Audio('/sounds/ui/button-click.mp3');
      buttonClickSfx.volume = 0.4;
      setButtonClickSound(buttonClickSfx);

      const pageTransitionSfx = new Audio('/sounds/ui/page-transition.mp3');
      pageTransitionSfx.volume = 0.5;
      setPageTransitionSound(pageTransitionSfx);

      // Character voices - create and preload
      const characters = ['akira', 'felix', 'dante', 'kai', 'ryuu', 'zephyr'];
      characters.forEach(characterId => {
        const voice = new Audio(`/sounds/voices/${characterId}.mp3`);
        voice.volume = 0.9;
        voice.preload = 'auto';
        
        voice.addEventListener('loadeddata', () => {
          console.log(`Voice loaded for ${characterId}`);
        });
        
        voice.addEventListener('error', (e) => {
          console.log(`Voice loading error for ${characterId}:`, e);
        });
        
        setCharacterVoice(characterId, voice);
      });

      // Start background music if music is not muted
      if (!isMusicMuted) {
        bgMusic.play().catch(error => {
          console.log("Background music autoplay prevented:", error);
        });
      }
    };

    initAudio();

    // Cleanup function to reset flag if component unmounts completely
    return () => {
      // Only reset flag if we're truly unmounting (not hot reload)
      if (!import.meta.hot) {
        window.fantasyHeartsAudioInitialized = false;
      }
    };
  }, []); // Only run once on mount

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <GameScene />
    </div>
  );
}

export default App;
