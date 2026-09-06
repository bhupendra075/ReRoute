import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('system')

  useEffect(() => {
    // Set initial theme based on system preference and apply to html
    const setSystemTheme = () => {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
      const html = document.documentElement
      if (theme === 'dark') {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
    }

    setSystemTheme()
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addEventListener('change', setSystemTheme)

    return () => {
      mq.removeEventListener('change', setSystemTheme)
    }
  }, [])

  // Apply theme class to html element whenever theme changes
  useEffect(() => {
    const html = document.documentElement
    if (theme === 'dark') {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }, [theme])

  const toggled = () => {
    setTheme(prev => {
      if (prev === 'system') return 'dark'
      if (prev === 'dark') return 'light'
      return 'system'
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggled }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}