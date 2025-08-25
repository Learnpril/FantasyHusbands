import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { useDatingSim } from '../../lib/stores/useDatingSim';
import { useAudio } from '../../lib/stores/useAudio';
import { Heart, Play, Save, Settings } from 'lucide-react';
import { AudioControls } from '../ui/AudioControls';

export function MainMenu() {
  const { setPhase, toggleSettings, toggleSaveLoad, getSaves } = useDatingSim();
  const { 
    playButtonClick, 
    playButtonHover
  } = useAudio();
  
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

      {/* Ornate UI Panel */}
      <div className="relative w-full max-w-sm mx-4">
        {/* Main UI Container with ornate styling */}
        <div className="relative bg-gradient-to-b from-indigo-900/80 to-purple-900/80 backdrop-blur-sm rounded-lg border-2 border-purple-300/30 shadow-2xl p-4">
          {/* Decorative border corners */}
          <div className="absolute -top-1 -left-1 w-8 h-8 border-l-2 border-t-2 border-purple-300 rounded-tl-lg"></div>
          <div className="absolute -top-1 -right-1 w-8 h-8 border-r-2 border-t-2 border-purple-300 rounded-tr-lg"></div>
          <div className="absolute -bottom-1 -left-1 w-8 h-8 border-l-2 border-b-2 border-purple-300 rounded-bl-lg"></div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 border-r-2 border-b-2 border-purple-300 rounded-br-lg"></div>
          
          {/* Title Section */}
          <div className="text-center mb-4">
            {/* Fantasy Hearts Logo */}
            <div className="relative mx-auto mb-2">
              <img 
                src="/images/logo.png" 
                alt="Fantasy Hearts" 
                className="w-56 h-auto mx-auto"
              />
            </div>
            
            <p className="text-purple-200 text-sm font-medium ui-text">
              Choose your Romantic Destiny
            </p>
          </div>
          
          {/* Buttons */}
          <div className="space-y-3">
            {/* New Game Button */}
            <button
              onClick={() => handleMenuAction(() => {
                setPhase('forest-journey');
              })}
              onMouseEnter={() => playButtonHover()}
              className="group relative w-full py-3 px-4 text-white font-semibold text-base tracking-wide transition-all duration-300 hover:scale-105 ui-text"
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
                className="group relative w-full py-3 px-4 text-white font-semibold text-base tracking-wide transition-all duration-300 hover:scale-105"
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
              className="group relative w-full py-3 px-4 text-white font-semibold text-base tracking-wide transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-transparent rounded-lg border-2 border-purple-300/60 shadow-lg group-hover:shadow-purple-400/50 group-hover:border-purple-300 group-hover:bg-purple-600/20"></div>
              <div className="relative flex items-center justify-center">
                <Settings className="w-5 h-5 mr-2" />
                Settings
              </div>
            </button>
            
            {/* Audio Controls */}
            <div className="flex justify-center">
              <AudioControls size="lg" />
            </div>
          </div>
          
          {/* Footer text */}
          <div className="mt-8 text-center">
            <p className="text-purple-200 font-medium tracking-wide ui-text">
              Choose your romantic destiny
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
