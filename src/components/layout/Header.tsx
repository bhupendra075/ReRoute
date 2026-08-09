import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden="true">🚑</span>
          <span className="text-xl font-bold text-gray-900">reroute</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          <Link to="/" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Dashboard
          </Link>
          <Link to="/emergency/trigger" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Emergency
          </Link>
          <Link to="/er/command-center" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            ER Center
          </Link>
          <Link to="/settings" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Settings
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/auth/login">Sign In</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
