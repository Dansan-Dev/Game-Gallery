import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="p-4 flex items-center bg-slate-800 text-white shadow-lg border-b border-slate-700">
      <h1 className="text-xl font-semibold">
        <Link to="/" className="hover:text-cyan-400 transition-colors">
          Game Gallery
        </Link>
      </h1>
    </header>
  )
}
