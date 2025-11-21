export type GameStatus = 'in-progress' | 'released'

export interface Game {
  name: string
  slug: string
  status: GameStatus
  downloadType: string
}

