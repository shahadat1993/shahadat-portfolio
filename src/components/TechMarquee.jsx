import { motion } from 'framer-motion';
import TechIcon from './TechIcon';
import { skills } from '../data/mockData';

function Row({ items, toRight = false, duration = 16 }) {
  const loop = [...items, ...items];
  return (
    <div className="overflow-hidden py-2">
      <motion.div
        className="flex gap-4 w-max"
        animate={{ x: toRight ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {loop.map((s, i) => (
          <div key={s.name + i} className="flex items-center gap-3 surface rounded-2xl pl-2.5 pr-5 py-2.5 shrink-0 hover:-translate-y-0.5 transition-transform">
            <span className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--surface-2)' }}>
              <TechIcon name={s.icon} className="accent-text text-lg" />
            </span>
            <div className="text-left">
              <p className="text-sm font-semibold leading-tight whitespace-nowrap">{s.name}</p>
              <p className="text-[11px] leading-tight whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function TechMarquee() {
  const half = Math.ceil(skills.length / 2);
  const row1 = skills.slice(0, half);
  const row2 = skills.slice(half);

  return (
    <div
      className="space-y-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      aria-hidden="true"
    >
      {/* Row 1: moves left -> right */}
      <Row items={row1} toRight duration={15} />
      {/* Row 2: moves right -> left */}
      <Row items={row2} toRight={false} duration={17} />
    </div>
  );
}
