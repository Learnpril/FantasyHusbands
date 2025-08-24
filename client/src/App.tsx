import { useEffect } from "react";
import { useAudio } from "./lib/stores/useAudio";
import { GameScene } from "./components/game/GameScene";
import "@fontsource/inter";

function App() {
  const { 
    setHitSound, 
    setSuccessSound, 
    setButtonHoverSound,
    setButtonClickSound,
    setPageTransitionSound,
    setCharacterVoice,
    isMuted,
    isMusicMuted 
  } = useAudio();

  // Initialize audio on component mount - NO BACKGROUND MUSIC
  useEffect(() => {
    // Kill ALL existing background music completely
    const existingAudio = document.querySelectorAll('audio');
    existingAudio.forEach(audio => {
      if (audio.src.includes('background.mp3')) {
        console.log("🔇 Removing background music as requested");
        audio.pause();
        audio.currentTime = 0;
        audio.src = '';
        if (audio.parentNode) {
          audio.parentNode.removeChild(audio);
        }
      }
    });

    // Clear global background music references
    (window as any).globalBackgroundMusic = null;

    console.log("🔊 Initializing sounds without background music");

    // Initialize other sounds only if they don't exist
    if (!(window as any).globalSoundsInitialized) {
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

      // Character voices - create longer, more audible test voices
      const characters = ['akira', 'felix', 'dante', 'kai', 'ryuu', 'zephyr'];
      characters.forEach(characterId => {
        // Use success sound which is more audible than the current voice files
        const voice = new Audio('/sounds/success.mp3');
        voice.volume = 1.0; // Maximum volume for voices
        voice.preload = 'auto';
        
        voice.addEventListener('loadeddata', () => {
          console.log(`🎤 Voice loaded for ${characterId} (using success sound for testing)`);
        });
        
        voice.addEventListener('error', (e) => {
          console.log(`Voice loading error for ${characterId}:`, e);
        });
        
        setCharacterVoice(characterId, voice);
      });

      (window as any).globalSoundsInitialized = true;
    }
  }, []); // Only run once on mount

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <GameScene />
    </div>
  );
}

export default App;
