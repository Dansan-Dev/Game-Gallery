import { Link } from '@tanstack/react-router'

export default function Header() {
  const personalSiteUrl = import.meta.env.VITE_PERSONAL_SITE_URL || '#'

  return (
    <header className="p-4 flex items-center justify-between bg-slate-800 text-white shadow-lg border-b border-slate-700">
      <h1 className="text-xl font-semibold">
        <Link to="/" className="hover:text-cyan-400 transition-colors">
          Game Gallery
        </Link>
      </h1>
      <a
        href={personalSiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
      >
        Daniel Sandström
      </a>
    </header>
  )
}
