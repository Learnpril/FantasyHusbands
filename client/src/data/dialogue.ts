import { DialogueNode } from '../types/game';

export const dialogueNodes: Record<string, DialogueNode> = {
  // Introduction dialogue for each character
  intro_akira: {
    id: 'intro_akira',
    characterId: 'akira',
    speaker: 'Akira',
    text: 'Greetings. I am Akira Shadowbane, knight of the realm. It is my duty to ensure your safety during your stay at the castle.',
    background: '/images/backgrounds/castle.svg',
    characterSprite: '/images/characters/akira.svg',
    choices: [
      {
        id: 'akira_choice_1',
        text: 'Thank you for your dedication to duty.',
        affectionChange: 3,
        characterId: 'akira',
        nextDialogueId: 'akira_duty_response'
      },
      {
        id: 'akira_choice_2',
        text: 'Do you ever take time for yourself?',
        affectionChange: 1,
        characterId: 'akira',
        nextDialogueId: 'akira_personal_response'
      },
      {
        id: 'akira_choice_3',
        text: 'You seem very serious.',
        affectionChange: -1,
        characterId: 'akira',
        nextDialogueId: 'akira_serious_response'
      }
    ]
  },

  akira_duty_response: {
    id: 'akira_duty_response',
    characterId: 'akira',
    speaker: 'Akira',
    text: '*nods approvingly* Your understanding of duty is... refreshing. Many do not appreciate the weight of responsibility.',
    background: '/images/backgrounds/castle.svg',
    characterSprite: '/images/characters/akira.svg',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  },

  akira_personal_response: {
    id: 'akira_personal_response',
    characterId: 'akira',
    speaker: 'Akira',
    text: '*pauses thoughtfully* Personal time is... a luxury I rarely afford myself. Though I do enjoy the quiet moments at dawn before training.',
    background: '/images/backgrounds/castle.svg',
    characterSprite: '/images/characters/akira.svg',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  },

  akira_serious_response: {
    id: 'akira_serious_response',
    characterId: 'akira',
    speaker: 'Akira',
    text: '*furrows brow slightly* Seriousness is necessary when lives depend on your actions. Perhaps you will understand in time.',
    background: '/images/backgrounds/castle.svg',
    characterSprite: '/images/characters/akira.svg',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  },

  intro_felix: {
    id: 'intro_felix',
    characterId: 'felix',
    speaker: 'Felix',
    text: '*grins mischievously* Well hello there! I\'m Felix, the court\'s resident magic enthusiast. Care to see something amazing?',
    background: '/images/backgrounds/library.svg',
    characterSprite: '/images/characters/felix.svg',
    choices: [
      {
        id: 'felix_choice_1',
        text: 'I\'d love to see your magic!',
        affectionChange: 4,
        characterId: 'felix',
        nextDialogueId: 'felix_magic_response'
      },
      {
        id: 'felix_choice_2',
        text: 'Is it safe?',
        affectionChange: 1,
        characterId: 'felix',
        nextDialogueId: 'felix_safe_response'
      },
      {
        id: 'felix_choice_3',
        text: 'Maybe later...',
        affectionChange: -2,
        characterId: 'felix',
        nextDialogueId: 'felix_later_response'
      }
    ]
  },

  felix_magic_response: {
    id: 'felix_magic_response',
    characterId: 'felix',
    speaker: 'Felix',
    text: '*eyes light up* Excellent! *waves hand and sparkles dance through the air* Just a simple light charm, but I\'ve been working on making the patterns more intricate!',
    background: '/images/backgrounds/library.svg',
    characterSprite: '/images/characters/felix.svg',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  },

  felix_safe_response: {
    id: 'felix_safe_response',
    characterId: 'felix',
    speaker: 'Felix',
    text: '*laughs* Of course it\'s safe! Well... mostly. I only set the library on fire once, and that was months ago!',
    background: '/images/backgrounds/library.svg',
    characterSprite: '/images/characters/felix.svg',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  },

  felix_later_response: {
    id: 'felix_later_response',
    characterId: 'felix',
    speaker: 'Felix',
    text: '*pouts slightly* Aw, come on! Magic is so much more fun when you have an audience. But I suppose I can wait...',
    background: '/images/backgrounds/library.svg',
    characterSprite: '/images/characters/felix.svg',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  },

  intro_dante: {
    id: 'intro_dante',
    characterId: 'dante',
    speaker: 'Dante',
    text: '*bows gracefully* Like moonlight upon still waters, you grace this humble place with beauty. I am Dante, weaver of words and melodies.',
    background: '/images/backgrounds/forest.svg',
    characterSprite: '/images/characters/dante.svg',
    choices: [
      {
        id: 'dante_choice_1',
        text: 'That was beautifully said.',
        affectionChange: 3,
        characterId: 'dante',
        nextDialogueId: 'dante_poetry_response'
      },
      {
        id: 'dante_choice_2',
        text: 'Do you always speak in poetry?',
        affectionChange: 2,
        characterId: 'dante',
        nextDialogueId: 'dante_always_response'
      },
      {
        id: 'dante_choice_3',
        text: 'You\'re quite the charmer.',
        affectionChange: 1,
        characterId: 'dante',
        nextDialogueId: 'dante_charmer_response'
      }
    ]
  },

  dante_poetry_response: {
    id: 'dante_poetry_response',
    characterId: 'dante',
    speaker: 'Dante',
    text: '*smiles warmly* Your appreciation warms my heart like sunrise after the darkest night. Few truly listen to the music in words.',
    background: '/images/backgrounds/forest.svg',
    characterSprite: '/images/characters/dante.svg',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  },

  dante_always_response: {
    id: 'dante_always_response',
    characterId: 'dante',
    speaker: 'Dante',
    text: '*chuckles softly* When the world itself sings with such beauty, how can one not respond in kind? Though I admit, ordering breakfast can become rather elaborate.',
    background: '/images/backgrounds/forest.svg',
    characterSprite: '/images/characters/dante.svg',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  },

  dante_charmer_response: {
    id: 'dante_charmer_response',
    characterId: 'dante',
    speaker: 'Dante',
    text: '*laughs melodiously* Charm is but truth dressed in beautiful words, and truth demands I say you are enchanting.',
    background: '/images/backgrounds/forest.svg',
    characterSprite: '/images/characters/dante.svg',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  },

  intro_kai: {
    id: 'intro_kai',
    characterId: 'kai',
    speaker: 'Kai',
    text: '*emerges from the shadows* You shouldn\'t wander alone at night. The darkness holds more dangers than you know. I am Kai.',
    background: '/images/backgrounds/forest.svg',
    characterSprite: '/images/characters/kai.svg',
    choices: [
      {
        id: 'kai_choice_1',
        text: 'Thank you for the warning.',
        affectionChange: 2,
        characterId: 'kai',
        nextDialogueId: 'kai_warning_response'
      },
      {
        id: 'kai_choice_2',
        text: 'You startled me!',
        affectionChange: 1,
        characterId: 'kai',
        nextDialogueId: 'kai_startled_response'
      },
      {
        id: 'kai_choice_3',
        text: 'I can take care of myself.',
        affectionChange: -1,
        characterId: 'kai',
        nextDialogueId: 'kai_independent_response'
      }
    ]
  },

  kai_warning_response: {
    id: 'kai_warning_response',
    characterId: 'kai',
    speaker: 'Kai',
    text: '*nods approvingly* Wisdom. Those who heed warnings tend to live longer. I respect that.',
    background: '/images/backgrounds/forest.svg',
    characterSprite: '/images/characters/kai.svg',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  },

  kai_startled_response: {
    id: 'kai_startled_response',
    characterId: 'kai',
    speaker: 'Kai',
    text: '*slight smile* Good. If I can startle you, so can enemies. Consider it a lesson in awareness.',
    background: '/images/backgrounds/forest.svg',
    characterSprite: '/images/characters/kai.svg',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  },

  kai_independent_response: {
    id: 'kai_independent_response',
    characterId: 'kai',
    speaker: 'Kai',
    text: '*raises an eyebrow* Perhaps. But confidence without caution is how people end up dead. Remember that.',
    background: '/images/backgrounds/forest.svg',
    characterSprite: '/images/characters/kai.svg',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  },

  scene_end: {
    id: 'scene_end',
    speaker: 'Narrator',
    text: 'The conversation comes to a natural end, leaving you with much to think about...',
    choices: [
      {
        id: 'return_to_menu',
        text: 'Return to character selection',
        nextDialogueId: 'character_selection'
      }
    ],
    isEnd: true
  }
};
