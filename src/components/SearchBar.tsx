import { useState } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('')

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim().toLowerCase()
    setQuery(value)
    onSearch(value)
  }

  return (
    <div className="mt-4">
      <input
        id="search"
        className="w-full md:w-96 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        type="search"
        placeholder="Search games…"
        aria-label="Search games"
        value={query}
        onChange={handleInput}
      />
    </div>
  )
}

