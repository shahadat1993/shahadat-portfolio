import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import SectionHeading from './SectionHeading';
import { testimonials } from '../data/mockData';

const COLORS = ['#7c6fff', '#3ddad7', '#f59e0b', '#ec4899', '#22c55e', '#06b6d4'];

function Card({ t, i }) {
  return (
    <div className="surface rounded-2xl p-6 h-full">
      <span className="font-display text-3xl accent-text">&ldquo;</span>
      <p className="leading-relaxed" style={{ color: 'var(--text-muted)' }}>{t.quote}</p>
      <div className="flex items-center gap-3 mt-5 pt-5 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0" style={{ background: COLORS[i % COLORS.length] }}>
          {t.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
        </div>
        <div>
          <p className="font-medium text-sm">{t.name}</p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{t.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const isSlider = testimonials.length > 4;
  const perView = 2;
  const [page, setPage] = useState(0);
  const pages = Math.ceil(testimonials.length / perView);
  const paused = useRef(false);

  useEffect(() => {
    if (!isSlider) return;
    const id = setInterval(() => {
      if (!paused.current) setPage((p) => (p + 1) % pages);
    }, 3000);
    return () => clearInterval(id);
  }, [isSlider, pages]);

  return (
    <section className="container-px mx-auto max-w-7xl py-24">
      <SectionHeading eyebrow="Testimonials" title="Kind words from people I've worked with" align="center" />

      {!isSlider ? (
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}>
              <Card t={t} i={i} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div onMouseEnter={() => (paused.current = true)} onMouseLeave={() => (paused.current = false)}>
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
                className="grid md:grid-cols-2 gap-6"
              >
                {testimonials.slice(page * perView, page * perView + perView).map((t, i) => (
                  <Card key={t.id} t={t} i={page * perView + i} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={() => setPage((p) => (p - 1 + pages) % pages)} data-cursor-hover aria-label="Previous testimonials" className="w-11 h-11 rounded-full surface flex items-center justify-center">
              <FiChevronLeft />
            </button>
            <div className="flex gap-1.5">
              {Array.from({ length: pages }).map((_, i) => (
                <button key={i} onClick={() => setPage(i)} aria-label={`Page ${i + 1}`}
                  className="h-2 rounded-full transition-all"
                  style={{ background: i === page ? 'var(--accent)' : 'var(--border)', width: i === page ? '20px' : '8px' }} />
              ))}
            </div>
            <button onClick={() => setPage((p) => (p + 1) % pages)} data-cursor-hover aria-label="Next testimonials" className="w-11 h-11 rounded-full surface flex items-center justify-center">
              <FiChevronRight />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
