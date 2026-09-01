import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { useTheme } from '@/context/ThemeContext'

export default function Header() {
  const { theme, toggled } = useTheme()

  return (
    <header
      className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm dark:bg-gray-900"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden="true">🚑</span>
          <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
            reroute
          </span>
        </Link>
        <nav
          className="hidden md:flex items-center gap-6"
          aria-label="Main navigation"
        >
          <Link
            to="/"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 hover:dark:text-gray-200"
          >
            Dashboard
          </Link>
          <Link
            to="/emergency/trigger"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 hover:dark:text-gray-200"
          >
            Emergency
          </Link>
          <Link
            to="/er/command-center"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 hover:dark:text-gray-200"
          >
            ER Center
          </Link>
          <Link
            to="/settings"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 hover:dark:text-gray-200"
          >
            Settings
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggled}
            className="p-2 rounded-lg transition-colors"
            aria-label="Toggle theme"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                className="stroke-2"
                d="M20.354 15.354A9 9 0 018.346 2.345a1.125 1.125 0 101.758 1.75l4.19 4.19a3 3 0 001.308 1.065l-1.66 1.66a9 9 0 015.604-3.088l1.5 1.5z"
              />
            </svg>
            {theme === 'dark' ? (
              <path
                className="hidden h-4 w-4 stroke-2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15 3h-1M5.343 5.343l4.243 4.243M5.343 18.657l4.243-4.243M1 8l1.267 1.267m7.933 4.234l1.267-1.267m4.234 5.933l-1.267 1.267m11.938-11.938l-1.267-1.267M21 12a6 6 0 01-6 6l-1.117-1.117m1.117 5.234l1.117-1.117m5.933 5.933l1.117 1.117m-5.933-5.933l-1.117 1.117M2 2l1.117 1.117m5.933 5.933l1.117 1.117m1.117 5.234l1.117-1.117M8 21l-1.117-1.117m5.933-5.933l-1.117 1.117M22 2l-1.117 1.117m-5.933-5.933l-1.117-1.117"
              />
            ) : (
              <path
                className="hidden h-4 w-4 stroke-2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15 3h-1M5.343 5.343l4.243 4.243M5.343 18.657l4.243-4.243M1 8l1.267 1.267m7.933 4.234l1.267-1.267m4.234 5.933l-1.267 1.267m11.938-11.938l-1.267-1.267M21 12a6 6 0 01-6 6l-1.117-1.117m1.117 5.234l1.117-1.117m5.933 5.933l1.117 1.117m-5.933-5.933l-1.117 1.117M2 2l1.117 1.117m5.933 5.933l1.117 1.117m1.117 5.234l1.117-1.117M8 21l-1.117-1.117m5.933-5.933l-1.117 1.117M22 2l-1.117 1.117m-5.933-5.933l-1.117-1.117"
              />
            )}
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/auth/login">Sign In</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}