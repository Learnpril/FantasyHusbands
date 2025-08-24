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

  // Initialize audio on component mount - true singleton with global storage
  useEffect(() => {
    // Check if we already have a global background music instance
    if (window.globalBackgroundMusic) {
      console.log("🎵 Using existing global background music");
      setBackgroundMusic(window.globalBackgroundMusic);
      return;
    }

    // Kill ALL existing background music completely
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

    console.log("🎵 Creating THE ONLY background music instance");
    
    // Create the ONLY background music instance that will ever exist
    const bgMusic = new Audio('/sounds/background.mp3');
    bgMusic.loop = true;
    bgMusic.volume = 0.3;
    bgMusic.id = 'the-only-background-music';
    
    // Store as global singleton - this will persist through hot reloads
    window.globalBackgroundMusic = bgMusic;
    
    setBackgroundMusic(bgMusic);

    // Initialize other sounds only if they don't exist
    if (!window.globalSoundsInitialized) {
      const hitSfx = new Audio('/sounds/hit.mp3');
      hitSfx.volume = 0.5;
      setHitSound(hitSfx);

      const successSfx = new Audio('/sounds/success.mp3');
      successSfx.volume = 0.6;
      setSuccessSound(successSfx);

      const buttonHoverSfx = new Audio('/sounds/ui/button-hover.mp3');
      buttonHoverSfx.volume = 0.3;
      setButtonHoverSound(buttonHoverSfx);

      const buttonClickSfx = new Audio('/sounds/ui/button-click.mp3');
      buttonClickSfx.volume = 0.4;
      setButtonClickSound(buttonClickSfx);

      const pageTransitionSfx = new Audio('/sounds/ui/page-transition.mp3');
      pageTransitionSfx.volume = 0.5;
      setPageTransitionSound(pageTransitionSfx);

      // Character voices
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

      window.globalSoundsInitialized = true;
    }

    // Start background music if not muted
    if (!isMusicMuted) {
      bgMusic.play().catch(error => {
        console.log("Background music autoplay prevented:", error);
      });
    }
  }, []); // Only run once on mount

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <GameScene />
    </div>
  );
}

export default App;
