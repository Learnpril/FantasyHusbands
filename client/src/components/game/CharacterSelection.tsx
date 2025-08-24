import { useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useDatingSim } from '../../lib/stores/useDatingSim';
import { useAudio } from '../../lib/stores/useAudio';
import { CharacterCard } from './CharacterCard';
import { AudioControls } from '../ui/AudioControls';
import { ArrowLeft, Heart } from 'lucide-react';

export function CharacterSelection() {
  const { characters, setPhase, selectCharacter } = useDatingSim();
  // No audio initialization needed - using new simplified system
  
  const handleCharacterSelect = (characterId: string) => {
    selectCharacter(characterId);
  };
  
  return (
    <div className="w-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-2 sm:p-4 overflow-y-auto" style={{ height: '100vh' }}>
      <div className="max-w-7xl mx-auto pb-8 min-h-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <Button
            onClick={() => {
              setPhase('menu');
            }}
            variant="ghost"
            className="text-white hover:bg-white/10 self-start"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Menu
          </Button>
          
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Choose Your Destiny</h1>
            <p className="text-gray-300 text-sm sm:text-base">Select a character to begin your romantic journey</p>
          </div>
          
          <AudioControls size="md" />
        </div>
        
        {/* Character Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6 mb-8">
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onClick={() => handleCharacterSelect(character.id)}
            />
          ))}
        </div>
        
        {/* Instructions */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4 sm:pt-6">
            <div className="text-center text-white">
              <Heart className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-3 sm:mb-4 text-pink-400" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">How to Play</h3>
              <div className="text-gray-300 space-y-1 sm:space-y-2 text-sm sm:text-base">
                <p>• Click on a character to start a conversation</p>
                <p>• Choose dialogue options that reflect your personality</p>
                <p>• Build relationships through meaningful interactions</p>
                <p>• Unlock new scenes as your bonds grow stronger</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
