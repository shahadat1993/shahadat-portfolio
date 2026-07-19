import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';

export default function ProjectCard({ project, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
    >
      <Link
        to={`/projects/${project.slug}`}
        data-cursor-hover
        className="group block rounded-2xl overflow-hidden surface transition-transform hover:-translate-y-1"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={project.thumbnail}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}>
            <span className="text-white text-sm flex items-center gap-1">View project <FiArrowUpRight /></span>
          </div>
        </div>
        <div className="p-5">
          <span className="font-mono text-xs uppercase tracking-wider accent-text">{project.category}</span>
          <h3 className="font-display text-lg font-semibold mt-1">{project.title}</h3>
          <p className="text-sm mt-1 line-clamp-2" style={{ color: 'var(--text-muted)' }}>{project.short_description}</p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.tech_stack.slice(0, 3).map((t) => (
              <span key={t} className="font-mono text-[11px] px-2 py-0.5 rounded-full" style={{ background: 'var(--surface-2)', color: 'var(--text-muted)' }}>{t}</span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
