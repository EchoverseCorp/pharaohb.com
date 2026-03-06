// Transmissions Data for PharaohB.com
// Last updated: 2026-02-05

export interface Transmission {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  href: string;
  duration: string;
  views?: number;
  category: 'frequency' | 'audiobook' | 'spoken-word' | 'teaching' | 'affirmation' | 'music';
  featured?: boolean;
}

export interface Short {
  id: string;
  title: string;
  thumbnail: string;
  href: string;
}

// ═══════════════════════════════════════════════════════════════
// LONG-FORM TRANSMISSIONS (16:9)
// ═══════════════════════════════════════════════════════════════

export const transmissions: Transmission[] = [
  // ───────────────────────────────────────────────────────────────
  // MUSIC (Original Songs)
  // ───────────────────────────────────────────────────────────────
  {
    id: 'EAU5cD0Sh_4',
    title: 'Galaxies in Your Gaze',
    description: 'Original music video accompanying the Spotify track. A visual and auditory journey through love and cosmic connection.',
    thumbnail: 'https://i.ytimg.com/vi/EAU5cD0Sh_4/maxresdefault.jpg',
    href: 'https://www.youtube.com/watch?v=EAU5cD0Sh_4',
    duration: '4:30',
    category: 'music',
    featured: true,
  },
  {
    id: 'EAU5cD0Sh_4',
    title: 'Galaxies in Your Gaze',
    description: 'Original music video accompanying the Spotify track. A visual and auditory journey through love and cosmic connection.',
    thumbnail: 'https://i.ytimg.com/vi/EAU5cD0Sh_4/maxresdefault.jpg',
    href: 'https://www.youtube.com/watch?v=EAU5cD0Sh_4',
    duration: '4:30',
    category: 'music',
  },
  {
    id: 'w8FbD3EMkiY',
    title: 'Holy Chance (Gospel Soul)',
    description: 'Every sunrise is a gift. A chance to breathe deeper, love louder, and live. Gospel soul for morning motivation.',
    thumbnail: 'https://i.ytimg.com/vi/w8FbD3EMkiY/maxresdefault.jpg',
    href: 'https://www.youtube.com/watch?v=w8FbD3EMkiY',
    duration: '5:00',
    category: 'music',
  },

  // ───────────────────────────────────────────────────────────────
  // FREQUENCIES (Healing tones, binaural beats)
  // ───────────────────────────────────────────────────────────────
  {
    id: 'Zrfoe0cz5FQ',
    title: 'Delta Waves — Deep Healing Sleep (Black Screen)',
    description: 'An 8-hour session of pure delta wave frequencies (0.5-4 Hz) to guide your nervous system into its most regenerative state. Release anxiety and negative energy.',
    thumbnail: 'https://i.ytimg.com/vi/Zrfoe0cz5FQ/maxresdefault.jpg',
    href: 'https://www.youtube.com/watch?v=Zrfoe0cz5FQ',
    duration: '8:00:00',
    category: 'frequency',
    featured: true,
  },
  {
    id: 'mcH4iDuTd6c',
    title: 'Alpha Frequency (111 min) — Clear the Mind',
    description: 'A single, uninterrupted 111-minute session designed to help your thoughts settle, organize, and release. Alpha-range (8–10 Hz) for relaxed alertness and mental clarity.',
    thumbnail: 'https://i.ytimg.com/vi/mcH4iDuTd6c/maxresdefault.jpg',
    href: 'https://www.youtube.com/watch?v=mcH4iDuTd6c',
    duration: '1:51:00',
    category: 'frequency',
    featured: true,
  },

  // ───────────────────────────────────────────────────────────────
  // AFFIRMATIONS ("I Am" declarations with frequencies)
  // ───────────────────────────────────────────────────────────────
  {
    id: 'UBGAjWD1WdI',
    title: 'Handpan Music — 11:11 Meditation',
    description: 'This handpan composition is paired with flowing water and living landscapes to create a space of stillness, alignment, and return. No words. No instruction. Just presence.',
    thumbnail: 'https://i.ytimg.com/vi/UBGAjWD1WdI/maxresdefault.jpg',
    href: 'https://www.youtube.com/watch?v=UBGAjWD1WdI',
    duration: '11:11:00',
    category: 'affirmation',
    featured: true,
  },
  {
    id: '0lTnOJfD33M',
    title: '"I Am" Learning Affirmations (5Hz)',
    description: 'Reprogram your mind to learn faster. These affirmations reopen your mind, reactivate your curiosity, and help you fall in love with learning again.',
    thumbnail: 'https://i.ytimg.com/vi/0lTnOJfD33M/maxresdefault.jpg',
    href: 'https://www.youtube.com/watch?v=0lTnOJfD33M',
    duration: '33:00',
    category: 'affirmation',
  },
  {
    id: 'XGq0-MGq2O0',
    title: 'Master Key Affirmations Part One (432 Hz)',
    description: 'All power is from within — and it is under your control. A 33-minute affirmation session based on Part One of The Master Key System for mental discipline and inner mastery.',
    thumbnail: 'https://i.ytimg.com/vi/XGq0-MGq2O0/maxresdefault.jpg',
    href: 'https://www.youtube.com/watch?v=XGq0-MGq2O0',
    duration: '33:00',
    category: 'affirmation',
    featured: true,
  },
  {
    id: 'sHwBFVEq33c',
    title: '111 Gratitude Affirmations (4Hz Theta)',
    description: 'A 54-minute session of 111 Gratitude Affirmations layered with 4Hz Theta frequency to gently rewire your subconscious mind for strength, peace, and emotional renewal.',
    thumbnail: 'https://i.ytimg.com/vi/sHwBFVEq33c/maxresdefault.jpg',
    href: 'https://www.youtube.com/watch?v=sHwBFVEq33c',
    duration: '54:00',
    category: 'affirmation',
  },
  {
    id: 'HE806qtLYNE',
    title: '"Do It Now" Affirmations — Stop Procrastinating',
    description: 'Break the cycle of procrastination. 33 minutes of affirmations designed to train your mind to choose action consistently, calmly, and confidently.',
    thumbnail: 'https://i.ytimg.com/vi/HE806qtLYNE/maxresdefault.jpg',
    href: 'https://www.youtube.com/watch?v=HE806qtLYNE',
    duration: '33:00',
    category: 'affirmation',
  },
  {
    id: 'npiLiP3pVBM',
    title: 'Morning Affirmations (432 Hz)',
    description: 'Start your day with clarity instead of chaos, direction instead of doubt, alignment instead of anxiety. Morning affirmations for mindset reset and emotional alignment.',
    thumbnail: 'https://i.ytimg.com/vi/npiLiP3pVBM/maxresdefault.jpg',
    href: 'https://www.youtube.com/watch?v=npiLiP3pVBM',
    duration: '15:00',
    category: 'affirmation',
  },
  {
    id: 'ZFjiDQ3fG6M',
    title: 'Build a Powerful Mind in 30 Days — Affirmations',
    description: 'Daily affirmation session to awaken your intelligence, sharpen your focus, and align your mind with clarity and purpose. For mental strength and wisdom.',
    thumbnail: 'https://i.ytimg.com/vi/ZFjiDQ3fG6M/maxresdefault.jpg',
    href: 'https://www.youtube.com/watch?v=ZFjiDQ3fG6M',
    duration: '5:00',
    category: 'affirmation',
  },
  {
    id: 'MXtf36KfeqM',
    title: 'Self-Discipline Affirmations',
    description: "What separates those who achieve from those who stay stuck? It's not motivation - it's self-discipline. Daily affirmations to rewire your mindset and strengthen habits.",
    thumbnail: 'https://i.ytimg.com/vi/MXtf36KfeqM/maxresdefault.jpg',
    href: 'https://www.youtube.com/watch?v=MXtf36KfeqM',
    duration: '40:00',
    category: 'affirmation',
  },

  // ───────────────────────────────────────────────────────────────
  // AUDIOBOOKS (Classic texts + Original books)
  // ───────────────────────────────────────────────────────────────
  {
    id: 'Nd_9Nuv39Zw',
    title: 'The Master Key System — Complete Audiobook',
    description: 'A careful, deliberate reading of The Master Key System by Charles F. Haanel, approached as it was originally intended: a discipline of understanding, not a collection of ideas.',
    thumbnail: 'https://i.ytimg.com/vi/Nd_9Nuv39Zw/maxresdefault.jpg',
    href: 'https://www.youtube.com/watch?v=Nd_9Nuv39Zw',
    duration: '5:21:16',
    category: 'audiobook',
    featured: true,
  },
  {
    id: 'I-xKF7PyoVM',
    title: 'You Are Not Your Addiction — Full Audiobook',
    description: 'A Healing Conversation by Pharaoh B. A safe, honest, cinematic journey into understanding addiction, shame, trauma, relapse, and the path back to yourself.',
    thumbnail: 'https://i.ytimg.com/vi/I-xKF7PyoVM/maxresdefault.jpg',
    href: 'https://www.youtube.com/watch?v=I-xKF7PyoVM',
    duration: '1:35:00',
    category: 'audiobook',
  },
  {
    id: 'ejbByodADwA',
    title: 'The Kybalion — Hidden Laws of the Universe',
    description: 'The 7 Hermetic Principles that reveal the blueprint of the universe and how YOU can unlock your full potential. Awakening the Light Within.',
    thumbnail: 'https://i.ytimg.com/vi/ejbByodADwA/maxresdefault.jpg',
    href: 'https://www.youtube.com/watch?v=ejbByodADwA',
    duration: '55:00',
    category: 'audiobook',
  },
  {
    id: 'msA-q_PwIz8',
    title: 'The Art of Not Thinking Yourself to Death — Part 1',
    description: "By Pharaoh B. Overthinking isn't just a habit - it's a place people get trapped. This is the moment you finally step outside the storm.",
    thumbnail: 'https://i.ytimg.com/vi/msA-q_PwIz8/maxresdefault.jpg',
    href: 'https://www.youtube.com/watch?v=msA-q_PwIz8',
    duration: '12:00',
    category: 'audiobook',
  },
  {
    id: 'HOfjZTY0Q4s',
    title: 'The Light Within — Full Audiobook',
    description: "By Pharaoh B. Your personal guide to awakening, transformation, and living a life filled with purpose, clarity, and peace. Discover the power that's been waiting for you.",
    thumbnail: 'https://i.ytimg.com/vi/HOfjZTY0Q4s/maxresdefault.jpg',
    href: 'https://www.youtube.com/watch?v=HOfjZTY0Q4s',
    duration: '45:00',
    category: 'audiobook',
  },

  // ───────────────────────────────────────────────────────────────
  // TEACHINGS (Educational, how-to)
  // ───────────────────────────────────────────────────────────────
  {
    id: '6-yEttH5hiA',
    title: 'The Death of the Perfect Moment',
    description: 'Are you waiting for the perfect moment to start your life? Learn how to break free from procrastination and start living the fulfilling life you truly deserve.',
    thumbnail: 'https://i.ytimg.com/vi/6-yEttH5hiA/maxresdefault.jpg',
    href: 'https://www.youtube.com/watch?v=6-yEttH5hiA',
    duration: '15:00',
    category: 'teaching',
  },
  {
    id: '4wBd6HZzYzg',
    title: 'Your Mind Is Lying To You — Part 3',
    description: 'The Art of Not Thinking Yourself to Death — The moment you return to yourself. Learn to separate you from your thoughts with a 7-day practice.',
    thumbnail: 'https://i.ytimg.com/vi/4wBd6HZzYzg/maxresdefault.jpg',
    href: 'https://www.youtube.com/watch?v=4wBd6HZzYzg',
    duration: '12:00',
    category: 'teaching',
  },
  {
    id: 'R_90k9LPywQ',
    title: 'How to Stop Thinking Everything to Death',
    description: "The skill that saves your life. Stop spiraling, stop creating problems that aren't there, stop replaying conversations, and return to yourself with clarity.",
    thumbnail: 'https://i.ytimg.com/vi/R_90k9LPywQ/maxresdefault.jpg',
    href: 'https://www.youtube.com/watch?v=R_90k9LPywQ',
    duration: '10:00',
    category: 'teaching',
  },

  // ───────────────────────────────────────────────────────────────
  // SPOKEN WORD (Poems, messages)
  // ───────────────────────────────────────────────────────────────
  {
    id: '-ySQ19J3ewo',
    title: 'A Vision for Humanity',
    description: 'Imagine a world where love, kindness, and integrity are the very foundation of every action. This transformation starts with small, conscious acts.',
    thumbnail: 'https://i.ytimg.com/vi/-ySQ19J3ewo/maxresdefault.jpg',
    href: 'https://www.youtube.com/watch?v=-ySQ19J3ewo',
    duration: '8:00',
    category: 'spoken-word',
    featured: true,
  },
  {
    id: 'vff0ny5Dfxs',
    title: 'This Is For You — A Poem for Women',
    description: 'Woman, listen—let these words sink in. You are more than enough, and you always have been. A reminder for every woman who has ever felt invisible.',
    thumbnail: 'https://i.ytimg.com/vi/vff0ny5Dfxs/maxresdefault.jpg',
    href: 'https://www.youtube.com/watch?v=vff0ny5Dfxs',
    duration: '6:00',
    category: 'spoken-word',
  },
  {
    id: '8qCJMoRaAbg',
    title: 'The Truth About Happiness',
    description: 'A journey to unity and fulfillment. We explore the universal pursuit of happiness and the obstacles we face when we cling to rigid beliefs that divide us.',
    thumbnail: 'https://i.ytimg.com/vi/8qCJMoRaAbg/maxresdefault.jpg',
    href: 'https://www.youtube.com/watch?v=8qCJMoRaAbg',
    duration: '7:00',
    category: 'spoken-word',
  },
  {
    id: '-KVdYmfVoRg',
    title: 'This Will Change How You See Humanity',
    description: 'Humanity is in crisis, but what if the solution is simpler than we think? A message meant to wake you up. The power to change starts with you.',
    thumbnail: 'https://i.ytimg.com/vi/-KVdYmfVoRg/maxresdefault.jpg',
    href: 'https://www.youtube.com/watch?v=-KVdYmfVoRg',
    duration: '10:00',
    category: 'spoken-word',
  },
  {
    id: 'm7BdjZ4vHBs',
    title: 'The Awakening — A Poem',
    description: 'Rise, oh humanity, from the depths of despair. A call to awaken to true potential and take responsibility for healing the world.',
    thumbnail: 'https://i.ytimg.com/vi/m7BdjZ4vHBs/maxresdefault.jpg',
    href: 'https://www.youtube.com/watch?v=m7BdjZ4vHBs',
    duration: '8:00',
    category: 'spoken-word',
  },
  {
    id: 'CZC6VNTc1sY',
    title: 'The Forgotten Connection — A Poem',
    description: 'We were born to be together—to love, to share, to weather whatever storms may come. A poem about love, unity, and rebuilding our bonds.',
    thumbnail: 'https://i.ytimg.com/vi/CZC6VNTc1sY/maxresdefault.jpg',
    href: 'https://www.youtube.com/watch?v=CZC6VNTc1sY',
    duration: '9:00',
    category: 'spoken-word',
  },
];

// ═══════════════════════════════════════════════════════════════
// SHORTS (9:16 vertical, < 60 seconds)
// ═══════════════════════════════════════════════════════════════

export const shorts: Short[] = [
  // ADD YOUR SHORTS HERE
  // Format:
  // {
  //   id: 'SHORT_ID',
  //   title: 'Short Title',
  //   thumbnail: 'https://i.ytimg.com/vi/SHORT_ID/maxresdefault.jpg',
  //   href: 'https://www.youtube.com/shorts/SHORT_ID',
  // },
];

// ═══════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════

export const getTransmissionsByCategory = (category: string): Transmission[] => {
  if (category === 'all') return transmissions;
  return transmissions.filter((t) => t.category === category);
};

export const getFeaturedTransmissions = (): Transmission[] => {
  return transmissions.filter((t) => t.featured);
};

// ═══════════════════════════════════════════════════════════════
// PAGE CONTENT
// ═══════════════════════════════════════════════════════════════

export const transmissionsPageContent = {
  title: 'Transmissions',
  subtitle: 'Audio & Video',
  description: 'Healing frequencies, affirmations, spoken word, and teachings for the soul.',
  symbol: '𓂀',
};

// ═══════════════════════════════════════════════════════════════
// CATEGORIES
// ═══════════════════════════════════════════════════════════════

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'frequency', label: 'Frequencies' },
  { id: 'affirmation', label: 'Affirmations' },
  { id: 'audiobook', label: 'Audiobooks' },
  { id: 'teaching', label: 'Teachings' },
  { id: 'spoken-word', label: 'Spoken Word' },
  { id: 'music', label: 'Music' },
] as const;

export type CategoryId = typeof categories[number]['id'];
