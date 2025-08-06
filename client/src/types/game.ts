export interface Character {
  id: string;
  name: string;
  age: number;
  occupation: string;
  personality: string;
  backstory: string;
  sprite: string;
  affection: number;
  maxAffection: number;
  favoriteGifts: string[];
  traits: string[];
  voiceType: 'deep' | 'warm' | 'gentle' | 'mysterious';
}

export interface DialogueChoice {
  id: string;
  text: string;
  affectionChange?: number;
  characterId?: string;
  nextDialogueId?: string;
  condition?: {
    characterId: string;
    minAffection: number;
  };
}

export interface DialogueNode {
  id: string;
  characterId?: string;
  speaker: string;
  text: string;
  background?: string;
  characterSprite?: string;
  choices: DialogueChoice[];
  nextDialogueId?: string;
  isEnd?: boolean;
}

export interface Scene {
  id: string;
  title: string;
  description: string;
  background: string;
  unlockConditions?: {
    characterId: string;
    minAffection: number;
  }[];
  startDialogueId: string;
}

export interface GameSave {
  id: string;
  name: string;
  timestamp: number;
  currentSceneId: string;
  currentDialogueId: string;
  characters: Record<string, number>; // characterId -> affection
  unlockedScenes: string[];
  gameProgress: number;
}

export type GamePhase = 'menu' | 'character-selection' | 'scene' | 'dialogue' | 'settings' | 'save-load';
