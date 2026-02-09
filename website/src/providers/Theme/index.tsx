'use client'

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  createContext,
  useContext,
  type ReactNode,
} from 'react'

export type ThemeMode = 'light' | 'dark' | 'system'

export interface ThemeContextValue {
  mode: ThemeMode
  resolvedTheme: 'light' | 'dark'
  setMode: (mode: ThemeMode) => void
  toggleTheme: () => void
  systemPrefersDark: boolean
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: 'system',
  resolvedTheme: 'light',
  setMode: () => {},
  toggleTheme: () => {},
  systemPrefersDark: false,
})

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext)
}

const STORAGE_KEY = 'nh-theme-mode'

function getSystemPreference(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function getInitialMode(defaultMode: ThemeMode): ThemeMode {
  if (typeof window === 'undefined') return defaultMode
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored
    }
  } catch {
    // localStorage not available
  }
  return defaultMode
}

interface ThemeProviderProps {
  children: ReactNode
  defaultMode?: ThemeMode
}

export function ThemeProvider({ children, defaultMode = 'system' }: ThemeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(() => getInitialMode(defaultMode))
  const [systemPrefersDark, setSystemPrefersDark] = useState(getSystemPreference)

  const resolvedTheme = useMemo((): 'light' | 'dark' => {
    if (mode === 'system') {
      return systemPrefersDark ? 'dark' : 'light'
    }
    return mode
  }, [mode, systemPrefersDark])

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode)
    try {
      localStorage.setItem(STORAGE_KEY, newMode)
    } catch {
      // localStorage not available
    }
  }, [])

  const toggleTheme = useCallback(() => {
    const next = mode === 'light' ? 'dark' : mode === 'dark' ? 'system' : 'light'
    setMode(next)
  }, [mode, setMode])

  // Listen for system preference changes
  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPrefersDark(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Update document attributes for CSS targeting
  useEffect(() => {
    if (typeof document === 'undefined') return

    const root = document.documentElement
    root.setAttribute('data-theme', resolvedTheme)
    root.style.colorScheme = resolvedTheme
  }, [resolvedTheme])

  const contextValue = useMemo<ThemeContextValue>(
    () => ({
      mode,
      resolvedTheme,
      setMode,
      toggleTheme,
      systemPrefersDark,
    }),
    [mode, resolvedTheme, setMode, toggleTheme, systemPrefersDark],
  )

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
}
