import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';
import { useEffect, useState } from 'react';

const R = 18;
const CIRC = 2 * Math.PI * R;

export default function ScrollTopButton() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const dashoffset = useTransform(progress, (v) => CIRC * (1 - v));
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      data-cursor-hover
      aria-label="Scroll to top"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.6, pointerEvents: visible ? 'auto' : 'none' }}
      transition={{ duration: 0.25 }}
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full surface flex items-center justify-center"
    >
      <svg width="44" height="44" viewBox="0 0 44 44" className="absolute inset-0 -rotate-90">
        <circle cx="22" cy="22" r={R} fill="none" stroke="var(--border)" strokeWidth="2" />
        <motion.circle
          cx="22" cy="22" r={R} fill="none" stroke="var(--accent)" strokeWidth="2"
          strokeDasharray={CIRC} style={{ strokeDashoffset: dashoffset }} strokeLinecap="round"
        />
      </svg>
      <FiArrowUp className="accent-text" />
    </motion.button>
  );
}
