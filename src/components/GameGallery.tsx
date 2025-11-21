import { useMemo } from 'react'
import { GameCard } from './GameCard'
import type { Game } from '../types/game'

interface GameGalleryProps {
  games: Game[]
  searchQuery: string
}

export function GameGallery({ games, searchQuery }: GameGalleryProps) {
  const filteredGames = useMemo(() => {
    if (!searchQuery) return games
    return games.filter((game) =>
      game.name.toLowerCase().includes(searchQuery),
    )
  }, [games, searchQuery])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredGames.map((game) => (
        <GameCard key={game.slug} game={game} />
      ))}
    </div>
  )
}

