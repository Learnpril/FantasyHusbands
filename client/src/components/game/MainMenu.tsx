/**
 * MainMenu - Fantasy Hearts main menu
 * Features new game, load game, and settings buttons with clean atmosphere
 */

import React from 'react';
import { Play, Settings, Save } from 'lucide-react';
import { useDatingSim } from '../../lib/stores/useDatingSim';
import { useAudio } from '../../lib/stores/useAudio';
import { AudioControls } from '../ui/AudioControls';

/**
 * Main menu component with clean background and game navigation
 */
export function MainMenu() {
  const { setPhase, toggleSettings, toggleSaveLoad, getSaves } = useDatingSim();
  const { playButtonClick, playButtonHover } = useAudio();
  
  const saves = getSaves();


  /**
   * Handle menu button clicks with audio feedback
   */
  const handleMenuAction = (action: () => void) => {
    playButtonClick();
    action();
  };

  return (
    <div 
      className="min-h-screen w-full flex items-start justify-center pt-4 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/images/backgrounds/main-menu.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >

      {/* Clean UI Layout */}
      <div className="relative w-full max-w-md mx-4 -mt-8">
        {/* Fantasy Hearts Logo */}
        <div className="text-center mb-2 mt-5">
          <img 
            src="/images/fantasy-hearts-logo.png" 
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
            onMouseEnter={() => playButtonHover()}
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
              onMouseEnter={() => playButtonHover()}
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
            onMouseEnter={() => playButtonHover()}
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