import { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useDatingSim } from '../../lib/stores/useDatingSim';
import { useAudio } from '../../lib/stores/useAudio';
import { dialogueNodes } from '../../data/dialogue';
import { ArrowLeft, Heart, Save, Settings, Volume2, VolumeX, Pause, Play, SkipForward } from 'lucide-react';
import { AudioControls } from '../ui/AudioControls';

export function DialogueBox() {
  const { 
    currentDialogueId, 
    currentCharacterId,
    setCurrentDialogue, 
    updateAffection, 
    setPhase,
    getCharacter,
    textSpeed,
    autoAdvance,
    toggleSettings,
    toggleSaveLoad
  } = useDatingSim();
  
  const { 
    playHit, 
    playCharacterVoice, 
    stopVoice, 
    isVoicePlaying,
    pauseVoice,
    resumeVoice,
    playAmbient,
    stopAmbient,
    playButtonClick
  } = useAudio();
  const [displayedText, setDisplayedText] = useState('');
  const [isTextComplete, setIsTextComplete] = useState(false);
  
  const currentDialogue = currentDialogueId ? dialogueNodes[currentDialogueId] : null;
  const currentCharacter = currentCharacterId ? getCharacter(currentCharacterId) : null;
  
  // Text animation and voice acting effect
  useEffect(() => {
    if (!currentDialogue) return;
    
    setDisplayedText('');
    setIsTextComplete(false);
    
    // Play character voice when dialogue starts
    if (currentDialogue.characterId) {
      playCharacterVoice(currentDialogue.characterId, currentDialogue.id);
    }
    
    // Play ambient sound based on background (with delay to ensure cleanup)
    if (currentDialogue.background) {
      setTimeout(() => {
        if (currentDialogue.background.includes('castle')) {
          playAmbient('castle');
        } else if (currentDialogue.background.includes('forest')) {
          playAmbient('forest');
        } else if (currentDialogue.background.includes('library')) {
          playAmbient('library');
        }
      }, 100); // Small delay to ensure all music cleanup is complete
    }
    
    const text = currentDialogue.text;
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTextComplete(true);
        clearInterval(interval);
        
        // Auto-advance if enabled and there's only one choice
        if (autoAdvance && currentDialogue.choices.length === 1) {
          setTimeout(() => handleChoiceSelect(currentDialogue.choices[0]), 2000);
        }
      }
    }, 100 - textSpeed);
    
    return () => clearInterval(interval);
  }, [currentDialogue, textSpeed, autoAdvance, playCharacterVoice]);
  
  const handleChoiceSelect = (choice: any) => {
    playButtonClick();
    
    // Update affection if specified
    if (choice.affectionChange && choice.characterId) {
      updateAffection(choice.characterId, choice.affectionChange);
    }
    
    // Navigate to next dialogue or end scene
    if (choice.nextDialogueId) {
      if (choice.nextDialogueId === 'character_selection') {
        setPhase('character-selection');
      } else {
        setCurrentDialogue(choice.nextDialogueId);
      }
    }
  };
  
  const skipToEnd = () => {
    if (currentDialogue) {
      setDisplayedText(currentDialogue.text);
      setIsTextComplete(true);
    }
  };
  
  if (!currentDialogue) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Dialogue not found</h2>
          <Button onClick={() => setPhase('character-selection')}>
            Return to Character Selection
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: currentDialogue.background 
            ? `url(${currentDialogue.background})` 
            : 'linear-gradient(to bottom right, #1a1a2e, #16213e, #0f3460)'
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      {/* Character Sprite */}
      {currentDialogue.characterSprite && (
        <div className="absolute bottom-72 sm:bottom-64 right-4 sm:right-8 w-48 h-72 sm:w-80 sm:h-96 z-10">
          <img 
            src={currentDialogue.characterSprite}
            alt={currentDialogue.speaker}
            className="w-full h-full object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      )}
      
      {/* Top UI Bar */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
        <Button
          onClick={() => setPhase('character-selection')}
          variant="ghost"
          className="text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <div className="flex gap-2">
          {currentCharacter && (
            <div className="flex items-center gap-2 bg-black/50 rounded-full px-4 py-2 text-white">
              <Heart className="w-4 h-4 text-pink-400" />
              <span className="text-sm">{currentCharacter.affection}</span>
            </div>
          )}
          
          <Button
            onClick={() => toggleSaveLoad()}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10"
          >
            <Save className="w-4 h-4" />
          </Button>
          
          <Button
            onClick={() => toggleSettings()}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10"
          >
            <Settings className="w-4 h-4" />
          </Button>
          
          <AudioControls size="sm" variant="minimal" />
        </div>
      </div>
      
      {/* Dialogue Box */}
      <div className="absolute bottom-4 left-4 right-4 z-20">
        <Card className="bg-black/80 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            {/* Speaker Name and Voice Controls */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-purple-600 text-white">
                  {currentDialogue.speaker}
                </Badge>
                {currentCharacter && currentDialogue.characterId && (
                  <Badge variant="outline" className="border-pink-400 text-pink-400">
                    <Heart className="w-3 h-3 mr-1" />
                    {currentCharacter.affection}
                  </Badge>
                )}
              </div>
              
              {/* Voice Controls */}
              <div className="flex items-center gap-1">
                <Button
                  onClick={() => {
                    if (currentDialogue?.characterId) {
                      playCharacterVoice(currentDialogue.characterId, currentDialogue.id);
                    }
                  }}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10 p-1 h-8 w-8"
                  title="Play voice"
                >
                  <Play className="w-4 h-4" />
                </Button>
                <Button
                  onClick={isVoicePlaying ? pauseVoice : resumeVoice}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10 p-1 h-8 w-8"
                  title={isVoicePlaying ? "Pause voice" : "Resume voice"}
                >
                  {isVoicePlaying ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
                <Button
                  onClick={stopVoice}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10 p-1 h-8 w-8"
                  title="Stop voice"
                >
                  <SkipForward className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {/* Dialogue Text */}
            <div 
              className="text-white text-lg leading-relaxed mb-4 min-h-[3rem] cursor-pointer"
              onClick={!isTextComplete ? skipToEnd : undefined}
            >
              {displayedText}
              {!isTextComplete && (
                <span className="inline-block w-2 h-6 bg-white ml-1 animate-pulse"></span>
              )}
            </div>
            
            {/* Choices */}
            {isTextComplete && currentDialogue.choices.length > 0 && (
              <div className="space-y-2">
                {currentDialogue.choices.map((choice) => (
                  <Button
                    key={choice.id}
                    onClick={() => handleChoiceSelect(choice)}
                    variant="outline"
                    className="w-full text-left justify-start border-white/30 text-white hover:bg-white/10"
                  >
                    <span className="flex-1">{choice.text}</span>
                    {choice.affectionChange && (
                      <Badge 
                        variant="secondary" 
                        className={`ml-2 ${
                          choice.affectionChange > 0 
                            ? 'bg-green-600' 
                            : choice.affectionChange < 0 
                            ? 'bg-red-600' 
                            : 'bg-gray-600'
                        }`}
                      >
                        {choice.affectionChange > 0 ? '+' : ''}{choice.affectionChange}
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
            )}
            
            {/* Continue prompt for single choice dialogues */}
            {!isTextComplete && (
              <div className="text-gray-400 text-sm text-center">
                Click to skip text animation
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
