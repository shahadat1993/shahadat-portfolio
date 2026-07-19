import { useMemo, useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import BlogCard from '../components/BlogCard';
import CategoryFilter from '../components/CategoryFilter';
import { blogs, blogCategories } from '../data/mockData';

export default function Blogs() {
  const [active, setActive] = useState('All');

  const filtered = useMemo(
    () => (active === 'All' ? blogs : blogs.filter((b) => b.category === active)),
    [active]
  );

  return (
    <div className="container-px mx-auto max-w-7xl py-16">
      <SectionHeading eyebrow="Writing" title="Blog" subtitle="Notes on Laravel, React, and things I learn while building." />
      <CategoryFilter categories={blogCategories} active={active} onChange={setActive} />

      {filtered.length === 0 ? (
        <p style={{ color: 'var(--text-muted)' }}>No posts in this category yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((b, i) => <BlogCard key={b.id} blog={b} index={i} />)}
        </div>
      )}
    </div>
  );
}
