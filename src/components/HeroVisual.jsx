import { motion } from 'framer-motion';
import TechIcon from './TechIcon';

const badges = ['laravel', 'react', 'mysql', 'javascript', 'reactnative', 'git'];

export default function HeroVisual() {
  return (
    <div className="relative w-full aspect-square max-w-md mx-auto select-none" aria-hidden="true">
      {/* glow core */}
      <motion.div
        className="absolute inset-[18%] rounded-full blur-2xl"
        style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', opacity: 0.35 }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* orbit rings */}
      {[0, 1].map((r) => (
        <motion.div
          key={r}
          className="absolute inset-0 rounded-full border"
          style={{ borderColor: 'var(--border)', inset: `${8 + r * 12}%` }}
          animate={{ rotate: r === 0 ? 360 : -360 }}
          transition={{ duration: 26 + r * 10, repeat: Infinity, ease: 'linear' }}
        >
          {Array.from({ length: r === 0 ? 4 : 2 }).map((_, i, arr) => {
            const angle = (360 / arr.length) * i;
            const badge = badges[(r * 4 + i) % badges.length];
            return (
              <div
                key={i}
                className="absolute w-11 h-11 -ml-[22px] -mt-[22px] rounded-2xl surface flex items-center justify-center shadow-lg"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${angle}deg) translate(${r === 0 ? 150 : 190}px) rotate(-${angle}deg)`,
                }}
              >
                <TechIcon name={badge} className="text-lg accent-text" />
              </div>
            );
          })}
        </motion.div>
      ))}

      {/* center glass card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
        transition={{ opacity: { duration: 0.6 }, scale: { duration: 0.6 }, y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
        className="absolute inset-[30%] rounded-3xl surface backdrop-blur flex flex-col justify-center p-4 font-mono text-[11px] leading-relaxed shadow-2xl"
      >
        <p style={{ color: 'var(--text-muted)' }}><span className="accent-text">const</span> dev = {'{'}</p>
        <p className="pl-3">stack: <span className="accent-text">'Laravel+React'</span>,</p>
        <p className="pl-3">ships: <span className="accent-text">true</span>,</p>
        <p>{'}'}</p>
      </motion.div>
    </div>
  );
}
