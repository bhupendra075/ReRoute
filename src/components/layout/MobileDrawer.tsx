import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function MobileDrawer() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        className="md:hidden fixed bottom-4 right-4 z-40 h-14 w-14 rounded-full bg-red-600 text-white shadow-lg flex items-center justify-center text-2xl"
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
      >
        ☰
      </button>
      {open && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setOpen(false)}>
          <nav
            className="absolute right-0 top-0 h-full w-72 bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
            aria-label="Mobile navigation"
          >
            <button
              onClick={() => setOpen(false)}
              className="mb-4 text-gray-400 hover:text-gray-600"
              aria-label="Close menu"
            >
              ✕
            </button>
            <ul className="space-y-4">
              <li><Link to="/" onClick={() => setOpen(false)} className="block text-sm font-medium text-gray-700">Dashboard</Link></li>
              <li><Link to="/emergency/trigger" onClick={() => setOpen(false)} className="block text-sm font-medium text-gray-700">Emergency Trigger</Link></li>
              <li><Link to="/emergency/passport" onClick={() => setOpen(false)} className="block text-sm font-medium text-gray-700">QR Passport</Link></li>
              <li><Link to="/er/command-center" onClick={() => setOpen(false)} className="block text-sm font-medium text-gray-700">ER Command Center</Link></li>
              <li><Link to="/settings" onClick={() => setOpen(false)} className="block text-sm font-medium text-gray-700">Settings</Link></li>
            </ul>
          </nav>
        </div>
      )}
    </>
  )
}
