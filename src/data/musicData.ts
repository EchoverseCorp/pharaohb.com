// Music Data for PharaohB.com
// Last updated: 2026-02-05

export interface Track {
  id: string;
  title: string;
  description?: string;
  duration: string;
  coverImage?: string;
  youtubeUrl?: string;
  spotifyUrl?: string;
  category: 'frequency' | 'ambient' | 'meditation' | 'original';
}

// ═══════════════════════════════════════════════════════════════
// TRACKS
// ═══════════════════════════════════════════════════════════════

export const tracks: Track[] = [
  // ADD YOUR TRACKS HERE
  // Example:
  // {
  //   id: 'galaxies-in-your-gaze',
  //   title: 'Galaxies in Your Gaze',
  //   description: 'Original composition exploring cosmic consciousness',
  //   duration: '5:30',
  //   category: 'original',
  //   youtubeUrl: 'https://youtube.com/...',
  //   spotifyUrl: 'https://open.spotify.com/...',
  // },
];

// ═══════════════════════════════════════════════════════════════
// PAGE CONTENT
// ═══════════════════════════════════════════════════════════════

export const musicPageContent = {
  title: 'Music',
  subtitle: 'Sound & Frequency',
  description: 'Original compositions, frequency music, and sonic meditations.',
  symbol: '𓂀',
};

// ═══════════════════════════════════════════════════════════════
// STREAMING PLATFORMS
// ═══════════════════════════════════════════════════════════════

export const streamingPlatforms = [
  {
    id: 'youtube',
    name: 'YouTube',
    url: 'https://youtube.com/@PharaohB-1111',
  },
  {
    id: 'spotify',
    name: 'Spotify',
    url: '#', // Add Spotify link
  },
];

// ═══════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════

export const getTracksByCategory = (category: Track['category']): Track[] => {
  return tracks.filter(track => track.category === category);
};

export const getTrackById = (id: string): Track | undefined => {
  return tracks.find(track => track.id === id);
};
