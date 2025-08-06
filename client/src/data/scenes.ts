import { Scene } from '../types/game';

export const scenes: Scene[] = [
  {
    id: 'introduction',
    title: 'First Meetings',
    description: 'Meet the residents of the fantasy realm',
    background: '/images/backgrounds/castle.svg',
    startDialogueId: 'intro_selection'
  },
  {
    id: 'training_grounds',
    title: 'Training Grounds',
    description: 'Join Akira for sword practice',
    background: '/images/backgrounds/castle.svg',
    unlockConditions: [
      {
        characterId: 'akira',
        minAffection: 10
      }
    ],
    startDialogueId: 'training_start'
  },
  {
    id: 'magic_lesson',
    title: 'Magic Lesson',
    description: 'Learn about magic with Felix',
    background: '/images/backgrounds/library.svg',
    unlockConditions: [
      {
        characterId: 'felix',
        minAffection: 10
      }
    ],
    startDialogueId: 'magic_start'
  },
  {
    id: 'moonlight_serenade',
    title: 'Moonlight Serenade',
    description: 'Enjoy a private concert with Dante',
    background: '/images/backgrounds/forest.svg',
    unlockConditions: [
      {
        characterId: 'dante',
        minAffection: 15
      }
    ],
    startDialogueId: 'serenade_start'
  },
  {
    id: 'shadow_mission',
    title: 'Shadow Mission',
    description: 'Accompany Kai on a secret assignment',
    background: '/images/backgrounds/forest.svg',
    unlockConditions: [
      {
        characterId: 'kai',
        minAffection: 20
      }
    ],
    startDialogueId: 'mission_start'
  }
];
