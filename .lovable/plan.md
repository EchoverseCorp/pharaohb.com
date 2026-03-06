

# Plan: Reorganize Audio/Video Content with Correct Categories

## Overview

This plan will fix the incorrectly categorized content and add new category types to properly separate your different content types: Music, Frequencies, Affirmations, Audiobooks, Teachings, and Spoken Word.

---

## New Category Structure

```text
Current Categories:        New Categories:
-------------------        ---------------
frequency                  frequency (healing frequencies)
audiobook                  audiobook (classic texts + original books)
spoken-word                spoken-word (poems, messages)
teaching                   teaching (educational content)
                          affirmation (NEW - "I Am" affirmations)
                          music (NEW - original songs, handpan)
```

---

## Step 1: Update Category Interface

Modify `src/data/transmissions.ts` to add new category types:

```typescript
category: 'frequency' | 'audiobook' | 'spoken-word' | 'teaching' | 'affirmation' | 'music';
```

Update the categories array:
```typescript
export const categories = [
  { id: 'all', label: 'All' },
  { id: 'frequency', label: 'Frequencies' },
  { id: 'affirmation', label: 'Affirmations' },
  { id: 'audiobook', label: 'Audiobooks' },
  { id: 'teaching', label: 'Teachings' },
  { id: 'spoken-word', label: 'Spoken Word' },
  { id: 'music', label: 'Music' },
] as const;
```

---

## Step 2: Recategorize All Videos

Based on your MUSIC.md file, here is the correct categorization:

### MUSIC (Handpan, Original Songs)
| ID | Title |
|----|-------|
| `UBGAjWD1WdI` | Handpan Music - 11:11 Meditation |
| `EAU5cD0Sh_4` | Galaxies in Your Gaze |
| `w8FbD3EMkiY` | Holy Chance (Gospel Soul) |

### FREQUENCIES (Healing tones, binaural beats)
| ID | Title |
|----|-------|
| `Zrfoe0cz5FQ` | Delta Waves - Deep Healing Sleep (Black Screen) |
| `mcH4iDuTd6c` | Alpha Frequency (111 min) - Clear the Mind |

### AFFIRMATIONS ("I Am" declarations with frequencies)
| ID | Title |
|----|-------|
| `0lTnOJfD33M` | "I Am" Learning Affirmations (5Hz) |
| `XGq0-MGq2O0` | Master Key Affirmations Part One (432 Hz) |
| `sHwBFVEq33c` | 111 Gratitude Affirmations (4Hz Theta) |
| `HE806qtLYNE` | "Do It Now" Affirmations |
| `npiLiP3pVBM` | Morning Affirmations (432 Hz) |
| `ZFjiDQ3fG6M` | Powerful Mind in 30 Days Affirmations |
| `MXtf36KfeqM` | Self-Discipline Affirmations |

### AUDIOBOOKS (Classic texts + Original books)
| ID | Title |
|----|-------|
| `Nd_9Nuv39Zw` | The Master Key System (Full) |
| `I-xKF7PyoVM` | You Are Not Your Addiction (by Pharaoh B) |
| `ejbByodADwA` | The Kybalion - Hidden Laws of the Universe |
| `msA-q_PwIz8` | Art of Not Thinking Yourself to Death - Part 1 |
| `HOfjZTY0Q4s` | The Light Within (by Pharaoh B) |

### TEACHINGS (Educational, how-to)
| ID | Title |
|----|-------|
| `6-yEttH5hiA` | The Death of the Perfect Moment |
| `4wBd6HZzYzg` | Your Mind Is Lying To You (Part 3) |
| `R_90k9LPywQ` | How to Stop Thinking Everything to Death |

### SPOKEN WORD (Poems, messages)
| ID | Title |
|----|-------|
| `-ySQ19J3ewo` | A Vision for Humanity |
| `vff0ny5Dfxs` | This Is For You (Poem for Women) |
| `8qCJMoRaAbg` | The Truth About Happiness |
| `-KVdYmfVoRg` | This Will Change How You See Humanity |
| `m7BdjZ4vHBs` | The Awakening (Poem) |
| `CZC6VNTc1sY` | The Forgotten Connection (Poem) |

---

## Step 3: Add Real Titles and Descriptions

Each video will be updated with the actual title and description from your MUSIC.md file, including:

- Accurate titles (not generic placeholders)
- Real descriptions from your YouTube content
- Correct durations where provided
- Proper SEO keywords from your hashtags

---

## Step 4: Remove Incorrect Placeholder Content

Remove videos that were added with incorrect placeholder data:
- Videos listed as "Solfeggio frequencies" that are actually affirmations or teachings
- Audiobooks listed that don't match your actual content

---

## Files to be Modified

1. **`src/data/transmissions.ts`**
   - Add `affirmation` and `music` to category type
   - Update categories array
   - Replace all transmission entries with correctly categorized content
   - Add real titles, descriptions, and durations

---

## Result After Implementation

- **Music Page**: Shows your 5 Spotify albums with embedded players
- **Transmissions Page**: 
  - 6 filter tabs: All, Frequencies, Affirmations, Audiobooks, Teachings, Spoken Word, Music
  - Each video properly categorized
  - Real titles and descriptions from your YouTube content
  - SEO-friendly metadata

