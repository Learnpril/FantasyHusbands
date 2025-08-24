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
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: 'url(/images/backgrounds/main-menu.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Ornate UI Panel */}
      <div className="relative w-full max-w-lg mx-4">
        {/* Main UI Container with ornate styling */}
        <div className="relative bg-gradient-to-b from-indigo-900/80 to-purple-900/80 backdrop-blur-sm rounded-lg border-2 border-purple-300/30 shadow-2xl p-8">
          {/* Decorative border corners */}
          <div className="absolute -top-1 -left-1 w-8 h-8 border-l-2 border-t-2 border-purple-300 rounded-tl-lg"></div>
          <div className="absolute -top-1 -right-1 w-8 h-8 border-r-2 border-t-2 border-purple-300 rounded-tr-lg"></div>
          <div className="absolute -bottom-1 -left-1 w-8 h-8 border-l-2 border-b-2 border-purple-300 rounded-bl-lg"></div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 border-r-2 border-b-2 border-purple-300 rounded-br-lg"></div>
          
          {/* Title Section */}
          <div className="text-center mb-8">
            {/* Fantasy Hearts Logo */}
            <div className="relative mx-auto mb-4">
              <img 
                src="/images/logo.png" 
                alt="Fantasy Hearts" 
                className="w-96 h-auto mx-auto"
              />
            </div>
            
            <p className="text-purple-200 text-lg font-medium ui-text">
              An Anime Dating Simulation
            </p>
          </div>
          
          {/* Buttons */}
          <div className="space-y-4">
            {/* New Game Button */}
            <button
              onClick={() => handleMenuAction(() => {
                setPhase('forest-journey');
              })}
              onMouseEnter={() => playButtonHover()}
              className="group relative w-full py-4 px-6 text-white font-semibold text-lg tracking-wide transition-all duration-300 hover:scale-105 ui-text"
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
                className="group relative w-full py-4 px-6 text-white font-semibold text-lg tracking-wide transition-all duration-300 hover:scale-105"
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
              className="group relative w-full py-4 px-6 text-white font-semibold text-lg tracking-wide transition-all duration-300 hover:scale-105"
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
