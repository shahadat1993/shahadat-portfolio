import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiClock, FiShare2, FiTwitter, FiLinkedin, FiLink, FiCheck } from 'react-icons/fi';
import { blogs } from '../data/mockData';
import BlogCard from '../components/BlogCard';
import BlogContent from '../components/BlogContent';
import ReadingProgress from '../components/ReadingProgress';
import SectionHeading from '../components/SectionHeading';

export default function BlogSingle() {
  const { slug } = useParams();
  const blog = blogs.find((b) => b.slug === slug);
  const [linkCopied, setLinkCopied] = useState(false);

  if (!blog) return <Navigate to="/blog" replace />;

  const related = blogs.filter((b) => b.slug !== slug && b.category === blog.category).slice(0, 2);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleShare = (kind) => {
    if (kind === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener,noreferrer');
    } else if (kind === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener,noreferrer');
    } else if (kind === 'copy') {
      navigator.clipboard?.writeText(shareUrl).then(() => {
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      });
    }
  };

  return (
    <div>
      <ReadingProgress />
      <div className="container-px mx-auto max-w-3xl py-16">
        <Link to="/blog" data-cursor-hover className="inline-flex items-center gap-2 text-sm accent-text mb-8">
          <FiArrowLeft /> Back to blog
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-2 text-xs font-mono flex-wrap" style={{ color: 'var(--text-muted)' }}>
            <span className="accent-text uppercase tracking-wider">{blog.category}</span>
            <span>·</span>
            <span>{new Date(blog.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><FiClock /> {blog.read_time}</span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold mt-3">{blog.title}</h1>
          <p className="mt-4 text-lg" style={{ color: 'var(--text-muted)' }}>{blog.excerpt}</p>

          <div className="flex items-center justify-between mt-6 pb-6 border-b" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full accent-bg flex items-center justify-center text-white text-xs font-semibold">
                {blog.author.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </div>
              <p className="text-sm font-medium">{blog.author}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs flex items-center gap-1 mr-1" style={{ color: 'var(--text-muted)' }}><FiShare2 /> Share</span>
              <button onClick={() => handleShare('twitter')} data-cursor-hover aria-label="Share on Twitter" className="w-8 h-8 rounded-full surface flex items-center justify-center">
                <FiTwitter className="text-xs" />
              </button>
              <button onClick={() => handleShare('linkedin')} data-cursor-hover aria-label="Share on LinkedIn" className="w-8 h-8 rounded-full surface flex items-center justify-center">
                <FiLinkedin className="text-xs" />
              </button>
              <button onClick={() => handleShare('copy')} data-cursor-hover aria-label="Copy link" className="w-8 h-8 rounded-full surface flex items-center justify-center">
                {linkCopied ? <FiCheck className="text-xs accent-text" /> : <FiLink className="text-xs" />}
              </button>
            </div>
          </div>
        </motion.div>

        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          src={blog.thumbnail}
          alt={blog.title}
          className="w-full rounded-2xl mt-8 aspect-video object-cover"
        />

        <div className="mt-10">
          <BlogContent blocks={blog.content} />
        </div>

        <div className="mt-10 pt-6 border-t flex flex-wrap gap-2 clear-both" style={{ borderColor: 'var(--border)' }}>
          {blog.tags.map((t) => (
            <span key={t} className="font-mono text-xs px-3 py-1 rounded-full" style={{ background: 'var(--surface-2)', color: 'var(--text-muted)' }}>#{t}</span>
          ))}
        </div>
      </div>

      {related.length > 0 && (
        <div className="container-px mx-auto max-w-5xl pb-24">
          <SectionHeading eyebrow="Keep reading" title="Related posts" />
          <div className="grid md:grid-cols-2 gap-6">
            {related.map((b, i) => <BlogCard key={b.id} blog={b} index={i} />)}
          </div>
        </div>
      )}
    </div>
  );
}
