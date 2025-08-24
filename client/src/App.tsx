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
    isMuted 
  } = useAudio();

  // Initialize audio on component mount
  useEffect(() => {
    const initAudio = () => {
      // Background music
      const bgMusic = new Audio('/sounds/background.mp3');
      bgMusic.loop = true;
      bgMusic.volume = 0.3;
      setBackgroundMusic(bgMusic);

      // Sound effects
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
        voice.preload = 'auto'; // Preload for faster playback
        
        voice.addEventListener('loadeddata', () => {
          console.log(`Voice loaded for ${characterId}`);
        });
        
        voice.addEventListener('error', (e) => {
          console.log(`Voice loading error for ${characterId}:`, e);
        });
        
        setCharacterVoice(characterId, voice);
      });

      // Start background music if not muted
      if (!isMuted) {
        bgMusic.play().catch(error => {
          console.log("Background music autoplay prevented:", error);
        });
      }
    };

    initAudio();
  }, [
    setBackgroundMusic, 
    setHitSound, 
    setSuccessSound, 
    setButtonHoverSound,
    setButtonClickSound,
    setPageTransitionSound,
    setCharacterVoice,
    isMuted
  ]);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <GameScene />
    </div>
  );
}

export default App;
