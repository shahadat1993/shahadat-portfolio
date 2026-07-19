import { useMemo, useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import CategoryFilter from '../components/CategoryFilter';
import { projects, projectCategories } from '../data/mockData';

export default function Projects() {
  const [active, setActive] = useState('All');

  const filtered = useMemo(
    () => (active === 'All' ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  return (
    <div className="container-px mx-auto max-w-7xl py-16">
      <SectionHeading eyebrow="Portfolio" title="Projects" subtitle="A selection of full-stack products I've designed, built, and shipped." />
      <CategoryFilter categories={projectCategories} active={active} onChange={setActive} />

      {filtered.length === 0 ? (
        <p style={{ color: 'var(--text-muted)' }}>No projects in this category yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      )}
    </div>
  );
}
