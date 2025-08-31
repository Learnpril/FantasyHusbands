/**
 * MainMenu - Fantasy Hearts main menu with animated fireflies
 * Features new game, load game, and settings buttons with ethereal atmosphere
 */

import React, { useMemo } from 'react';
import { Play, Settings, Save } from 'lucide-react';
import { useDatingSim } from '../../lib/stores/useDatingSim';
import { useAudio } from '../../lib/stores/useAudio';
import { AudioControls } from '../ui/AudioControls';

/**
 * Main menu component with animated firefly background and game navigation
 */
export function MainMenu() {
  const { setPhase, toggleSettings, toggleSaveLoad, getSaves } = useDatingSim();
  const { playUISound, playBackgroundMusic } = useAudio();
  
  const saves = getSaves();

  /**
   * Generate stable firefly animation properties
   * Memoized to prevent re-calculation on every render
   */
  const fireflies = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: 0.3 + Math.random() * 0.5,
      left: Math.random() * 100,
      animationDelay: Math.random() * 25,
      animationDuration: 20 + Math.random() * 15,
      meanderOffset: (Math.random() - 0.5) * 200,
    }));
  }, []);

  /**
   * Handle menu button clicks with audio feedback
   */
  const handleMenuAction = (action: () => void) => {
    playUISound('click');
    // Start background music on first user interaction (browser security requirement)
    playBackgroundMusic();
    action();
  };

  return (
    <div 
      className="min-h-screen w-full flex items-start justify-center pt-4 relative overflow-hidden"
      style={{
        backgroundImage: `url(${import.meta.env.BASE_URL}images/backgrounds/main-menu.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Ethereal Firefly Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {fireflies.map((firefly) => (
          <div
            key={firefly.id}
            className="absolute bg-yellow-200 rounded-full opacity-60 animate-firefly"
            style={{
              width: `${firefly.size}rem`,
              height: `${firefly.size}rem`,
              left: `${firefly.left}%`,
              animationDelay: `${firefly.animationDelay}s`,
              animationDuration: `${firefly.animationDuration}s`,
              boxShadow: `0 0 ${firefly.size * 6}px rgba(255, 255, 150, 0.8), 0 0 ${firefly.size * 12}px rgba(255, 255, 150, 0.4)`,
              filter: 'blur(0.5px)',
              '--meander-offset': `${firefly.meanderOffset}px`
            } as React.CSSProperties & { '--meander-offset': string }}
          />
        ))}
      </div>

      {/* Clean UI Layout */}
      <div className="relative w-full max-w-md mx-4 -mt-8">
        {/* Fantasy Hearts Logo */}
        <div className="text-center mb-2 mt-5">
          <img 
            src={`${import.meta.env.BASE_URL}images/fantasy-hearts-logo.png`} 
            alt="Fantasy Hearts" 
            className="w-96 h-auto mx-auto"
          />
        </div>
        
        {/* New Game and Settings Buttons */}
        <div className="space-y-2 mb-2 -mt-7">
          {/* New Game Button */}
          <button
            onClick={() => handleMenuAction(() => {
              setPhase('forest-journey');
            })}
            onMouseEnter={() => playUISound('hover')}
            className="group relative w-full py-3 px-6 text-white font-semibold text-lg tracking-wide transition-all duration-300 hover:scale-105 ui-text"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg border-2 border-purple-300/50 shadow-lg group-hover:shadow-purple-500/50 group-hover:border-purple-300"></div>
            <div className="relative flex items-center justify-center">
              <Play className="w-5 h-5 mr-2" />
              New Game
            </div>
          </button>
          
          {/* Load Game Button */}
          {saves.length > 0 && (
            <button
              onClick={() => handleMenuAction(() => toggleSaveLoad())}
              onMouseEnter={() => playUISound('hover')}
              className="group relative w-full py-3 px-6 text-white font-semibold text-lg tracking-wide transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-transparent rounded-lg border-2 border-purple-300/60 shadow-lg group-hover:shadow-purple-400/50 group-hover:border-purple-300 group-hover:bg-purple-600/20"></div>
              <div className="relative flex items-center justify-center">
                <Save className="w-5 h-5 mr-2" />
                Load Game
              </div>
            </button>
          )}
          
          {/* Settings Button */}
          <button
            onClick={() => handleMenuAction(() => toggleSettings())}
            onMouseEnter={() => playUISound('hover')}
            className="group relative w-full py-3 px-6 text-white font-semibold text-lg tracking-wide transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-transparent rounded-lg border-2 border-purple-300/60 shadow-lg group-hover:shadow-purple-400/50 group-hover:border-purple-300 group-hover:bg-purple-600/20"></div>
            <div className="relative flex items-center justify-center">
              <Settings className="w-5 h-5 mr-2" />
              Settings
            </div>
          </button>
        </div>
        
        {/* Sound Controls */}
        <div className="flex justify-center">
          <AudioControls size="lg" />
        </div>
      </div>
    </div>
  );
}