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
  const { characters, setPhase, selectCharacter, getCharacter } = useDatingSim();
  // No audio initialization needed - using new simplified system
  
  // Filter to only show characters that have been met (have affection > 0 or have been interacted with)
  const metCharacters = characters.filter(character => character.affection > 0);
  
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
              setPhase('forest-journey');
            }}
            variant="ghost"
            className="text-white hover:bg-white/10 self-start"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Forest
          </Button>
          
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Roster of Hearts</h1>
            <p className="text-gray-300 text-sm sm:text-base">View your relationships with characters you've met</p>
          </div>
          
          <AudioControls size="md" />
        </div>
        
        {/* Character Grid - Only Met Characters */}
        {metCharacters.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6 mb-8">
            {metCharacters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                onClick={() => handleCharacterSelect(character.id)}
              />
            ))}
          </div>
        ) : (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
            <CardContent className="p-8 text-center text-white">
              <Heart className="w-16 h-16 mx-auto mb-4 text-pink-400 opacity-50" />
              <h2 className="text-xl font-bold mb-2">No Characters Met Yet</h2>
              <p className="text-gray-300 mb-4">Explore the mystical forest to discover your potential partners!</p>
              <Button
                onClick={() => setPhase('forest-journey')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2"
              >
                Explore the Forest
              </Button>
            </CardContent>
          </Card>
        )}
        
        {/* Relationship Stats */}
        {metCharacters.length > 0 && (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4 sm:pt-6">
              <div className="text-center text-white">
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-3 sm:mb-4 text-pink-400" />
                <h3 className="text-lg sm:text-xl font-semibold mb-4">Your Relationships</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  {metCharacters.map((character) => (
                    <div key={character.id} className="bg-white/5 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{character.name}</span>
                        <Badge variant="outline" className="border-pink-400 text-pink-400">
                          <Heart className="w-3 h-3 mr-1" />
                          {character.affection}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-400">{character.role}</div>
                      <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                        <div 
                          className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, (character.affection / 100) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-gray-300 mt-4 space-y-1 text-xs">
                  <p>• Click on any character to continue your conversation</p>
                  <p>• Higher affection unlocks new dialogue options and scenes</p>
                  <p>• Return to the forest to meet more characters</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
