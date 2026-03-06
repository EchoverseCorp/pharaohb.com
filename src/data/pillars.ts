export interface PillarCard {
  title: string;
  type: 'article' | 'writing' | 'book' | 'media' | 'resource';
  description: string;
  href: string;
}

export interface Pillar {
  slug:
    | 'think-clearly'
    | 'build-discipline'
    | 'find-direction'
    | 'creative-expression'
    | 'books-and-tools';
  title: string;
  subtitle: string;
  orientation: string;
  intro: string;
  whoFor: string[];
  starterCards: PillarCard[];
}

export const pillars: Pillar[] = [
  {
    slug: 'think-clearly',
    title: 'Think Clearly',
    subtitle: 'Reduce noise. Improve decisions.',
    orientation: 'Start here if you are overthinking and second-guessing yourself.',
    intro:
      'This pillar helps you separate useful thinking from anxious looping. Use these pieces to reset attention, make decisions faster, and move with confidence.',
    whoFor: [
      'You replay conversations and decisions constantly.',
      'You spend more time planning than executing.',
      'You feel mentally overloaded and distracted.',
    ],
    starterCards: [
      {
        title: 'How to Stop Overthinking',
        type: 'article',
        description: 'A practical guide with methods you can use immediately.',
        href: '/articles/how-to-stop-overthinking-guide',
      },
      {
        title: 'The Art of Not Thinking Yourself to Death',
        type: 'media',
        description: 'Audio/video support for interrupting thought spirals.',
        href: '/media',
      },
      {
        title: 'The Currency of Silence',
        type: 'writing',
        description: 'Use intentional stillness as a clarity practice.',
        href: '/writings/the-currency-of-silence',
      },
      {
        title: 'Library Fundamentals',
        type: 'book',
        description: 'Long-form frameworks that sharpen decision quality.',
        href: '/library',
      },
    ],
  },
  {
    slug: 'build-discipline',
    title: 'Build Discipline',
    subtitle: 'From motivation spikes to consistent action.',
    orientation: 'Start here if you struggle with consistency and follow-through.',
    intro:
      'Discipline is a system, not a mood. This pillar gives you frameworks, routines, and accountability patterns to execute even when motivation is low.',
    whoFor: [
      'You start strong and then drift.',
      'You know what to do but delay action.',
      'You want structure without burnout.',
    ],
    starterCards: [
      {
        title: 'Stop Procrastinating, Start Living',
        type: 'article',
        description: 'Core behavior shifts to move from delay to execution.',
        href: '/articles/stop-procrastinating-start-living',
      },
      {
        title: 'Self-Discipline Affirmations',
        type: 'media',
        description: 'Daily reinforcement for consistency and follow-through.',
        href: '/media',
      },
      {
        title: 'The Architecture of Self',
        type: 'writing',
        description: 'Build inner structure around intention and standards.',
        href: '/writings/the-architecture-of-self',
      },
      {
        title: 'Books for Discipline',
        type: 'book',
        description: 'Use long-form systems to make execution automatic.',
        href: '/books',
      },
    ],
  },
  {
    slug: 'find-direction',
    title: 'Find Direction',
    subtitle: 'Reconnect to purpose and choose a path.',
    orientation: 'Start here if you feel lost, scattered, or unsure what to build.',
    intro:
      'Direction is less about one perfect answer and more about consistent alignment. Use this pillar to clarify priorities and create a forward plan.',
    whoFor: [
      'You feel pulled in too many directions.',
      'You want meaningful work, not just activity.',
      'You need a practical way to choose your next move.',
    ],
    starterCards: [
      {
        title: 'A Vision for Humanity',
        type: 'article',
        description: 'A big-picture framework for values-based direction.',
        href: '/articles/a-vision-for-humanity',
      },
      {
        title: 'Letters to the Unborn',
        type: 'writing',
        description: 'A reflective lens for long-term identity and purpose.',
        href: '/writings/letters-to-the-unborn',
      },
      {
        title: 'Start Here Framework',
        type: 'resource',
        description: 'Use the onboarding path to decide where to begin.',
        href: '/start',
      },
      {
        title: 'Purpose Media Path',
        type: 'media',
        description: 'Video/audio designed to restore perspective and direction.',
        href: '/media',
      },
    ],
  },
  {
    slug: 'creative-expression',
    title: 'Creative Expression',
    subtitle: 'Turn insight into words, sound, and visual work.',
    orientation: 'Start here if you want to express ideas through art, writing, or media.',
    intro:
      'This pillar is for creators. Use it to move from internal pressure to external expression through poems, essays, music, and visual work.',
    whoFor: [
      'You have ideas but struggle to ship.',
      'You want to create consistently across formats.',
      'You need inspiration without losing structure.',
    ],
    starterCards: [
      {
        title: 'Creative Hub',
        type: 'resource',
        description: 'Browse poetry, music, art, and media in one place.',
        href: '/creative',
      },
      {
        title: 'Poetry + Writings',
        type: 'writing',
        description: 'Short and long-form expression frameworks.',
        href: '/writings',
      },
      {
        title: 'Music Projects',
        type: 'media',
        description: 'Frequencies, spoken word, and original tracks.',
        href: '/music',
      },
      {
        title: 'Art Collections',
        type: 'resource',
        description: 'Visual storytelling and print-ready works.',
        href: '/art',
      },
    ],
  },
  {
    slug: 'books-and-tools',
    title: 'Books and Tools',
    subtitle: 'Curated recommendations for better thinking and execution.',
    orientation: 'Start here if you want curated references and practical tools.',
    intro:
      'This pillar consolidates books, frameworks, and practical resources you can apply to work, thinking, and personal growth.',
    whoFor: [
      'You want trusted recommendations without noise.',
      'You prefer practical references over endless content.',
      'You want one place for reading lists and tools.',
    ],
    starterCards: [
      {
        title: 'Resources Hub',
        type: 'resource',
        description: 'Curated tools, books, and reference materials.',
        href: '/resources',
      },
      {
        title: 'Library',
        type: 'book',
        description: 'Core long-form systems and structured teachings.',
        href: '/library',
      },
      {
        title: 'Books',
        type: 'book',
        description: 'Published and in-progress works by Pharaoh B.',
        href: '/books',
      },
      {
        title: 'Shop + Extensions',
        type: 'resource',
        description: 'Products as a natural extension of core ideas.',
        href: '/shop',
      },
    ],
  },
];

export const getPillarBySlug = (slug: string): Pillar | undefined =>
  pillars.find((pillar) => pillar.slug === slug);
