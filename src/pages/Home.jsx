import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiArrowUpRight, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import SectionHeading from '../components/SectionHeading';
import ProjectShowcase from '../components/ProjectShowcase';
import BlogCard from '../components/BlogCard';
import Timeline from '../components/Timeline';
import HeroVisual from '../components/HeroVisual';
import OrbitProfile from '../components/OrbitProfile';
import SkillsGrid from '../components/SkillsGrid';
import TechMarquee from '../components/TechMarquee';
import Testimonials from '../components/Testimonials';
import TypingText from '../components/TypingText';
import Button from '../components/Button';
import { profile, timeline, projects, blogs } from '../data/mockData';

const SOCIAL_ICONS = { github: FiGithub, linkedin: FiLinkedin, twitter: FiTwitter };

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="container-px mx-auto max-w-7xl min-h-[85vh] grid md:grid-cols-2 gap-10 items-center relative">
        <motion.div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-25 -z-10"
          style={{ background: 'var(--accent)' }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div>
          {profile.availableForWork && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 surface rounded-full px-3 py-1 mb-4">
              <span className="relative flex w-2 h-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>Available for work</span>
            </motion.div>
          )}
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="font-mono text-sm accent-text uppercase tracking-widest mb-4 h-5">
            <TypingText words={profile.role} />
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl font-bold leading-[1.05]">
            Hi, I'm <span className="accent-grad-text">{profile.firstName}</span>.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {profile.tagline}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4">
            <Button to="/projects" variant="primary">View my work <FiArrowRight /></Button>
            <Button to="/contact" variant="secondary">Let's talk</Button>
            {profile.resumeUrl && (
              <Button href={profile.resumeUrl} variant="secondary">Download resume</Button>
            )}
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex gap-3 mt-10">
            {profile.socials.map((s) => {
              const Icon = SOCIAL_ICONS[s.icon];
              return (
                <a key={s.label} href={s.url} target="_blank" rel="noreferrer" data-cursor-hover aria-label={s.label}
                  className="w-11 h-11 rounded-full surface flex items-center justify-center">
                  <Icon />
                </a>
              );
            })}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
          <HeroVisual />
        </motion.div>
      </section>

      {/* Tech marquee strip */}
      <section className="py-8 border-y" style={{ borderColor: 'var(--border)' }}>
        <TechMarquee />
      </section>

      {/* About / intro with orbit profile */}
      <section className="container-px mx-auto max-w-7xl py-24 grid md:grid-cols-2 gap-14 items-center">
        <OrbitProfile />
        <div>
          <span className="font-mono text-xs accent-text uppercase tracking-widest">About me</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-3">I like clean architecture and honest feedback loops.</h2>
          <p className="mt-4 leading-relaxed" style={{ color: 'var(--text-muted)' }}>{profile.bio}</p>
          <div className="grid grid-cols-3 gap-3 mt-8">
            {profile.stats.map((s) => (
              <div key={s.label} className="surface rounded-xl p-4 text-center">
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
                <p className="font-display font-semibold mt-1 text-sm">{s.value}</p>
              </div>
            ))}
          </div>
          <Link to="/about" data-cursor-hover className="inline-flex items-center gap-2 accent-text font-medium mt-8">
            More about me <FiArrowUpRight />
          </Link>
        </div>
      </section>

      {/* Skills */}
      <SkillsGrid />

      {/* Timeline */}
      <section className="container-px mx-auto max-w-7xl py-24">
        <SectionHeading eyebrow="My journey" title="Experience & education" align="center" />
        <Timeline items={timeline} />
      </section>

      {/* Featured projects showcase */}
      <section className="container-px mx-auto max-w-7xl py-24">
        <SectionHeading eyebrow="Selected work" title="Featured projects" subtitle="Explore recent work showcasing full-stack architecture and creative solutions." align="center" />
        <ProjectShowcase projects={featured} />
      </section>

      {/* Open to work banner */}
      {profile.availableForWork && (
        <section className="container-px mx-auto max-w-7xl py-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="surface rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
              <div>
                <p className="font-mono text-xs uppercase tracking-widest accent-text">Open to work</p>
                <p className="font-display text-xl md:text-2xl font-bold mt-1">Looking for my next big opportunity</p>
                <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Available for full-time roles, freelance projects & collaborations.</p>
              </div>
            </div>
            <Link to="/contact" data-cursor-hover className="accent-bg text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 shrink-0">
              Let's connect <FiArrowRight />
            </Link>
          </motion.div>
        </section>
      )}

      {/* Testimonials */}
      <Testimonials />

      {/* Blog preview */}
      <section className="container-px mx-auto max-w-7xl py-24">
        <div className="flex items-end justify-between">
          <SectionHeading eyebrow="Writing" title="From the blog" />
          <Link to="/blog" data-cursor-hover className="hidden md:flex items-center gap-1 text-sm accent-text mb-10">
            View all <FiArrowRight />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {blogs.map((b, i) => <BlogCard key={b.id} blog={b} index={i} />)}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="container-px mx-auto max-w-7xl py-24">
        <div className="rounded-3xl p-12 md:p-20 text-center surface relative overflow-hidden">
          <div className="absolute inset-0 accent-grad opacity-10 -z-10" />
          <h2 className="font-display text-3xl md:text-5xl font-bold max-w-2xl mx-auto">
            Have a project in mind? Let's build it.
          </h2>
          <Button to="/contact" variant="primary" className="mt-8">Start a conversation <FiArrowRight /></Button>
        </div>
      </section>
    </div>
  );
}
