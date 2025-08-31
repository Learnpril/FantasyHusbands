import { Character } from '../types/game';

export const characters: Character[] = [
  {
    id: 'akira',
    name: 'Akira Shadowbane',
    age: 24,
    occupation: 'Royal Knight',
    personality: 'Stoic and honorable, but has a soft spot for those he cares about',
    backstory: 'The youngest knight to ever serve the royal family, Akira carries the weight of his duties with quiet determination. Born into a family of blacksmiths, he earned his position through skill and unwavering loyalty.',
    sprite: `${import.meta.env.BASE_URL}images/characters/akira.png`,
    affection: 0,
    maxAffection: 100,
    favoriteGifts: ['sword polish', 'training manual', 'honor medal'],
    traits: ['loyal', 'protective', 'serious', 'secretly romantic'],
    voiceType: 'deep'
  },
  {
    id: 'felix',
    name: 'Felix Starweaver',
    age: 22,
    occupation: 'Court Mage',
    personality: 'Playful and mischievous, loves experimenting with magic',
    backstory: 'A prodigy in the magical arts, Felix comes from a long line of distinguished mages. Despite his talent, he prefers to use magic for fun rather than formal duties, much to the court\'s dismay.',
    sprite: `${import.meta.env.BASE_URL}images/characters/felix.png`,
    affection: 0,
    maxAffection: 100,
    favoriteGifts: ['rare crystal', 'magic tome', 'star map'],
    traits: ['playful', 'intelligent', 'curious', 'charming'],
    voiceType: 'warm'
  },
  {
    id: 'dante',
    name: 'Dante Moonwhisper',
    age: 26,
    occupation: 'Traveling Bard',
    personality: 'Gentle and artistic, speaks in poetry and song',
    backstory: 'A wandering bard who captures hearts with his melodies and stories. Dante has traveled across many kingdoms, collecting tales and songs, but something about this place makes him want to stay.',
    sprite: `${import.meta.env.BASE_URL}images/characters/dante.png`,
    affection: 0,
    maxAffection: 100,
    favoriteGifts: ['musical instrument', 'poetry book', 'pressed flower'],
    traits: ['artistic', 'romantic', 'gentle', 'worldly'],
    voiceType: 'gentle'
  },
  {
    id: 'kai',
    name: 'Kai Nightfall',
    age: 25,
    occupation: 'Royal Assassin',
    personality: 'Mysterious and aloof, but deeply passionate beneath the surface',
    backstory: 'Once an orphan on the streets, Kai was taken in by the royal spy network and trained in the arts of stealth and combat. He operates in the shadows to protect the kingdom, though few know of his true role.',
    sprite: `${import.meta.env.BASE_URL}images/characters/kai.png`,
    affection: 0,
    maxAffection: 100,
    favoriteGifts: ['throwing knife', 'shadow cloak', 'rare poison'],
    traits: ['mysterious', 'skilled', 'loyal', 'complex'],
    voiceType: 'mysterious'
  },
  {
    id: 'ryuu',
    name: 'Ryuu Dragonheart',
    age: 28,
    occupation: 'Dragon Tamer',
    personality: 'Fierce and independent, with a wild spirit that matches the dragons he commands',
    backstory: 'Born in the mountain clans, Ryuu formed a bond with dragons at a young age. Now he serves as the kingdom\'s Dragon Tamer, bridging the gap between human and dragon-kind. His untamed nature hides a surprisingly tender heart.',
    sprite: `${import.meta.env.BASE_URL}images/characters/ryuu.png`,
    affection: 0,
    maxAffection: 100,
    favoriteGifts: ['dragon scale', 'mountain flower', 'fire crystal'],
    traits: ['wild', 'independent', 'fierce', 'protective'],
    voiceType: 'deep'
  },
  {
    id: 'zephyr',
    name: 'Zephyr Moonlight',
    age: 23,
    occupation: 'Royal Scholar',
    personality: 'Brilliant and bookish, but surprisingly flirtatious when he opens up',
    backstory: 'A prodigy who earned his position as Royal Scholar at an unusually young age. Zephyr spends his days researching ancient magic and forgotten histories. Behind his scholarly exterior lies a playful, teasing personality that emerges around those he trusts.',
    sprite: `${import.meta.env.BASE_URL}images/characters/zephyr.png`,
    affection: 0,
    maxAffection: 100,
    favoriteGifts: ['ancient tome', 'rare ink', 'moonstone'],
    traits: ['intelligent', 'witty', 'teasing', 'studious'],
    voiceType: 'gentle'
  }
];
