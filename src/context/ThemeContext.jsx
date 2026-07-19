import { createContext, useContext, useEffect, useState } from 'react';

// Accent presets — admin panel "color grading" options will map to this same list later.
export const ACCENT_PRESETS = [
  { name: 'Violet', accent: '#7c6fff', accent2: '#3ddad7' },
  { name: 'Coral', accent: '#ff6b6b', accent2: '#ffd166' },
  { name: 'Emerald', accent: '#22c55e', accent2: '#84cc16' },
  { name: 'Amber', accent: '#f59e0b', accent2: '#ef4444' },
  { name: 'Rose', accent: '#ec4899', accent2: '#8b5cf6' },
  { name: 'Cyan', accent: '#06b6d4', accent2: '#7c6fff' },
];

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState('dark');
  const [preset, setPreset] = useState(ACCENT_PRESETS[0]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', preset.accent);
    document.documentElement.style.setProperty('--accent-2', preset.accent2);
  }, [preset]);

  const toggleMode = () => setMode((m) => (m === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ mode, toggleMode, preset, setPreset, presets: ACCENT_PRESETS }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
