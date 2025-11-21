import type { Game } from '../types/game'

// Game data - in the future this could come from an API
const gamesData: Game[] = [
  {
    name: 'Elderpath Crusade',
    slug: 'elderpath-crusade',
    status: 'in-progress',
    downloadType: '',
  },
]

// Simulate async data fetching (for future API integration)
export async function fetchGames(): Promise<Game[]> {
  // In the future, this could be: return fetch('/api/games').then(r => r.json());
  return Promise.resolve(gamesData)
}

export async function fetchGame(slug: string): Promise<Game | null> {
  // In the future, this could be: return fetch(`/api/games/${slug}`).then(r => r.json());
  const game = gamesData.find((g) => g.slug === slug)
  return Promise.resolve(game || null)
}

