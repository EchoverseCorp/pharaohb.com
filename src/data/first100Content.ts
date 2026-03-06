export type First100SectionKey =
  | 'think-clearly'
  | 'build-discipline'
  | 'find-direction'
  | 'creative-expression'
  | 'books-and-tools'
  | 'study-guides'
  | 'resources'
  | 'creative-media';

export interface First100Entry {
  section: First100SectionKey;
  title: string;
  slug: string;
  href: string;
  summary: string;
}

export interface First100Section {
  key: First100SectionKey;
  title: string;
  description: string;
  href: string;
  entries: First100Entry[];
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function makeSummary(title: string): string {
  return `A practical guide on ${title.toLowerCase()} with clear principles, examples, and actions you can apply immediately.`;
}

function createEntries(section: First100SectionKey, titles: string[], base: string): First100Entry[] {
  return titles.map((title) => {
    const slug = slugify(title);
    return {
      section,
      title,
      slug,
      href: `${base}/${slug}`,
      summary: makeSummary(title),
    };
  });
}

const thinkClearlyTitles = [
  'How to Stop Overthinking',
  'Why Overthinking Happens',
  "How to Make Decisions When You're Stuck",
  'The Difference Between Thinking and Rumination',
  'How to Quiet a Noisy Mind',
  'Mental Models for Clear Thinking',
  'The Psychology of Indecision',
  'The Cost of Overanalyzing Everything',
  'How to Trust Your Judgment',
  'Decision-Making Frameworks That Actually Work',
  'Thinking Clearly in an Age of Information Overload',
  'Cognitive Biases That Distort Thinking',
  'Stoic Techniques for Mental Clarity',
  'Journaling for Clear Thinking',
  'The Architecture of Thought',
];

const disciplineTitles = [
  'How to Build Discipline Without Burnout',
  'Why Motivation Fails',
  'The Science of Habit Formation',
  'Systems vs Goals',
  'Daily Routines That Actually Work',
  'Discipline and Self-Respect',
  'How to Stop Procrastinating',
  'Why Small Habits Create Big Change',
  'The Compound Effect of Daily Action',
  'The Psychology of Consistency',
  'How to Train Yourself to Follow Through',
  'Building Momentum in Life',
  'The Discipline Engine',
  'How to Create a Life System',
  'The Difference Between Busy and Productive',
];

const directionTitles = [
  'Why People Feel Lost in Life',
  'How to Find Direction Without a Life Plan',
  'The Difference Between Passion and Purpose',
  'How to Discover What You Should Build',
  'Questions That Reveal Your Direction',
  'Why Meaning Matters More Than Success',
  'Finding Direction Through Curiosity',
  'How to Design Your Life Path',
  'What to Do When You Feel Stuck in Life',
  'How to Build a Meaningful Life',
  'The Philosophy of Purpose',
  'Meaningful Work vs Meaningful Living',
  'What Great Thinkers Said About Purpose',
  'The Long Path of Self-Mastery',
  'Designing a Life Worth Living',
];

const creativeExpressionTitles = [
  'Why Creativity Matters for Human Growth',
  'Overcoming Creative Block',
  'Writing as a Tool for Thinking',
  'How Ideas Become Creative Work',
  'The Creative Process Explained',
  'Turning Ideas Into Reality',
  "The Artist's Discipline",
  'Creativity and Mental Freedom',
  'Why Humans Create Art',
  'Creative Expression as Self-Discovery',
];

const booksAndToolsTitles = [
  'Books That Changed My Thinking',
  'The Best Philosophy Books for Beginners',
  'The Best Self-Development Books Ever Written',
  'Stoicism Explained Simply',
  'The Most Influential Books on Thinking',
  'Philosophy for Modern Life',
  'The History of Self-Mastery Literature',
  'Why Ancient Philosophy Still Matters',
  'The Intellectual Roots of Self-Development',
  'A Beginner Guide to Philosophy',
];

const studyGuideTitles = [
  'Think and Grow Rich - Study Guide',
  'The Master Key System - Study Guide',
  'Meditations - Marcus Aurelius Study Guide',
  'Moonwalking With Einstein - Study Guide',
  'The Kybalion - Study Guide',
  'As a Man Thinketh - Study Guide',
  'The Power of Habit - Study Guide',
  'Atomic Habits - Study Guide',
  'The 7 Habits of Highly Effective People - Study Guide',
  "Man's Search for Meaning - Study Guide",
  'The War of Art - Study Guide',
  'Flow - Study Guide',
  'The Art of Thinking Clearly - Study Guide',
  'The Alchemist - Study Guide',
  'The Obstacle Is the Way - Study Guide',
];

const resourceTitles = [
  'Tools I Use to Think and Write',
  'Books for Clear Thinking',
  'Philosophy Books Everyone Should Read',
  'The Best Books for Self-Mastery',
  'My Personal Learning Library',
  'AI Tools for Thinking and Writing',
  'Writing Tools for Creators',
  'Audio and Recording Tools I Use',
  'Books That Improve Decision-Making',
  'The Best Study Guides for Self-Development',
];

const creativeMediaTitles = [
  'Echoes of Becoming',
  'Cosmic Alignment',
  'Sacred Geometries',
  'Frequency and the Science of Sound',
  'The Role of Music in Human Consciousness',
];

const sections: First100Section[] = [
  {
    key: 'think-clearly',
    title: 'Overthinking and Clarity',
    description: 'High-intent pages focused on reducing overthinking and improving decision quality.',
    href: '/think-clearly',
    entries: createEntries('think-clearly', thinkClearlyTitles, '/think-clearly'),
  },
  {
    key: 'build-discipline',
    title: 'Discipline and Action',
    description: 'Pages focused on consistency, habit systems, and execution without burnout.',
    href: '/build-discipline',
    entries: createEntries('build-discipline', disciplineTitles, '/build-discipline'),
  },
  {
    key: 'find-direction',
    title: 'Direction and Purpose',
    description: 'Pages for purpose, priorities, and building meaningful momentum.',
    href: '/find-direction',
    entries: createEntries('find-direction', directionTitles, '/find-direction'),
  },
  {
    key: 'creative-expression',
    title: 'Creative Expression',
    description: 'Pages for writing, creativity, and turning ideas into finished work.',
    href: '/creative-expression',
    entries: createEntries('creative-expression', creativeExpressionTitles, '/creative-expression'),
  },
  {
    key: 'books-and-tools',
    title: 'Library and Philosophy',
    description: 'Pages that connect books, philosophy, and self-development foundations.',
    href: '/books-and-tools',
    entries: createEntries('books-and-tools', booksAndToolsTitles, '/books-and-tools'),
  },
  {
    key: 'study-guides',
    title: 'Study Guides',
    description: 'Long-tail study guide pages with summaries, key ideas, and practical exercises.',
    href: '/study-guides',
    entries: createEntries('study-guides', studyGuideTitles, '/study-guides'),
  },
  {
    key: 'resources',
    title: 'Resources',
    description: 'Resource pages for tools, books, and creator systems.',
    href: '/resources',
    entries: createEntries('resources', resourceTitles, '/resources'),
  },
  {
    key: 'creative-media',
    title: 'Creative and Media',
    description: 'Creative media pages linking philosophy, sound, and expression.',
    href: '/creative',
    entries: createEntries('creative-media', creativeMediaTitles, '/creative'),
  },
];

export const first100Sections = sections;
export const first100Entries = sections.flatMap((section) => section.entries);

export function getFirst100Section(section: First100SectionKey): First100Section | undefined {
  return first100Sections.find((item) => item.key === section);
}

export function getFirst100Entry(section: First100SectionKey, slug: string): First100Entry | undefined {
  return first100Entries.find((item) => item.section === section && item.slug === slug);
}
