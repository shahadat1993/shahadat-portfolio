import { motion } from 'framer-motion';

export default function ContactIllustration() {
  return (
    <div className="relative w-full aspect-square max-w-sm mx-auto" aria-hidden="true">
      <motion.div
        className="absolute inset-[10%] rounded-full blur-3xl opacity-30"
        style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))' }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* stars */}
      {Array.from({ length: 18 }).map((_, i) => {
        const top = (i * 37) % 100;
        const left = (i * 53) % 100;
        return (
          <motion.span
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white"
            style={{ top: `${top}%`, left: `${left}%`, opacity: 0.6 }}
            animate={{ opacity: [0.2, 0.9, 0.2] }}
            transition={{ duration: 2 + (i % 4), repeat: Infinity, delay: i * 0.15 }}
          />
        );
      })}

      {/* floating astronaut (original simple geometric illustration) */}
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute inset-0"
        animate={{ y: [0, -14, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ellipse cx="100" cy="150" rx="55" ry="10" fill="var(--accent)" opacity="0.15" />
        {/* body */}
        <rect x="72" y="90" width="56" height="70" rx="24" fill="var(--surface-2)" stroke="var(--border)" />
        {/* backpack straps */}
        <rect x="80" y="95" width="10" height="55" rx="5" fill="var(--accent)" opacity="0.5" />
        <rect x="110" y="95" width="10" height="55" rx="5" fill="var(--accent-2)" opacity="0.5" />
        {/* helmet */}
        <circle cx="100" cy="70" r="38" fill="var(--surface-2)" stroke="var(--accent)" strokeWidth="2" />
        <circle cx="100" cy="70" r="26" fill="var(--bg)" />
        <circle cx="92" cy="64" r="5" fill="var(--accent)" />
        <circle cx="110" cy="72" r="3" fill="var(--accent-2)" />
        {/* arms */}
        <motion.rect
          x="52" y="105" width="20" height="46" rx="10" fill="var(--surface-2)" stroke="var(--border)"
          animate={{ rotate: [0, 15, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ transformOrigin: '62px 108px' }}
        />
        <rect x="128" y="105" width="20" height="46" rx="10" fill="var(--surface-2)" stroke="var(--border)" />
        {/* legs */}
        <rect x="80" y="155" width="16" height="34" rx="8" fill="var(--surface-2)" stroke="var(--border)" />
        <rect x="104" y="155" width="16" height="34" rx="8" fill="var(--surface-2)" stroke="var(--border)" />
      </motion.svg>
    </div>
  );
}
