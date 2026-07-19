import { motion } from 'framer-motion';
import TechIcon from './TechIcon';
import CountUp from './CountUp';
import SectionHeading from './SectionHeading';
import { skills, stats } from '../data/mockData';

export default function SkillsGrid() {
  return (
    <section className="container-px mx-auto max-w-7xl py-24">
      <SectionHeading eyebrow="What I work with" title="Skills & Technologies" subtitle="A curated set of tools I use to build modern, scalable, and performant web applications." align="center" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {skills.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: (i % 4) * 0.07 }}
            className="surface rounded-2xl p-5 text-center hover:-translate-y-1 transition-transform"
          >
            <TechIcon name={s.icon} className="text-3xl accent-text mx-auto mb-3" />
            <p className="font-semibold text-sm">{s.name}</p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{s.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-16 mt-16">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-display text-4xl font-bold accent-grad-text">
              <CountUp value={s.value} suffix="+" />
            </p>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
