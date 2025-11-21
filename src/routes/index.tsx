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
    <div className="h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex flex-col overflow-hidden">
      <section className="flex-shrink-0 py-12 px-6">
        <div className="max-w-7xl mx-[20px]">
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

      <section className="flex-1 overflow-y-auto px-6 pb-12 pt-[6px] max-w-7xl ml-[20px]">
        <h2 id="gallery-heading" className="sr-only">
          Game List
        </h2>
        <GameGallery games={games} searchQuery={searchQuery} />
      </section>
    </div>
  )
}
