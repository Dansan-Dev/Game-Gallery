import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { fetchGames } from '../lib/games'
import { SearchBar } from '../components/SearchBar'
import { GameGallery } from '../components/GameGallery'

export const Route = createFileRoute('/')({
  component: Index,
  loader: async () => {
    return {
      games: await fetchGames(),
    }
  },
})

function Index() {
  const { games } = Route.useLoaderData()
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <section className="relative py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Browse Games
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            A collection of my indie projects. Click a game to view details and
            download instructions.
          </p>
          <SearchBar onSearch={setSearchQuery} />
        </div>
      </section>

      <section className="px-6 pb-12 max-w-7xl mx-auto">
        <h2 id="gallery-heading" className="sr-only">
          Game List
        </h2>
        <GameGallery games={games} searchQuery={searchQuery} />
      </section>
    </div>
  )
}
