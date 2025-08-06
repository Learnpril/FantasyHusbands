import { useEffect } from "react";
import { useAudio } from "./lib/stores/useAudio";
import { GameScene } from "./components/game/GameScene";
import "@fontsource/inter";

function App() {
  const { setBackgroundMusic, setHitSound, setSuccessSound, isMuted } = useAudio();

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

      // Start background music if not muted
      if (!isMuted) {
        bgMusic.play().catch(error => {
          console.log("Background music autoplay prevented:", error);
        });
      }
    };

    initAudio();
  }, [setBackgroundMusic, setHitSound, setSuccessSound, isMuted]);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <GameScene />
    </div>
  );
}

export default App;
