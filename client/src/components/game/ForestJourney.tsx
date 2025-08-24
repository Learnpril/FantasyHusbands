import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { useDatingSim } from '../../lib/stores/useDatingSim';
import { useAudio } from '../../lib/stores/useAudio';
import { AudioControls } from '../ui/AudioControls';
import { ArrowLeft, MapPin, Trees, Mountain, Sparkles, BookOpen, Swords } from 'lucide-react';

interface ForestLocation {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  characterId?: string;
  characterName?: string;
  characterHint?: string;
  explored: boolean;
}

const forestLocations: ForestLocation[] = [
  {
    id: 'castle-path',
    name: 'Castle Training Grounds',
    description: 'Stone paths lead to the castle training grounds where knights practice their swordsmanship.',
    icon: Swords,
    characterId: 'akira',
    characterName: 'Akira Shadowbane',
    characterHint: 'You hear the sound of steel clashing against steel...',
    explored: false
  },
  {
    id: 'magical-clearing',
    name: 'Enchanted Clearing',
    description: 'A mystical grove where magical energy seems to dance in the air.',
    icon: Sparkles,
    characterId: 'felix',
    characterName: 'Felix Brightwater',
    characterHint: 'Colorful lights flicker through the trees ahead...',
    explored: false
  },
  {
    id: 'forest-heart',
    name: 'Heart of the Forest',
    description: 'The deepest part of the woods, where ancient trees whisper old songs.',
    icon: Trees,
    characterId: 'dante',
    characterName: 'Dante Heartstring',
    characterHint: 'A beautiful melody drifts through the ancient trees...',
    explored: false
  },
  {
    id: 'shadow-path',
    name: 'Shadow Path',
    description: 'A dark trail where shadows seem to move on their own.',
    icon: Mountain,
    characterId: 'kai',
    characterName: 'Kai Nightfall',
    characterHint: 'Something moves silently in the shadows...',
    explored: false
  },
  {
    id: 'dragon-ridge',
    name: 'Dragon Ridge',
    description: 'Rocky cliffs where dragons are said to nest.',
    icon: Mountain,
    characterId: 'ryuu',
    characterName: 'Ryuu Dragonheart',
    characterHint: 'A dragon\'s call echoes from the mountain peaks...',
    explored: false
  },
  {
    id: 'ancient-library',
    name: 'Forest Archive',
    description: 'An old stone structure hidden among the trees, filled with forgotten knowledge.',
    icon: BookOpen,
    characterId: 'zephyr',
    characterName: 'Zephyr Moonlight',
    characterHint: 'Candlelight flickers through ivy-covered windows...',
    explored: false
  }
];

export function ForestJourney() {
  const { setPhase, selectCharacter } = useDatingSim();
  const { playButtonClick, playButtonHover } = useAudio();
  const [locations, setLocations] = useState(forestLocations);
  const [currentLocationId, setCurrentLocationId] = useState<string | null>(null);

  const handleMenuAction = (action: () => void) => {
    playButtonClick();
    action();
  };

  const exploreLocation = (location: ForestLocation) => {
    if (location.characterId) {
      // Mark location as explored
      setLocations(prev => prev.map(loc => 
        loc.id === location.id ? { ...loc, explored: true } : loc
      ));
      
      // Start dialogue with the character
      selectCharacter(location.characterId);
    }
  };

  const unexploredLocations = locations.filter(loc => !loc.explored);
  const exploredLocations = locations.filter(loc => loc.explored);

  return (
    <div 
      className="w-full h-screen p-4 overflow-y-auto"
      style={{
        backgroundImage: 'url(/images/backgrounds/forest.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <Button
          onClick={() => handleMenuAction(() => setPhase('menu'))}
          variant="ghost"
          className="text-white hover:bg-white/10 self-start bg-black/30 backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Menu
        </Button>
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg fantasy-title">Forest Journey</h1>
          <p className="text-gray-200 text-lg font-medium ui-text drop-shadow-md">
            Explore the mystical woods and discover who awaits...
          </p>
        </div>
        
        <AudioControls size="md" />
      </div>

      {/* Journey Progress */}
      <div className="max-w-6xl mx-auto mb-8">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-6">
          <CardContent className="p-4">
            <div className="text-center text-white">
              <h3 className="text-xl font-semibold mb-3">Your Journey Progress</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-white/10 rounded p-3">
                  <p className="text-purple-200">Characters Met</p>
                  <p className="text-2xl font-bold text-purple-300">{exploredLocations.length}/6</p>
                </div>
                <div className="bg-white/10 rounded p-3">
                  <p className="text-blue-200">Locations Remaining</p>
                  <p className="text-2xl font-bold text-blue-300">{unexploredLocations.length}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Locations */}
        {unexploredLocations.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center drop-shadow-lg">Choose Your Path</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {unexploredLocations.map((location) => {
                const Icon = location.icon;
                return (
                  <Card 
                    key={location.id}
                    className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer transform hover:scale-105"
                    onClick={() => exploreLocation(location)}
                  >
                    <CardContent className="p-6">
                      <div className="text-center text-white">
                        <Icon className="w-16 h-16 mx-auto mb-4 text-purple-300" />
                        <h3 className="text-xl font-bold mb-3">{location.name}</h3>
                        <p className="text-gray-300 text-sm mb-4">{location.description}</p>
                        {location.characterHint && (
                          <p className="text-yellow-300 text-sm italic font-medium">
                            {location.characterHint}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Explored Locations */}
        {exploredLocations.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 text-center drop-shadow-lg">Characters You've Met</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {exploredLocations.map((location) => {
                const Icon = location.icon;
                return (
                  <Card 
                    key={location.id}
                    className="bg-green-500/20 backdrop-blur-sm border-green-300/30 cursor-pointer transform hover:scale-105 transition-all duration-300"
                    onClick={() => exploreLocation(location)}
                  >
                    <CardContent className="p-4">
                      <div className="text-center text-white">
                        <Icon className="w-10 h-10 mx-auto mb-2 text-green-300" />
                        <h3 className="text-lg font-bold mb-1">{location.name}</h3>
                        <p className="text-green-200 text-sm font-medium">
                          ✓ {location.characterName}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* All Characters Met */}
        {unexploredLocations.length === 0 && (
          <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border-purple-300/30">
            <CardContent className="p-6 text-center text-white">
              <Sparkles className="w-16 h-16 mx-auto mb-4 text-purple-300" />
              <h2 className="text-2xl font-bold mb-4">Journey Complete!</h2>
              <p className="text-gray-200 mb-6">
                You've met all the characters in the forest. Your romantic journey can now begin!
              </p>
              <Button
                onClick={() => handleMenuAction(() => setPhase('character-selection'))}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3"
                onMouseEnter={() => playButtonHover()}
              >
                Visit Character Gallery
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mt-8 mb-8">
          <CardContent className="p-6">
            <div className="text-center text-white">
              <MapPin className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
              <h3 className="text-lg font-semibold mb-2">Forest Guide</h3>
              <div className="text-gray-300 space-y-2 text-sm">
                <p>• Each location holds a different character waiting to meet you</p>
                <p>• Follow the hints to discover what lies ahead</p>
                <p>• Click on any location to begin your encounter</p>
                <p>• You can revisit characters anytime after meeting them</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}