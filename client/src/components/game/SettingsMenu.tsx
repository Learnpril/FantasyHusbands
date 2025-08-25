import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { Switch } from '../ui/switch';
import { useDatingSim } from '../../lib/stores/useDatingSim';
import { useAudio } from '../../lib/stores/useAudio';
import { X, Volume2, MessageSquare, Clock, RotateCcw, Mic, Music } from 'lucide-react';
import { AudioControls } from '../ui/AudioControls';

export function SettingsMenu() {
  const {
    toggleSettings,
    musicVolume,
    soundVolume,
    autoAdvance,
    textSpeed,
    setMusicVolume,
    setSoundVolume,
    setAutoAdvance,
    setTextSpeed,
    resetGame
  } = useDatingSim();
  
  const {
    playUISound
  } = useAudio();
  
  const handleReset = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      resetGame();
      toggleSettings();
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-700 text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl">Settings</CardTitle>
          <div className="flex items-center gap-2">
            <AudioControls size="sm" variant="minimal" />
            <Button
              onClick={() => {
              playUISound('click');
              toggleSettings();
            }}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Audio Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Volume2 className="w-5 h-5" />
              Audio
            </h3>
            
            <div className="text-center text-gray-300 p-4 bg-gray-800/50 rounded-lg">
              <p className="text-sm mb-2">🎵 Music and sound controls are available</p>
              <p className="text-sm mb-2">using the audio buttons in the top-right corner.</p>
              <p className="text-xs text-gray-400 mt-4">Add music files to /public/audio/ folder to enable background music.</p>
            </div>
          </div>
          
          {/* Text Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Text
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm text-gray-300">Auto-advance dialogue</Label>
                <Switch
                  checked={autoAdvance}
                  onCheckedChange={setAutoAdvance}
                />
              </div>
              
              <div>
                <Label className="text-sm text-gray-300">Text Speed</Label>
                <div className="mt-2">
                  <Slider
                    value={[textSpeed]}
                    onValueChange={(value) => setTextSpeed(value[0])}
                    max={90}
                    min={10}
                    step={10}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-400 mt-1">
                    {textSpeed < 30 ? 'Slow' : textSpeed < 60 ? 'Normal' : 'Fast'}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Game Actions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <RotateCcw className="w-5 h-5" />
              Game
            </h3>
            
            <Button
              onClick={handleReset}
              variant="destructive"
              className="w-full"
            >
              Reset All Progress
            </Button>
          </div>
          
          <div className="pt-4 border-t border-gray-700">
            <Button
              onClick={toggleSettings}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Close Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
