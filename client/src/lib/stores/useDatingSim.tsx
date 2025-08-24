import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { Character, GamePhase, GameSave, Scene } from '../../types/game';
import { characters as initialCharacters } from '../../data/characters';
import { scenes } from '../../data/scenes';
import { getLocalStorage, setLocalStorage } from '../utils';

interface DatingSimState {
  // Game state
  phase: GamePhase;
  characters: Character[];
  currentCharacterId?: string;
  currentSceneId?: string;
  currentDialogueId?: string;
  unlockedScenes: string[];
  gameProgress: number;
  
  // UI state
  showSettings: boolean;
  showSaveLoad: boolean;
  musicVolume: number;
  soundVolume: number;
  autoAdvance: boolean;
  textSpeed: number;
  
  // Actions
  setPhase: (phase: GamePhase) => void;
  selectCharacter: (characterId: string) => void;
  updateAffection: (characterId: string, change: number) => void;
  setCurrentDialogue: (dialogueId: string) => void;
  setCurrentScene: (sceneId: string) => void;
  unlockScene: (sceneId: string) => void;
  
  // Settings
  toggleSettings: () => void;
  toggleSaveLoad: () => void;
  setMusicVolume: (volume: number) => void;
  setSoundVolume: (volume: number) => void;
  setAutoAdvance: (auto: boolean) => void;
  setTextSpeed: (speed: number) => void;
  
  // Save/Load
  saveGame: (name: string) => void;
  loadGame: (saveId: string) => void;
  getSaves: () => GameSave[];
  deleteSave: (saveId: string) => void;
  
  // Utility
  getCharacter: (id: string) => Character | undefined;
  getAvailableScenes: () => Scene[];
  resetGame: () => void;
}

const SAVE_KEY = 'dating_sim_saves';
const SETTINGS_KEY = 'dating_sim_settings';

export const useDatingSim = create<DatingSimState>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    phase: 'menu',
    characters: initialCharacters,
    unlockedScenes: ['introduction'],
    gameProgress: 0,
    
    // UI state
    showSettings: false,
    showSaveLoad: false,
    musicVolume: 0.7,
    soundVolume: 0.8,
    autoAdvance: false,
    textSpeed: 50,
    
    // Actions
    setPhase: (phase) => set({ phase }),
    
    selectCharacter: (characterId) => {
      const state = get();
      const isFromForestJourney = state.phase === 'forest-journey';
      const dialogueId = isFromForestJourney ? `forest_encounter_${characterId}` : `intro_${characterId}`;
      
      set({ 
        currentCharacterId: characterId,
        currentSceneId: 'introduction',
        currentDialogueId: dialogueId,
        phase: 'dialogue'
      });
    },
    
    updateAffection: (characterId, change) => {
      set((state) => ({
        characters: state.characters.map(char => 
          char.id === characterId 
            ? { ...char, affection: Math.max(0, Math.min(char.maxAffection, char.affection + change)) }
            : char
        )
      }));
      
      // Check for scene unlocks
      const character = get().getCharacter(characterId);
      if (character) {
        scenes.forEach(scene => {
          if (scene.unlockConditions) {
            const shouldUnlock = scene.unlockConditions.every(condition => {
              const char = get().getCharacter(condition.characterId);
              return char && char.affection >= condition.minAffection;
            });
            
            if (shouldUnlock && !get().unlockedScenes.includes(scene.id)) {
              get().unlockScene(scene.id);
            }
          }
        });
      }
    },
    
    setCurrentDialogue: (dialogueId) => set({ currentDialogueId: dialogueId }),
    setCurrentScene: (sceneId) => set({ currentSceneId: sceneId }),
    
    unlockScene: (sceneId) => {
      set((state) => ({
        unlockedScenes: [...state.unlockedScenes, sceneId]
      }));
    },
    
    // Settings
    toggleSettings: () => set((state) => ({ showSettings: !state.showSettings })),
    toggleSaveLoad: () => set((state) => ({ showSaveLoad: !state.showSaveLoad })),
    
    setMusicVolume: (volume) => {
      set({ musicVolume: volume });
      setLocalStorage(SETTINGS_KEY, { ...getLocalStorage(SETTINGS_KEY), musicVolume: volume });
    },
    
    setSoundVolume: (volume) => {
      set({ soundVolume: volume });
      setLocalStorage(SETTINGS_KEY, { ...getLocalStorage(SETTINGS_KEY), soundVolume: volume });
    },
    
    setAutoAdvance: (auto) => {
      set({ autoAdvance: auto });
      setLocalStorage(SETTINGS_KEY, { ...getLocalStorage(SETTINGS_KEY), autoAdvance: auto });
    },
    
    setTextSpeed: (speed) => {
      set({ textSpeed: speed });
      setLocalStorage(SETTINGS_KEY, { ...getLocalStorage(SETTINGS_KEY), textSpeed: speed });
    },
    
    // Save/Load
    saveGame: (name) => {
      const state = get();
      const save: GameSave = {
        id: Date.now().toString(),
        name,
        timestamp: Date.now(),
        currentSceneId: state.currentSceneId || 'introduction',
        currentDialogueId: state.currentDialogueId || '',
        characters: state.characters.reduce((acc, char) => ({
          ...acc,
          [char.id]: char.affection
        }), {}),
        unlockedScenes: state.unlockedScenes,
        gameProgress: state.gameProgress
      };
      
      const saves = getLocalStorage(SAVE_KEY) || [];
      saves.push(save);
      setLocalStorage(SAVE_KEY, saves);
    },
    
    loadGame: (saveId) => {
      const saves = getLocalStorage(SAVE_KEY) || [];
      const save = saves.find((s: GameSave) => s.id === saveId);
      
      if (save) {
        set((state) => ({
          currentSceneId: save.currentSceneId,
          currentDialogueId: save.currentDialogueId,
          unlockedScenes: save.unlockedScenes,
          gameProgress: save.gameProgress,
          characters: state.characters.map(char => ({
            ...char,
            affection: save.characters[char.id] || 0
          })),
          phase: 'dialogue',
          showSaveLoad: false
        }));
      }
    },
    
    getSaves: () => {
      return getLocalStorage(SAVE_KEY) || [];
    },
    
    deleteSave: (saveId) => {
      const saves = getLocalStorage(SAVE_KEY) || [];
      const filteredSaves = saves.filter((s: GameSave) => s.id !== saveId);
      setLocalStorage(SAVE_KEY, filteredSaves);
    },
    
    // Utility
    getCharacter: (id) => {
      return get().characters.find(char => char.id === id);
    },
    
    getAvailableScenes: () => {
      const { unlockedScenes } = get();
      return scenes.filter(scene => unlockedScenes.includes(scene.id));
    },
    
    resetGame: () => {
      set({
        phase: 'menu',
        characters: initialCharacters,
        currentCharacterId: undefined,
        currentSceneId: undefined,
        currentDialogueId: undefined,
        unlockedScenes: ['introduction'],
        gameProgress: 0
      });
    }
  }))
);

// Load settings on initialization
const savedSettings = getLocalStorage(SETTINGS_KEY);
if (savedSettings) {
  useDatingSim.setState({
    musicVolume: savedSettings.musicVolume ?? 0.7,
    soundVolume: savedSettings.soundVolume ?? 0.8,
    autoAdvance: savedSettings.autoAdvance ?? false,
    textSpeed: savedSettings.textSpeed ?? 50
  });
}
