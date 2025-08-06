import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useDatingSim } from '../../lib/stores/useDatingSim';
import { useState } from 'react';
import { X, Save, Trash2, Clock } from 'lucide-react';

export function SaveLoadMenu() {
  const {
    toggleSaveLoad,
    saveGame,
    loadGame,
    deleteSave,
    getSaves
  } = useDatingSim();
  
  const [saveName, setSaveName] = useState('');
  const saves = getSaves();
  
  const handleSave = () => {
    if (saveName.trim()) {
      saveGame(saveName.trim());
      setSaveName('');
    }
  };
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-gray-900 border-gray-700 text-white max-h-[80vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl">Save & Load Game</CardTitle>
          <Button
            onClick={toggleSaveLoad}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Save Game Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Save className="w-5 h-5" />
              Save Current Game
            </h3>
            
            <div className="flex gap-2">
              <div className="flex-1">
                <Label className="text-sm text-gray-300">Save Name</Label>
                <Input
                  value={saveName}
                  onChange={(e) => setSaveName(e.target.value)}
                  placeholder="Enter save name..."
                  className="mt-1 bg-gray-800 border-gray-600 text-white"
                  onKeyPress={(e) => e.key === 'Enter' && handleSave()}
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={handleSave}
                  disabled={!saveName.trim()}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
          
          {/* Load Game Section */}
          {saves.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Load Saved Game
              </h3>
              
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {saves.map((save) => (
                  <Card key={save.id} className="bg-gray-800 border-gray-600">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-white">{save.name}</h4>
                          <p className="text-sm text-gray-400">
                            {formatDate(save.timestamp)}
                          </p>
                          <p className="text-xs text-gray-500">
                            Progress: {save.gameProgress}% • Scenes: {save.unlockedScenes.length}
                          </p>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            onClick={() => loadGame(save.id)}
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            Load
                          </Button>
                          <Button
                            onClick={() => {
                              if (confirm('Delete this save?')) {
                                deleteSave(save.id);
                              }
                            }}
                            size="sm"
                            variant="destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {saves.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No saved games found</p>
            </div>
          )}
          
          <div className="pt-4 border-t border-gray-700">
            <Button
              onClick={toggleSaveLoad}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
