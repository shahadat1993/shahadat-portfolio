import { motion } from 'framer-motion';

export default function SectionHeading({ eyebrow, title, subtitle, align = 'left' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-10 ${align === 'center' ? 'text-center mx-auto max-w-2xl' : ''}`}
    >
      {eyebrow && <span className="font-mono text-xs uppercase tracking-wider accent-text">{eyebrow}</span>}
      <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">{title}</h2>
      {subtitle && <p className="mt-3 text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>{subtitle}</p>}
    </motion.div>
  );
}
