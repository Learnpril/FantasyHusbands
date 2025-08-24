import { useEffect } from "react";
import { useAudio } from "./lib/stores/useAudio";
import { GameScene } from "./components/game/GameScene";
import "@fontsource/inter";

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