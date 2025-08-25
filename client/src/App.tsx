/**
 * Fantasy Hearts - Main Application Component
 * Initializes the dating simulation game with audio system and routing
 */

import { useEffect, useRef } from "react";
import { useAudio } from "./lib/stores/useAudio";
import { GameScene } from "./components/game/GameScene";
import "@fontsource/cinzel/400.css";
import "@fontsource/cinzel/500.css";
import "@fontsource/cinzel/600.css";
import "@fontsource/crimson-text/400.css";
import "@fontsource/crimson-text/600.css";
import "@fontsource/eb-garamond/400.css";
import "@fontsource/eb-garamond/500.css";

/**
 * Main application component that initializes the audio system and renders the game
 */
function App() {
  const { initAudioContext, playBackgroundMusic } = useAudio();
  const audioInitialized = useRef(false);

  /**
   * Initialize audio system once on app startup
   * Prevents multiple audio contexts from being created on re-renders
   */
  useEffect(() => {
    if (audioInitialized.current) {
      console.log("🎵 Audio system already initialized, skipping");
      return;
    }
    
    console.log("🎵 Initializing simplified audio system");
    
    // Initialize Web Audio API context
    initAudioContext();
    
    // Auto-start background music with small delay for context readiness
    setTimeout(() => {
      playBackgroundMusic();
    }, 100);
    
    audioInitialized.current = true;
    console.log("✨ Audio system ready with fantasy soundtrack and programmatic UI sounds");
  }, [initAudioContext, playBackgroundMusic]);

  return (
    <div className="min-h-screen">
      <GameScene />
    </div>
  );
}

export default App;