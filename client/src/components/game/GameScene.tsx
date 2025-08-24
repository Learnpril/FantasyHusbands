import { useDatingSim } from '../../lib/stores/useDatingSim';
import { MainMenu } from './MainMenu';
import { ForestJourney } from './ForestJourney';
import { CharacterSelection } from './CharacterSelection';
import { DialogueBox } from './DialogueBox';
import { SettingsMenu } from './SettingsMenu';
import { SaveLoadMenu } from './SaveLoadMenu';

export function GameScene() {
  const { phase, showSettings, showSaveLoad } = useDatingSim();
  
  return (
    <div className="relative w-full h-full">
      {/* Main game content */}
      {phase === 'menu' && <MainMenu />}
      {phase === 'forest-journey' && <ForestJourney />}
      {phase === 'character-selection' && <CharacterSelection />}
      {phase === 'dialogue' && <DialogueBox />}
      
      {/* Overlay menus */}
      {showSettings && <SettingsMenu />}
      {showSaveLoad && <SaveLoadMenu />}
    </div>
  );
}
