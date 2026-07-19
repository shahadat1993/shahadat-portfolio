import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiBriefcase, FiBook, FiAward } from 'react-icons/fi';

const ICONS = { experience: FiBriefcase, education: FiBook, milestone: FiAward };
const PALETTE = ['#7c6fff', '#3ddad7', '#f59e0b', '#ec4899', '#22c55e', '#06b6d4'];

export default function Timeline({ items }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.4'] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const dotTop = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div ref={ref} className="relative max-w-3xl mx-auto">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2" style={{ background: 'var(--border)' }} />
      <motion.div className="absolute left-4 md:left-1/2 top-0 w-px md:-translate-x-1/2 accent-grad" style={{ height: lineHeight }} />
      <motion.div
        className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 accent-bg z-10"
        style={{ top: dotTop, boxShadow: '0 0 18px var(--accent)' }}
      />

      {items.map((item, i) => {
        const fromLeft = i % 2 === 0;
        const Icon = ICONS[item.type] || FiBriefcase;
        const color = PALETTE[i % PALETTE.length];
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: fromLeft ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className={`relative pl-14 md:pl-0 mb-10 md:w-1/2 ${fromLeft ? 'md:pr-12' : 'md:ml-auto md:pl-12'}`}
          >
            <div className="surface rounded-2xl p-5 border-l-4 md:border-l-0" style={{ borderColor: color, borderTopColor: 'transparent' }}>
              <div className={`flex items-center gap-2 mb-2 ${fromLeft ? 'md:flex-row-reverse' : ''}`}>
                <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: `${color}22` }}>
                  <Icon style={{ color }} className="text-sm" />
                </span>
                <div className={`flex items-center gap-2 text-xs font-mono flex-wrap ${fromLeft ? 'md:text-right' : ''}`} style={{ color: 'var(--text-muted)' }}>
                  <span className="uppercase tracking-wider" style={{ color }}>{item.type}</span>
                  <span>·</span>
                  <span>{item.period}</span>
                </div>
              </div>
              <h3 className={`font-display text-lg font-semibold ${fromLeft ? 'md:text-right' : ''}`}>{item.title}</h3>
              <p className={`text-sm ${fromLeft ? 'md:text-right' : ''}`} style={{ color: 'var(--text-muted)' }}>{item.subtitle} {item.location && `· ${item.location}`}</p>
              <p className={`text-sm mt-2 leading-relaxed ${fromLeft ? 'md:text-right' : ''}`} style={{ color: 'var(--text-muted)' }}>{item.description}</p>
              {item.tags?.length > 0 && (
                <div className={`flex flex-wrap gap-1.5 mt-3 ${fromLeft ? 'md:justify-end' : ''}`}>
                  {item.tags.map((t) => (
                    <span key={t} className="font-mono text-[11px] px-2 py-0.5 rounded-full" style={{ background: `${color}18`, color }}>{t}</span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
