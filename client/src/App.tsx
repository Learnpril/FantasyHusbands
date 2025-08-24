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

  // Initialize audio on component mount - NO BACKGROUND MUSIC EVER
  useEffect(() => {
    console.log("🔇 FORCE KILLING ALL AUDIO ON STARTUP");
    
    // Kill ALL audio elements completely - no exceptions
    const existingAudio = document.querySelectorAll('audio');
    existingAudio.forEach(audio => {
      console.log("🔇 Destroying audio element:", audio.src);
      audio.pause();
      audio.currentTime = 0;
      audio.volume = 0;
      audio.muted = true;
      audio.src = '';
      audio.loop = false;
      // Remove from DOM completely
      try {
        if (audio.parentNode) {
          audio.parentNode.removeChild(audio);
        }
      } catch (e) {
        // Continue cleanup
      }
    });

    // Clear ALL global audio references
    (window as any).globalBackgroundMusic = null;
    (window as any).globalSoundsInitialized = false; // Reset to force fresh initialization

    console.log("🔊 Initializing sounds with NO BACKGROUND MUSIC");

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
