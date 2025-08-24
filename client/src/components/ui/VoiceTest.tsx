import { useState } from 'react';
import { Button } from './button';
import { useAudio } from '../../lib/stores/useAudio';

export function VoiceTest() {
  const { playCharacterVoice, stopVoice, voiceVolume, masterVolume } = useAudio();
  const [testCharacter, setTestCharacter] = useState('felix');
  
  const testVoice = () => {
    console.log('Testing voice for:', testCharacter);
    console.log('Voice volume:', voiceVolume);
    console.log('Master volume:', masterVolume);
    playCharacterVoice(testCharacter, 'test');
  };
  
  const characters = ['akira', 'felix', 'dante', 'kai', 'ryuu', 'zephyr'];
  
  return (
    <div className="p-4 bg-black/50 rounded-lg">
      <h3 className="text-white mb-2">Voice Test</h3>
      <div className="flex gap-2 mb-2">
        {characters.map(char => (
          <Button
            key={char}
            onClick={() => setTestCharacter(char)}
            variant={testCharacter === char ? "default" : "outline"}
            size="sm"
            className="text-xs"
          >
            {char}
          </Button>
        ))}
      </div>
      <div className="flex gap-2">
        <Button onClick={testVoice} size="sm">Test Voice</Button>
        <Button onClick={stopVoice} size="sm" variant="outline">Stop</Button>
      </div>
      <div className="text-xs text-gray-400 mt-2">
        Volume: {Math.round(voiceVolume * 100)}% | Master: {Math.round(masterVolume * 100)}%
      </div>
    </div>
  );
}