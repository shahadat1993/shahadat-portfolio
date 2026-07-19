import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiExternalLink, FiGithub, FiCheck } from 'react-icons/fi';

export default function ProjectShowcase({ projects }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const paused = useRef(false);
  const project = projects[index];

  const go = (d) => {
    setDir(d);
    setIndex((i) => (i + d + projects.length) % projects.length);
  };

  useEffect(() => {
    if (projects.length <= 1) return;
    const id = setInterval(() => {
      if (!paused.current) go(1);
    }, 3000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects.length]);

  return (
    <div className="relative" onMouseEnter={() => (paused.current = true)} onMouseLeave={() => (paused.current = false)}>
      <div className="grid md:grid-cols-2 gap-10 items-center min-h-[480px]">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={project.id + '-img'}
            custom={dir}
            initial={{ opacity: 0, x: 40 * dir }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 * dir }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl overflow-hidden aspect-[4/3]"
          >
            <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={project.id + '-info'}
            custom={dir}
            initial={{ opacity: 0, x: 40 * dir }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 * dir }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <span className="inline-block font-mono text-xs px-3 py-1 rounded-full border" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
              {project.badge}
            </span>
            <h3 className="font-display text-3xl md:text-4xl font-bold mt-4">{project.title}</h3>
            <p className="mt-3 leading-relaxed" style={{ color: 'var(--text-muted)' }}>{project.short_description}</p>

            <p className="font-mono text-xs uppercase tracking-wider mt-6 mb-2" style={{ color: 'var(--text-muted)' }}>Key features</p>
            <ul className="space-y-1.5">
              {project.features.slice(0, 4).map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <FiCheck className="mt-0.5 accent-text shrink-0" /> {f}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 mt-5">
              {project.tech_stack.slice(0, 4).map((t) => (
                <span key={t} className="font-mono text-xs px-3 py-1 rounded-full" style={{ background: 'var(--surface-2)', color: 'var(--text-muted)' }}>{t}</span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              <Link to={`/projects/${project.slug}`} data-cursor-hover className="accent-bg text-white px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2">
                View details <FiExternalLink />
              </Link>
              <a href={project.live_url} target="_blank" rel="noreferrer" data-cursor-hover className="surface px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2">
                Live demo <FiExternalLink />
              </a>
              <a href={project.github_url} target="_blank" rel="noreferrer" data-cursor-hover className="surface px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2">
                Source <FiGithub />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-4 mt-8">
        <button onClick={() => go(-1)} data-cursor-hover aria-label="Previous project" className="w-11 h-11 rounded-full surface flex items-center justify-center">
          <FiChevronLeft />
        </button>
        <div className="flex gap-1.5">
          {projects.map((p, i) => (
            <button key={p.id} onClick={() => { setDir(i > index ? 1 : -1); setIndex(i); }} aria-label={`Go to ${p.title}`}
              className="w-2 h-2 rounded-full transition-all"
              style={{ background: i === index ? 'var(--accent)' : 'var(--border)', width: i === index ? '20px' : '8px' }} />
          ))}
        </div>
        <button onClick={() => go(1)} data-cursor-hover aria-label="Next project" className="w-11 h-11 rounded-full surface flex items-center justify-center">
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
}
