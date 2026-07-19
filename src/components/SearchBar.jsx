import { useMemo, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';
import { projects, blogs } from '../data/mockData';

export default function SearchBar({ compact = false }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const results = useMemo(() => {
    if (!q.trim()) return { projects: [], blogs: [] };
    const term = q.toLowerCase();
    return {
      projects: projects.filter((p) => p.title.toLowerCase().includes(term) || p.category.toLowerCase().includes(term)).slice(0, 4),
      blogs: blogs.filter((b) => b.title.toLowerCase().includes(term) || b.category.toLowerCase().includes(term)).slice(0, 4),
    };
  }, [q]);

  const hasResults = results.projects.length > 0 || results.blogs.length > 0;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        data-cursor-hover
        aria-label="Search"
        className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${compact ? '' : ''}`}
        style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
      >
        <FiSearch />
        {!compact && <span>Search</span>}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 mt-3 w-[90vw] max-w-sm rounded-2xl p-3 shadow-2xl surface z-50"
          >
            <div className="flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: 'var(--surface-2)' }}>
              <FiSearch style={{ color: 'var(--text-muted)' }} />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search projects & blogs..."
                className="w-full bg-transparent outline-none text-sm"
              />
              {q && (
                <button onClick={() => setQ('')} aria-label="Clear search">
                  <FiX style={{ color: 'var(--text-muted)' }} />
                </button>
              )}
            </div>

            {q.trim() && (
              <div className="mt-2 max-h-80 overflow-y-auto">
                {!hasResults && (
                  <p className="text-sm px-2 py-4" style={{ color: 'var(--text-muted)' }}>No results for “{q}”.</p>
                )}

                {results.projects.length > 0 && (
                  <div className="mb-2">
                    <p className="px-2 text-xs font-mono uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Projects</p>
                    {results.projects.map((p) => (
                      <Link key={p.id} to={`/projects/${p.slug}`} onClick={() => setOpen(false)} className="block px-2 py-2 rounded-lg hover:bg-white/5 text-sm">
                        {p.title} <span className="text-xs" style={{ color: 'var(--text-muted)' }}>· {p.category}</span>
                      </Link>
                    ))}
                  </div>
                )}

                {results.blogs.length > 0 && (
                  <div>
                    <p className="px-2 text-xs font-mono uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Blogs</p>
                    {results.blogs.map((b) => (
                      <Link key={b.id} to={`/blog/${b.slug}`} onClick={() => setOpen(false)} className="block px-2 py-2 rounded-lg hover:bg-white/5 text-sm">
                        {b.title} <span className="text-xs" style={{ color: 'var(--text-muted)' }}>· {b.category}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
