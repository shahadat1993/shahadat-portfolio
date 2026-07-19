import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiExternalLink, FiGithub, FiCheck, FiChevronLeft, FiChevronRight, FiCalendar, FiUser } from 'react-icons/fi';
import { projects } from '../data/mockData';
import ProjectCard from '../components/ProjectCard';
import SectionHeading from '../components/SectionHeading';

export default function ProjectSingle() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const [imgIndex, setImgIndex] = useState(0);

  if (!project) return <Navigate to="/projects" replace />;

  const gallery = project.gallery?.length ? project.gallery : [project.thumbnail];
  const related = projects.filter((p) => p.slug !== slug && p.category === project.category).slice(0, 3);

  return (
    <div className="container-px mx-auto max-w-5xl py-16">
      <Link to="/projects" data-cursor-hover className="inline-flex items-center gap-2 text-sm accent-text mb-8">
        <FiArrowLeft /> Back to projects
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <span className="inline-block font-mono text-xs px-3 py-1 rounded-full border" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
          {project.badge}
        </span>
        <h1 className="font-display text-3xl md:text-5xl font-bold mt-4">{project.title}</h1>
        <p className="mt-4 text-lg max-w-2xl" style={{ color: 'var(--text-muted)' }}>{project.short_description}</p>

        <div className="flex flex-wrap gap-6 mt-5 text-sm" style={{ color: 'var(--text-muted)' }}>
          <span className="flex items-center gap-1.5"><FiUser /> {project.client}</span>
          <span className="flex items-center gap-1.5"><FiCalendar /> {project.year}</span>
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          <a href={project.live_url} target="_blank" rel="noreferrer" data-cursor-hover className="accent-bg text-white px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2">
            Live demo <FiExternalLink />
          </a>
          <a href={project.github_url} target="_blank" rel="noreferrer" data-cursor-hover className="surface px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2">
            Source code <FiGithub />
          </a>
          <Link to="/contact" data-cursor-hover className="surface px-5 py-2.5 rounded-full text-sm font-medium">
            Discuss a similar project
          </Link>
        </div>
      </motion.div>

      {/* Gallery */}
      <div className="relative mt-10 rounded-2xl overflow-hidden aspect-video">
        <AnimatePresence mode="wait">
          <motion.img
            key={imgIndex}
            src={gallery[imgIndex]}
            alt={`${project.title} screenshot ${imgIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
        {gallery.length > 1 && (
          <>
            <button onClick={() => setImgIndex((i) => (i - 1 + gallery.length) % gallery.length)} data-cursor-hover
              aria-label="Previous image" className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ background: 'rgba(0,0,0,0.4)' }}>
              <FiChevronLeft />
            </button>
            <button onClick={() => setImgIndex((i) => (i + 1) % gallery.length)} data-cursor-hover
              aria-label="Next image" className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ background: 'rgba(0,0,0,0.4)' }}>
              <FiChevronRight />
            </button>
            <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5">
              {gallery.map((_, i) => (
                <span key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: i === imgIndex ? '#fff' : 'rgba(255,255,255,0.4)' }} />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-10 mt-12">
        <div className="md:col-span-2">
          <h2 className="font-display text-xl font-semibold mb-3">Overview</h2>
          <p className="leading-relaxed" style={{ color: 'var(--text-muted)' }}>{project.description}</p>

          <h2 className="font-display text-xl font-semibold mt-8 mb-3">Key features</h2>
          <ul className="space-y-2">
            {project.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm">
                <FiCheck className="mt-0.5 accent-text shrink-0" /> {f}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-lg font-semibold mb-3">Tech stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.tech_stack.map((t) => (
              <span key={t} className="font-mono text-xs px-3 py-1 rounded-full" style={{ background: 'var(--surface-2)', color: 'var(--text-muted)' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-24">
          <SectionHeading eyebrow="Keep exploring" title={`More in ${project.category}`} />
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </div>
        </div>
      )}
    </div>
  );
}
