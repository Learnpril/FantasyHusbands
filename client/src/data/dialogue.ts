import { DialogueNode } from '../types/game';

export const dialogueNodes: Record<string, DialogueNode> = {
  // Introduction dialogue for each character
  intro_akira: {
    id: 'intro_akira',
    characterId: 'akira',
    speaker: 'Akira',
    text: 'Greetings. I am Akira Shadowbane, knight of the realm. It is my duty to ensure your safety during your stay at the castle.',
    background: '/images/characters/akira.png',
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
    background: '/images/characters/akira.png',
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
    background: '/images/characters/akira.png',
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
    background: '/images/characters/akira.png',
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
    background: '/images/characters/felix.png',
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
    background: '/images/characters/felix.png',
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
    background: '/images/characters/felix.png',
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
    background: '/images/characters/felix.png',
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
    background: '/images/characters/dante.png',
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
    background: '/images/characters/dante.png',
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
    background: '/images/characters/dante.png',
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
    background: '/images/characters/dante.png',
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
    background: '/images/characters/kai.png',
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
    background: '/images/characters/kai.png',
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
    background: '/images/characters/kai.png',
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
    background: '/images/characters/kai.png',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  },

  intro_ryuu: {
    id: 'intro_ryuu',
    characterId: 'ryuu',
    speaker: 'Ryuu',
    text: '*emerges from behind a tree, a small dragon perched on his shoulder* You\'re either very brave or very foolish to wander into dragon territory. I\'m Ryuu.',
    background: '/images/characters/ryuu.png',
    choices: [
      {
        id: 'ryuu_choice_1',
        text: 'That dragon is amazing!',
        affectionChange: 4,
        characterId: 'ryuu',
        nextDialogueId: 'ryuu_dragon_response'
      },
      {
        id: 'ryuu_choice_2',
        text: 'Are you going to hurt me?',
        affectionChange: 1,
        characterId: 'ryuu',
        nextDialogueId: 'ryuu_hurt_response'
      },
      {
        id: 'ryuu_choice_3',
        text: 'I\'m not afraid of you.',
        affectionChange: 2,
        characterId: 'ryuu',
        nextDialogueId: 'ryuu_fearless_response'
      }
    ]
  },

  ryuu_dragon_response: {
    id: 'ryuu_dragon_response',
    characterId: 'ryuu',
    speaker: 'Ryuu',
    text: '*grins and the dragon chirps proudly* Her name is Ember. Most people are terrified of her, but you... you see her beauty. That\'s rare.',
    background: '/images/characters/ryuu.png',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  },

  ryuu_hurt_response: {
    id: 'ryuu_hurt_response',
    characterId: 'ryuu',
    speaker: 'Ryuu',
    text: '*looks surprised, then softens* Hurt you? I protect these lands and all who walk them peacefully. You have nothing to fear from me.',
    background: '/images/characters/ryuu.png',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  },

  ryuu_fearless_response: {
    id: 'ryuu_fearless_response',
    characterId: 'ryuu',
    speaker: 'Ryuu',
    text: '*laughs heartily* Good! Fear makes people do stupid things. I respect courage, even when it borders on recklessness.',
    background: '/images/characters/ryuu.png',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  },

  intro_zephyr: {
    id: 'intro_zephyr',
    characterId: 'zephyr',
    speaker: 'Zephyr',
    text: '*looks up from an ancient tome, adjusting his glasses* Oh! I didn\'t expect company in the archives. I\'m Zephyr, Royal Scholar. Are you here for research, or... *smirks* something more interesting?',
    background: '/images/characters/zephyr.png',
    choices: [
      {
        id: 'zephyr_choice_1',
        text: 'What are you studying?',
        affectionChange: 3,
        characterId: 'zephyr',
        nextDialogueId: 'zephyr_study_response'
      },
      {
        id: 'zephyr_choice_2',
        text: 'Something more interesting?',
        affectionChange: 2,
        characterId: 'zephyr',
        nextDialogueId: 'zephyr_interesting_response'
      },
      {
        id: 'zephyr_choice_3',
        text: 'You look very young for a scholar.',
        affectionChange: 1,
        characterId: 'zephyr',
        nextDialogueId: 'zephyr_young_response'
      }
    ]
  },

  zephyr_study_response: {
    id: 'zephyr_study_response',
    characterId: 'zephyr',
    speaker: 'Zephyr',
    text: '*eyes light up* Ancient magical theory! This particular text describes lost enchantments that could... *pauses, noticing your interest* Well, aren\'t you a delightful surprise.',
    background: '/images/characters/zephyr.png',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  },

  zephyr_interesting_response: {
    id: 'zephyr_interesting_response',
    characterId: 'zephyr',
    speaker: 'Zephyr',
    text: '*closes book and leans back with a playful smile* Well, well. Someone who picks up on subtlety. I like that in a person. Perhaps we should get better acquainted.',
    background: '/images/characters/zephyr.png',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  },

  zephyr_young_response: {
    id: 'zephyr_young_response',
    characterId: 'zephyr',
    speaker: 'Zephyr',
    text: '*chuckles and adjusts glasses* Age is just a number when you have a brilliant mind. Though I admit, being a prodigy does have its... lonely moments.',
    background: '/images/characters/zephyr.png',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  },

  flight_start: {
    id: 'flight_start',
    characterId: 'ryuu',
    speaker: 'Ryuu',
    text: '*stands atop a mountain peak with three magnificent dragons circling overhead* You\'ve proven yourself trustworthy. How would you like to see the world from a dragon\'s perspective?',
    background: '/images/backgrounds/forest.svg',
    characterSprite: '/images/characters/ryuu.svg',
    choices: [
      {
        id: 'flight_excited',
        text: 'I would love that!',
        affectionChange: 5,
        characterId: 'ryuu',
        nextDialogueId: 'flight_excited_response'
      },
      {
        id: 'flight_nervous',
        text: 'Is it safe?',
        affectionChange: 2,
        characterId: 'ryuu',
        nextDialogueId: 'flight_nervous_response'
      },
      {
        id: 'flight_curious',
        text: 'Which dragon will we ride?',
        affectionChange: 3,
        characterId: 'ryuu',
        nextDialogueId: 'flight_curious_response'
      }
    ]
  },

  flight_excited_response: {
    id: 'flight_excited_response',
    characterId: 'ryuu',
    speaker: 'Ryuu',
    text: '*grins widely* That\'s the spirit! Ember here has taken a liking to you. *whistles and a majestic dragon lands gracefully* She\'ll take good care of us both.',
    background: '/images/backgrounds/forest.svg',
    characterSprite: '/images/characters/ryuu.svg',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  },

  flight_nervous_response: {
    id: 'flight_nervous_response',
    characterId: 'ryuu',
    speaker: 'Ryuu',
    text: '*places a reassuring hand on your shoulder* I\'ve been flying with dragons since I was a child. Trust me, there\'s nothing safer than being with a dragon who respects you.',
    background: '/images/backgrounds/forest.svg',
    characterSprite: '/images/characters/ryuu.svg',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  },

  flight_curious_response: {
    id: 'flight_curious_response',
    characterId: 'ryuu',
    speaker: 'Ryuu',
    text: '*looks thoughtful* Storm is the fastest, Azure is the most gentle, but Ember... *smiles warmly* Ember chooses her own riders. And she\'s chosen you.',
    background: '/images/backgrounds/forest.svg',
    characterSprite: '/images/characters/ryuu.svg',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  },

  research_start: {
    id: 'research_start',
    characterId: 'zephyr',
    speaker: 'Zephyr',
    text: '*looks up from a pile of ancient books, candlelight flickering* You\'re here late. Perfect timing actually - I could use someone with fresh eyes to help with this translation.',
    background: '/images/characters/zephyr.png',
    choices: [
      {
        id: 'research_help',
        text: 'I\'d be happy to help.',
        affectionChange: 4,
        characterId: 'zephyr',
        nextDialogueId: 'research_help_response'
      },
      {
        id: 'research_curious',
        text: 'What are you translating?',
        affectionChange: 3,
        characterId: 'zephyr',
        nextDialogueId: 'research_curious_response'
      },
      {
        id: 'research_tired',
        text: 'You should get some sleep.',
        affectionChange: 2,
        characterId: 'zephyr',
        nextDialogueId: 'research_tired_response'
      }
    ]
  },

  research_help_response: {
    id: 'research_help_response',
    characterId: 'zephyr',
    speaker: 'Zephyr',
    text: '*face lights up* Wonderful! *scoots closer, sharing the candlelight* This passage describes a lost magic that could revolutionize how we understand elemental theory. Your presence makes this work... enjoyable.',
    background: '/images/characters/zephyr.png',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  },

  research_curious_response: {
    id: 'research_curious_response',
    characterId: 'zephyr',
    speaker: 'Zephyr',
    text: '*adjusts glasses excitedly* Ancient Draconic texts about barrier magic. Most scholars think it\'s theoretical, but I believe it was once real. *grins* Care to help me prove them wrong?',
    background: '/images/characters/zephyr.png',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  },

  research_tired_response: {
    id: 'research_tired_response',
    characterId: 'zephyr',
    speaker: 'Zephyr',
    text: '*smiles softly* Sleep is for those who don\'t have fascinating mysteries to unravel. Though... *looks at you warmly* having company does make the night more pleasant.',
    background: '/images/characters/zephyr.png',
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
        id: 'return_to_forest',
        text: 'Continue your journey',
        nextDialogueId: 'return_to_forest'
      }
    ],
    isEnd: true
  }
,

  // Forest encounter dialogues - more organic first meetings
  forest_encounter_akira: {
    id: 'forest_encounter_akira',
    characterId: 'akira',
    speaker: 'Akira',
    text: '*You approach the training grounds and see a knight in gleaming armor practicing sword forms. He notices you and stops, lowering his blade respectfully* Greetings, traveler. I am Akira Shadowbane, Knight of the Realm. These are dangerous woods - are you lost?',
    background: '/images/characters/akira.png',
    choices: [
      {
        id: 'akira_forest_choice_1',
        text: 'I was just exploring the forest.',
        affectionChange: 2,
        characterId: 'akira',
        nextDialogueId: 'akira_forest_exploring_response'
      },
      {
        id: 'akira_forest_choice_2',
        text: 'Your sword work is impressive.',
        affectionChange: 3,
        characterId: 'akira',
        nextDialogueId: 'akira_forest_sword_response'
      },
      {
        id: 'akira_forest_choice_3',
        text: 'Are these woods really so dangerous?',
        affectionChange: 1,
        characterId: 'akira',
        nextDialogueId: 'akira_forest_danger_response'
      }
    ]
  },

  akira_forest_exploring_response: {
    id: 'akira_forest_exploring_response',
    characterId: 'akira',
    speaker: 'Akira',
    text: '*nods approvingly* A curious spirit is commendable, though caution is wise. I train here daily to protect travelers like yourself. Perhaps our paths will cross again.',
    background: '/images/characters/akira.png',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  },

  akira_forest_sword_response: {
    id: 'akira_forest_sword_response',
    characterId: 'akira',
    speaker: 'Akira',
    text: '*sheathes his sword with a slight smile* Your eye for swordsmanship suggests good judgment. Years of training have honed these skills - all in service of protecting the innocent.',
    background: '/images/characters/akira.png',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  },

  akira_forest_danger_response: {
    id: 'akira_forest_danger_response',
    characterId: 'akira',
    speaker: 'Akira',
    text: '*expression grows serious* Bandits, wild beasts, and worse things lurk in these depths. I patrol these paths to ensure safe passage for all. Your safety is my responsibility.',
    background: '/images/characters/akira.png',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  },

  forest_encounter_felix: {
    id: 'forest_encounter_felix',
    characterId: 'felix',
    speaker: 'Felix',
    text: '*As you enter the enchanted clearing, colorful magical lights dance around you. A young man with a mischievous grin emerges from behind a tree, magical energy swirling around his hands* Well, well! A visitor to my favorite practice spot. I\'m Felix Brightwater, court mage and master of magical mayhem. Care to see something amazing?',
    background: '/images/characters/felix.png',
    choices: [
      {
        id: 'felix_forest_choice_1',
        text: 'I\'d love to see your magic!',
        affectionChange: 4,
        characterId: 'felix',
        nextDialogueId: 'felix_forest_magic_response'
      },
      {
        id: 'felix_forest_choice_2',
        text: 'This place is beautiful.',
        affectionChange: 2,
        characterId: 'felix',
        nextDialogueId: 'felix_forest_beauty_response'
      },
      {
        id: 'felix_forest_choice_3',
        text: 'Are you practicing magic here?',
        affectionChange: 1,
        characterId: 'felix',
        nextDialogueId: 'felix_forest_practice_response'
      }
    ]
  },

  felix_forest_magic_response: {
    id: 'felix_forest_magic_response',
    characterId: 'felix',
    speaker: 'Felix',
    text: '*eyes light up with excitement* Now that\'s what I like to hear! *waves his hand and creates a shower of sparkles that form into tiny butterflies* Magic is meant to bring joy and wonder to the world!',
    background: '/images/characters/felix.png',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  },

  felix_forest_beauty_response: {
    id: 'felix_forest_beauty_response',
    characterId: 'felix',
    speaker: 'Felix',
    text: '*grins proudly* Isn\'t it? The magical energy here makes everything more vibrant. I may have... enhanced the natural beauty just a touch. This clearing responds to positive emotions!',
    background: '/images/characters/felix.png',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  },

  felix_forest_practice_response: {
    id: 'felix_forest_practice_response',
    characterId: 'felix',
    speaker: 'Felix',
    text: '*nods enthusiastically* The castle can be so stuffy for magic practice. Out here, I can really let loose without worrying about singeing any tapestries. Again.',
    background: '/images/characters/felix.png',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  },

  forest_encounter_dante: {
    id: 'forest_encounter_dante',
    characterId: 'dante',
    speaker: 'Dante',
    text: '*A hauntingly beautiful melody drifts through the ancient trees. You follow the sound and discover a young man with gentle eyes sitting beneath an old oak, playing a wooden flute. He looks up with a warm smile* Like moonbeams finding their way through midnight\'s veil, you have found me here. I am Dante Heartstring, humble keeper of songs and stories.',
    background: '/images/characters/dante.png',
    choices: [
      {
        id: 'dante_forest_choice_1',
        text: 'Your music is beautiful.',
        affectionChange: 4,
        characterId: 'dante',
        nextDialogueId: 'dante_forest_music_response'
      },
      {
        id: 'dante_forest_choice_2',
        text: 'Do you often play here?',
        affectionChange: 2,
        characterId: 'dante',
        nextDialogueId: 'dante_forest_often_response'
      },
      {
        id: 'dante_forest_choice_3',
        text: 'You speak like a poet.',
        affectionChange: 3,
        characterId: 'dante',
        nextDialogueId: 'dante_forest_poet_response'
      }
    ]
  },

  dante_forest_music_response: {
    id: 'dante_forest_music_response',
    characterId: 'dante',
    speaker: 'Dante',
    text: '*bows his head gracefully* Your words are honey to my soul. Music is but love made audible, and these ancient trees have heard countless tales of hearts entwined.',
    background: '/images/characters/dante.png',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  },

  dante_forest_often_response: {
    id: 'dante_forest_often_response',
    characterId: 'dante',
    speaker: 'Dante',
    text: '*nods thoughtfully* This grove holds the wisdom of ages. When I seek inspiration for new verses, these trees whisper their secrets to me. Each note I play here carries their ancient magic.',
    background: '/images/characters/dante.png',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  },

  dante_forest_poet_response: {
    id: 'dante_forest_poet_response',
    characterId: 'dante',
    speaker: 'Dante',
    text: '*chuckles softly* Words are but threads in the tapestry of human connection, dear wanderer. I weave them as others might craft gold - to create beauty that touches the heart.',
    background: '/images/characters/dante.png',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  },

  forest_encounter_kai: {
    id: 'forest_encounter_kai',
    characterId: 'kai',
    speaker: 'Kai',
    text: '*You\'re walking down the shadowy path when you suddenly sense you\'re being watched. A figure drops silently from the trees behind you* You have good instincts - most never sense me coming. I am Kai Nightfall. You shouldn\'t walk these dark paths alone.',
    background: '/images/characters/kai.png',
    choices: [
      {
        id: 'kai_forest_choice_1',
        text: 'You startled me.',
        affectionChange: 1,
        characterId: 'kai',
        nextDialogueId: 'kai_forest_startled_response'
      },
      {
        id: 'kai_forest_choice_2',
        text: 'Are you following me?',
        affectionChange: 2,
        characterId: 'kai',
        nextDialogueId: 'kai_forest_following_response'
      },
      {
        id: 'kai_forest_choice_3',
        text: 'Why shouldn\'t I walk alone?',
        affectionChange: 3,
        characterId: 'kai',
        nextDialogueId: 'kai_forest_alone_response'
      }
    ]
  },

  kai_forest_startled_response: {
    id: 'kai_forest_startled_response',
    characterId: 'kai',
    speaker: 'Kai',
    text: '*expression softens slightly* Forgive me. Moving unseen is... second nature. I patrol these shadows to keep travelers safe from things far more dangerous than myself.',
    background: '/images/characters/kai.png',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  },

  kai_forest_following_response: {
    id: 'kai_forest_following_response',
    characterId: 'kai',
    speaker: 'Kai',
    text: '*shakes head* Not following - protecting. These paths hide dangers you cannot see. I ensure safe passage for all who walk them, whether they know it or not.',
    background: '/images/characters/kai.png',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  },

  kai_forest_alone_response: {
    id: 'kai_forest_alone_response',
    characterId: 'kai',
    speaker: 'Kai',
    text: '*eyes narrow with concern* Because darkness harbors more than shadows. Creatures that hunt in silence, bandits who prey on the unwary. I work to eliminate these threats before they find you.',
    background: '/images/characters/kai.png',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  },

  forest_encounter_ryuu: {
    id: 'forest_encounter_ryuu',
    characterId: 'ryuu',
    speaker: 'Ryuu',
    text: '*A thunderous roar echoes from the mountain peaks above. You look up to see a magnificent dragon circling overhead before landing gracefully. A rugged young man slides down from its back, his wild hair blowing in the wind* That was quite a climb to reach my domain. I\'m Ryuu Dragonheart, and this is Ember. We don\'t get many visitors up here.',
    background: '/images/characters/ryuu.png',
    choices: [
      {
        id: 'ryuu_forest_choice_1',
        text: 'Your dragon is incredible!',
        affectionChange: 4,
        characterId: 'ryuu',
        nextDialogueId: 'ryuu_forest_dragon_response'
      },
      {
        id: 'ryuu_forest_choice_2',
        text: 'I\'ve never seen anyone ride a dragon.',
        affectionChange: 2,
        characterId: 'ryuu',
        nextDialogueId: 'ryuu_forest_ride_response'
      },
      {
        id: 'ryuu_forest_choice_3',
        text: 'This place feels wild and free.',
        affectionChange: 3,
        characterId: 'ryuu',
        nextDialogueId: 'ryuu_forest_wild_response'
      }
    ]
  },

  ryuu_forest_dragon_response: {
    id: 'ryuu_forest_dragon_response',
    characterId: 'ryuu',
    speaker: 'Ryuu',
    text: '*grins and the dragon purrs proudly* Ember appreciates the compliment. Most people see dragons and run screaming. Takes real courage to see the beauty in something so powerful.',
    background: '/images/characters/ryuu.png',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  },

  ryuu_forest_ride_response: {
    id: 'ryuu_forest_ride_response',
    characterId: 'ryuu',
    speaker: 'Ryuu',
    text: '*laughs heartily* It\'s not about riding - it\'s about partnership. Ember and I understand each other. We both value freedom above all else, and together we soar where others fear to tread.',
    background: '/images/characters/ryuu.png',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  },

  ryuu_forest_wild_response: {
    id: 'ryuu_forest_wild_response',
    characterId: 'ryuu',
    speaker: 'Ryuu',
    text: '*nods approvingly* You understand. This is where we belong - not caged in castles or bound by others\' rules. Out here, with wind and sky and dragons, a soul can truly breathe.',
    background: '/images/characters/ryuu.png',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  },

  forest_encounter_zephyr: {
    id: 'forest_encounter_zephyr',
    characterId: 'zephyr',
    speaker: 'Zephyr',
    text: '*Approaching the ivy-covered stone structure, you see warm candlelight flickering through ancient windows. Inside, a young man with silver hair looks up from a collection of scrolls and books, adjusting his spectacles with surprise* Oh my! I wasn\'t expecting anyone to find this old archive. I\'m Zephyr Moonlight, Royal Scholar. Are you perhaps interested in forgotten lore, or... *smirks playfully* just lost?',
    background: '/images/characters/zephyr.png',
    choices: [
      {
        id: 'zephyr_forest_choice_1',
        text: 'What is this place?',
        affectionChange: 3,
        characterId: 'zephyr',
        nextDialogueId: 'zephyr_forest_place_response'
      },
      {
        id: 'zephyr_forest_choice_2',
        text: 'I\'m interested in your research.',
        affectionChange: 4,
        characterId: 'zephyr',
        nextDialogueId: 'zephyr_forest_research_response'
      },
      {
        id: 'zephyr_forest_choice_3',
        text: 'You look young for a scholar.',
        affectionChange: 1,
        characterId: 'zephyr',
        nextDialogueId: 'zephyr_forest_young_response'
      }
    ]
  },

  zephyr_forest_place_response: {
    id: 'zephyr_forest_place_response',
    characterId: 'zephyr',
    speaker: 'Zephyr',
    text: '*eyes light up with enthusiasm* This is a hidden archive from the old kingdom - filled with texts deemed \'too dangerous\' for the main library. I come here to study the forbidden knowledge that others fear to touch.',
    background: '/images/characters/zephyr.png',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  },

  zephyr_forest_research_response: {
    id: 'zephyr_forest_research_response',
    characterId: 'zephyr',
    speaker: 'Zephyr',
    text: '*leans forward excitedly* Finally, someone with intellectual curiosity! I\'m translating ancient texts about lost magic - the kind that could revolutionize everything we know. Care to help unravel some mysteries?',
    background: '/images/characters/zephyr.png',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  },

  zephyr_forest_young_response: {
    id: 'zephyr_forest_young_response',
    characterId: 'zephyr',
    speaker: 'Zephyr',
    text: '*adjusts glasses with a knowing smile* Age is just a number when you have an exceptional mind. Though I admit, being the youngest Royal Scholar in history does have its... interesting challenges.',
    background: '/images/characters/zephyr.png',
    choices: [
      {
        id: 'continue',
        text: 'Continue...',
        nextDialogueId: 'scene_end'
      }
    ]
  }

};
