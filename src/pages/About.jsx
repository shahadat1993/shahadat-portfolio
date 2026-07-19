import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import Timeline from '../components/Timeline';
import TechIcon from '../components/TechIcon';
import OrbitProfile from '../components/OrbitProfile';
import { profile, skills, timeline } from '../data/mockData';

export default function About() {
  return (
    <div className="container-px mx-auto max-w-6xl py-16">
      <div className="grid md:grid-cols-2 gap-14 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="font-mono text-sm accent-text uppercase tracking-widest">About</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-3">Hi, I'm {profile.firstName}.</h1>
          <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>{profile.bio}</p>
          <div className="grid grid-cols-3 gap-3 mt-8">
            {profile.stats.map((s) => (
              <div key={s.label} className="surface rounded-xl p-4 text-center">
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
                <p className="font-display font-semibold mt-1 text-sm">{s.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <OrbitProfile />
      </div>

      <section className="mt-24">
        <SectionHeading eyebrow="Toolbox" title="What I work with" align="center" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {skills.map((s) => (
            <div key={s.name} className="surface rounded-2xl p-5 text-center">
              <TechIcon name={s.icon} className="text-2xl accent-text mx-auto mb-2" />
              <p className="font-semibold text-sm">{s.name}</p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24">
        <SectionHeading eyebrow="Journey" title="Experience & education" align="center" />
        <Timeline items={timeline} />
      </section>
    </div>
  );
}
