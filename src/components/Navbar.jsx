import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMoon, FiSun, FiDroplet, FiMenu, FiX } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import SearchBar from './SearchBar';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { mode, toggleMode, preset, setPreset, presets } = useTheme();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <nav className="container-px mx-auto max-w-7xl flex items-center justify-between py-4">
        <NavLink to="/" className="font-display text-lg font-bold tracking-tight" data-cursor-hover>
          shahadat<span className="accent-text">.</span>dev
        </NavLink>

        <div className="hidden md:flex items-center gap-1 rounded-full px-2 py-1.5 surface backdrop-blur">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-cursor-hover
              className={({ isActive }) =>
                `px-4 py-1.5 rounded-full text-sm transition-colors ${isActive ? 'accent-bg text-white' : 'hover:bg-white/5'}`
              }
              style={({ isActive }) => (isActive ? {} : { color: 'var(--text-muted)' })}
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block"><SearchBar compact /></div>

          <div className="relative">
            <button
              onClick={() => setPaletteOpen((o) => !o)}
              data-cursor-hover
              aria-label="Change accent color"
              className="w-10 h-10 rounded-full flex items-center justify-center surface"
            >
              <FiDroplet style={{ color: 'var(--accent)' }} />
            </button>
            <AnimatePresence>
              {paletteOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute right-0 mt-3 p-3 rounded-2xl surface flex gap-2"
                >
                  {presets.map((p) => (
                    <button
                      key={p.name}
                      title={p.name}
                      data-cursor-hover
                      onClick={() => { setPreset(p); setPaletteOpen(false); }}
                      className="w-7 h-7 rounded-full border-2"
                      style={{
                        background: `linear-gradient(135deg, ${p.accent}, ${p.accent2})`,
                        borderColor: preset.name === p.name ? 'var(--text)' : 'transparent',
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={toggleMode}
            data-cursor-hover
            aria-label="Toggle dark mode"
            className="w-10 h-10 rounded-full flex items-center justify-center surface"
          >
            {mode === 'dark' ? <FiSun /> : <FiMoon />}
          </button>

          <button
            onClick={() => setMobileOpen(true)}
            data-cursor-hover
            aria-label="Open menu"
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center surface"
          >
            <FiMenu />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] md:hidden"
            style={{ background: 'var(--bg)' }}
          >
            <div className="flex justify-end container-px py-4">
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="w-10 h-10 rounded-full flex items-center justify-center surface">
                <FiX />
              </button>
            </div>
            <div className="flex flex-col items-center gap-6 mt-12">
              {links.map((l) => (
                <NavLink key={l.to} to={l.to} onClick={() => setMobileOpen(false)} className="font-display text-3xl">
                  {l.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
