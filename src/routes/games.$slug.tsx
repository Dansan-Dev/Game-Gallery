import { createFileRoute, Link } from '@tanstack/react-router'
import { fetchGame } from '../lib/games'
import { DownloadButtons } from '../components/DownloadButtons'

export const Route = createFileRoute('/games/$slug')({
  component: GameDetail,
  loader: async ({ params }) => {
    const game = await fetchGame(params.slug)
    if (!game) {
      throw new Error('Game not found')
    }
    return { game }
  },
  errorComponent: () => (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Game Not Found</h1>
        <p className="text-gray-400 mb-6">
          The game you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors inline-block"
        >
          ← Back to gallery
        </Link>
      </div>
    </div>
  ),
})

function GameDetail() {
  const { game } = Route.useLoaderData()
  const statusClass =
    game.status === 'in-progress' ? 'bg-gray-500' : 'bg-green-600'
  const statusText =
    game.status === 'in-progress' ? 'in progress' : 'released'

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {game.name}
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          <span
            className={`${statusClass} text-white text-sm font-medium rounded-full px-3 py-1 mr-2`}
          >
            {statusText}
          </span>
          {game.status === 'in-progress' &&
            'This project is currently in development.'}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">About</h2>
          <p className="text-gray-300 leading-relaxed">
            Embark on a tactical journey through ancient paths and crusades.
            This page will be updated with story, screenshots, and videos as
            development progresses.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Download / Play
          </h2>
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <p className="text-gray-300 mb-4">
              Choose your platform to download the game zip. Inside the archive,
              run the appropriate executable:
            </p>
            <ul className="text-gray-300 mb-6 list-disc list-inside space-y-2">
              <li>Windows: winX64/roast/ForestOfDreams.exe</li>
              <li>Linux: linuxX64/roast/ForestOfDreams</li>
            </ul>
            <DownloadButtons gameSlug={game.slug} />
          </div>
        </section>

        <Link
          to="/"
          className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors inline-block"
        >
          ← Back to gallery
        </Link>
      </div>
    </div>
  )
}

