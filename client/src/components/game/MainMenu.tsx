import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { useDatingSim } from '../../lib/stores/useDatingSim';
import { useAudio } from '../../lib/stores/useAudio';
import { Heart, Play, Save, Settings, Volume2, VolumeX } from 'lucide-react';

export function MainMenu() {
  const { setPhase, toggleSettings, toggleSaveLoad, getSaves } = useDatingSim();
  const { toggleMute, isMuted } = useAudio();
  
  const saves = getSaves();
  
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-4 h-4 bg-pink-300 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-32 w-6 h-6 bg-blue-300 rounded-full animate-bounce opacity-40"></div>
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-purple-300 rounded-full animate-ping opacity-50"></div>
        <div className="absolute bottom-20 right-20 w-5 h-5 bg-pink-400 rounded-full animate-pulse opacity-30"></div>
      </div>
      
      <Card className="w-full max-w-md mx-4 bg-white/10 backdrop-blur-sm border-white/20 text-white">
        <CardContent className="pt-8">
          <div className="text-center mb-8">
            <Heart className="w-16 h-16 mx-auto mb-4 text-pink-400 animate-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Fantasy Hearts
            </h1>
            <p className="text-lg text-gray-300 mt-2">
              An Anime Dating Simulation
            </p>
          </div>
          
          <div className="space-y-4">
            <Button
              onClick={() => setPhase('character-selection')}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white border-0 py-6 text-lg font-semibold"
            >
              <Play className="w-5 h-5 mr-2" />
              New Game
            </Button>
            
            {saves.length > 0 && (
              <Button
                onClick={() => toggleSaveLoad()}
                variant="outline"
                className="w-full border-white/30 text-white hover:bg-white/10 py-6 text-lg"
              >
                <Save className="w-5 h-5 mr-2" />
                Load Game
              </Button>
            )}
            
            <Button
              onClick={() => toggleSettings()}
              variant="outline"
              className="w-full border-white/30 text-white hover:bg-white/10 py-6 text-lg"
            >
              <Settings className="w-5 h-5 mr-2" />
              Settings
            </Button>
            
            <Button
              onClick={() => toggleMute()}
              variant="ghost"
              className="w-full text-white hover:bg-white/10 py-4"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 mr-2" />
              ) : (
                <Volume2 className="w-5 h-5 mr-2" />
              )}
              {isMuted ? 'Unmute' : 'Mute'} Sound
            </Button>
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-400">
            <p>Choose your romantic destiny</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
