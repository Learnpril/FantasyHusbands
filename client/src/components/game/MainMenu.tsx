import React from 'react';
import { Play, Settings, Save } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { useAudioStore } from '../../store/audioStore';
import { getSaves } from '../../store/saveGameStore';
import { AudioControls } from '../ui/AudioControls';

export function MainMenu() {
  const { setPhase, toggleSettings, toggleSaveLoad } = useGameStore();
  const { playButtonClick, playButtonHover } = useAudioStore();
  
  const saves = getSaves();

  const handleMenuAction = (action: () => void) => {
    playButtonClick();
    action();
  };

  return (
    <div 
      className="min-h-screen w-full flex items-start justify-center pt-8 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/images/backgrounds/main-menu.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Ethereal Firefly Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }, (_, i) => {
          const size = 0.3 + Math.random() * 0.5; // Random size from 0.3rem to 0.8rem
          const meanderOffset = (Math.random() - 0.5) * 200; // Random sideways drift
          return (
            <div
              key={i}
              className="absolute bg-yellow-200 rounded-full opacity-60 animate-firefly"
              style={{
                width: `${size}rem`,
                height: `${size}rem`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 25}s`, // More staggered emission
                animationDuration: `${20 + Math.random() * 15}s`, // Slower: 20-35s
                boxShadow: `0 0 ${size * 6}px rgba(255, 255, 150, 0.8), 0 0 ${size * 12}px rgba(255, 255, 150, 0.4)`,
                filter: 'blur(0.5px)',
                //@ts-ignore
                '--meander-offset': `${meanderOffset}px`
              } as React.CSSProperties}
            />
          );
        })}
      </div>

      {/* Clean UI Layout */}
      <div className="relative w-full max-w-md mx-4">
        {/* Fantasy Hearts Logo */}
        <div className="text-center mb-8">
          <img 
            src="/images/fantasy-hearts-logo.png" 
            alt="Fantasy Hearts" 
            className="w-96 h-auto mx-auto"
          />
        </div>
        
        {/* New Game and Settings Buttons */}
        <div className="space-y-4 mb-6">
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