import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function BlogCard({ blog, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
    >
      <Link to={`/blog/${blog.slug}`} data-cursor-hover className="group block rounded-2xl overflow-hidden surface transition-transform hover:-translate-y-1">
        <div className="aspect-[16/9] overflow-hidden">
          <img src={blog.thumbnail} alt={blog.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
            <span className="accent-text uppercase tracking-wider">{blog.category}</span>
            <span>·</span>
            <span>{new Date(blog.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <h3 className="font-display text-lg font-semibold mt-2">{blog.title}</h3>
          <p className="text-sm mt-1 line-clamp-2" style={{ color: 'var(--text-muted)' }}>{blog.excerpt}</p>
        </div>
      </Link>
    </motion.div>
  );
}
