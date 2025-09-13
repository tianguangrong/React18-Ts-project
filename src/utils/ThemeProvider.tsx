
import React, { useCallback, useMemo, useState } from 'react'
import { createContext, useContext } from 'react';

type ThemesType = 'dark' | 'light';
interface CreateContextType<T>  {
  theme: T,
  toggleTheme?: () => void
}
const ThemeContext = createContext<CreateContextType<ThemesType> | undefined>(undefined);
interface propsType {
    children: React.ReactNode
}
// const ThemeContext = createContext<any>(undefined);
export const ThemeProvider: React.FC<propsType>= React.memo(({ children } : propsType) => {
  const [ theme, setTheme ] = useState<ThemesType>('dark');
  const memoTheme = useMemo(() => {
    return theme
  }, [theme])
  const toggleTheme = useCallback(() => {
    setTheme((preTheme) => preTheme === 'dark' ? 'light' : 'dark')
  }, [])
  const memoValue = {
    theme: memoTheme, 
    toggleTheme
  }
  return (
    <ThemeContext.Provider value={memoValue}>
      { children }
    </ThemeContext.Provider>
  )
})
export const UseTheme = () => {
    const context= useContext(ThemeContext);
    if (!context) {
        throw new Error('需要在ThemeProvider内使用')
    }
    return context
    
}

