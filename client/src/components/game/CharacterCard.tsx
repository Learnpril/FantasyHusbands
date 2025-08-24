import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Character } from '../../types/game';
import { Heart, User, Briefcase } from 'lucide-react';

interface CharacterCardProps {
  character: Character;
  onClick: () => void;
}

export function CharacterCard({ character, onClick }: CharacterCardProps) {
  const affectionPercentage = (character.affection / character.maxAffection) * 100;
  
  return (
    <Card 
      className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer transform hover:scale-105 min-h-fit"
      onClick={onClick}
    >
      <CardContent className="p-3 sm:p-4">
        {/* Character Avatar */}
        <div className="w-full h-24 sm:h-32 mb-2 sm:mb-3 bg-gradient-to-br from-pink-300 to-purple-300 rounded-lg flex items-center justify-center overflow-hidden relative">
          <img 
            src={character.sprite} 
            alt={character.name}
            className={`w-full h-full object-cover ${character.id === 'felix' ? 'object-[center_25%]' : character.id === 'akira' ? 'object-[center_40%]' : 'object-top'}`}
            onError={(e) => {
              // Fallback to icon if image fails to load
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.setAttribute('style', 'display: block');
            }}
          />
          <User className="w-20 h-20 text-white/70 hidden" />
        </div>
        
        {/* Character Info */}
        <div className="text-white">
          <h3 className="text-lg font-bold mb-1">{character.name}</h3>
          <p className="text-gray-300 text-xs mb-2">{character.age} years old</p>
          
          <div className="flex items-center gap-1 mb-2">
            <Briefcase className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-300">{character.occupation}</span>
          </div>
          
          {/* Traits */}
          <div className="flex flex-wrap gap-1 mb-2">
            {character.traits.slice(0, 2).map((trait) => (
              <Badge 
                key={trait} 
                variant="secondary" 
                className="text-xs bg-white/20 text-white border-0 px-1 py-0"
              >
                {trait}
              </Badge>
            ))}
          </div>
          
          {/* Affection Level */}
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Heart className="w-3 h-3 text-pink-400" />
              <span className="text-xs text-gray-300">
                {character.affection}/{character.maxAffection}
              </span>
            </div>
            <Progress 
              value={affectionPercentage} 
              className="h-1 bg-white/20"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
