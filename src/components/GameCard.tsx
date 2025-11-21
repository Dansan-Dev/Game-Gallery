import { Link } from '@tanstack/react-router'
import type { Game } from '../types/game'

interface GameCardProps {
  game: Game
}

export function GameCard({ game }: GameCardProps) {
  const statusClass =
    game.status === 'in-progress'
      ? 'bg-gray-500'
      : 'bg-green-600'
  const statusText =
    game.status === 'in-progress' ? 'in progress' : 'released'

  return (
    <Link
      to="/games/$slug"
      params={{ slug: game.slug }}
      className="block bg-slate-800/50 border border-slate-700 rounded-xl p-4 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1"
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-white">{game.name}</h3>
        <span
          className={`${statusClass} text-white text-xs font-medium rounded-full px-3 py-1`}
        >
          {statusText}
        </span>
      </div>
    </Link>
  )
}

