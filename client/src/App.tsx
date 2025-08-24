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
  const { initAudioContext } = useAudio();

  // Initialize the simplified audio system
  useEffect(() => {
    console.log("🎵 Initializing simplified audio system");
    
    // Initialize Web Audio API and background music
    initAudioContext();
    
    console.log("✨ Audio system ready with fantasy soundtrack and programmatic UI sounds");
  }, []); // Only run once on mount

  return (
    <div className="min-h-screen">
      <GameScene />
    </div>
  );
}

export default App;