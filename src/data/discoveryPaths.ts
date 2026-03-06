export type NeedPathKey =
  | 'think-clearly'
  | 'build-discipline'
  | 'find-direction'
  | 'creative-expression'
  | 'books-and-tools';

export interface NeedPath {
  key: NeedPathKey;
  label: string;
  description: string;
  href: string;
  keywords: string[];
}

export const needPaths: NeedPath[] = [
  {
    key: 'think-clearly',
    label: 'Think Clearly',
    description: 'Overthinking, anxiety loops, and decision clarity.',
    href: '/think-clearly',
    keywords: ['overthink', 'clarity', 'mind', 'focus', 'anxiety', 'thought', 'mental'],
  },
  {
    key: 'build-discipline',
    label: 'Build Discipline',
    description: 'Consistency, execution, habits, and follow-through.',
    href: '/build-discipline',
    keywords: ['discipline', 'habit', 'procrast', 'execute', 'consistency', 'action'],
  },
  {
    key: 'find-direction',
    label: 'Find Direction',
    description: 'Purpose, alignment, priorities, and next steps.',
    href: '/find-direction',
    keywords: ['direction', 'purpose', 'meaning', 'path', 'vision', 'alignment'],
  },
  {
    key: 'creative-expression',
    label: 'Creative Expression',
    description: 'Poetry, art, writing, music, and creative process.',
    href: '/creative-expression',
    keywords: ['creative', 'poem', 'art', 'music', 'expression', 'writing', 'story'],
  },
  {
    key: 'books-and-tools',
    label: 'Books and Tools',
    description: 'Books, references, frameworks, and practical tools.',
    href: '/books-and-tools',
    keywords: ['book', 'tool', 'framework', 'resource', 'guide', 'system', 'library'],
  },
];

export function inferNeedPathFromText(text: string): NeedPath {
  const hay = text.toLowerCase();
  let best = needPaths[0];
  let bestScore = -1;

  for (const path of needPaths) {
    const score = path.keywords.reduce((sum, keyword) => (hay.includes(keyword) ? sum + 1 : sum), 0);
    if (score > bestScore) {
      best = path;
      bestScore = score;
    }
  }

  if (bestScore <= 0) {
    return needPaths.find((p) => p.key === 'books-and-tools') || needPaths[0];
  }
  return best;
}

