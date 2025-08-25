import { useEffect } from "react";
import { useAudio } from "./lib/stores/useAudio";
import { GameScene } from "./components/game/GameScene";
import "@fontsource/cinzel/400.css";
import "@fontsource/cinzel/500.css";
import "@fontsource/cinzel/600.css";
import "@fontsource/crimson-text/400.css";
import "@fontsource/crimson-text/600.css";
import "@fontsource/eb-garamond/400.css";
import "@fontsource/eb-garamond/500.css";

function App() {
  const { initAudioContext, playBackgroundMusic } = useAudio();

  // Initialize the simplified audio system
  useEffect(() => {
    console.log("🎵 Initializing simplified audio system");
    
    // Initialize Web Audio API and background music
    initAudioContext();
    
    // Auto-start the fantasy background music
    setTimeout(() => {
      playBackgroundMusic();
    }, 100); // Small delay to ensure audio context is ready
    
    console.log("✨ Audio system ready with fantasy soundtrack and programmatic UI sounds");
  }, []); // Only run once on mount

  return (
    <div className="min-h-screen">
      <GameScene />
    </div>
  );
}

export default App;