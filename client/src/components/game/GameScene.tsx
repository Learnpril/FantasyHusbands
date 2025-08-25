/**
 * GameScene - Main game routing component
 * Handles navigation between different game phases and overlay menus
 */

import { useDatingSim } from '../../lib/stores/useDatingSim';
import { MainMenu } from './MainMenu';
import { ForestJourney } from './ForestJourney';
import { CharacterSelection } from './CharacterSelection';
import { DialogueBox } from './DialogueBox';
import { SettingsMenu } from './SettingsMenu';
import { SaveLoadMenu } from './SaveLoadMenu';

/**
 * Central game scene router that displays the appropriate component
 * based on current game phase and manages overlay menus
 */
export function GameScene() {
  const { phase, showSettings, showSaveLoad } = useDatingSim();
  
  return (
    <div className="relative w-full h-full">
      {/* Main game phases */}
      {phase === 'menu' && <MainMenu />}
      {phase === 'forest-journey' && <ForestJourney />}
      {phase === 'character-selection' && <CharacterSelection />}
      {phase === 'dialogue' && <DialogueBox />}
      
      {/* Overlay menus that appear on top of game content */}
      {showSettings && <SettingsMenu />}
      {showSaveLoad && <SaveLoadMenu />}
    </div>
  );
}
