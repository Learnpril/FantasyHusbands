import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useDatingSim } from '../../lib/stores/useDatingSim';
import { CharacterCard } from './CharacterCard';
import { ArrowLeft, Heart } from 'lucide-react';

export function CharacterSelection() {
  const { characters, setPhase, selectCharacter } = useDatingSim();
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={() => setPhase('menu')}
            variant="ghost"
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Menu
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Choose Your Destiny</h1>
            <p className="text-gray-300">Select a character to begin your romantic journey</p>
          </div>
          
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>
        
        {/* Character Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onClick={() => selectCharacter(character.id)}
            />
          ))}
        </div>
        
        {/* Instructions */}
        <Card className="mt-8 bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="pt-6">
            <div className="text-center text-white">
              <Heart className="w-8 h-8 mx-auto mb-4 text-pink-400" />
              <h3 className="text-xl font-semibold mb-2">How to Play</h3>
              <div className="text-gray-300 space-y-2">
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
