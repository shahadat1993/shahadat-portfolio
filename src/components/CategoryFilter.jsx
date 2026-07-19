export default function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 mb-10">
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          data-cursor-hover
          className="px-4 py-1.5 rounded-full text-sm font-mono transition-colors"
          style={
            active === c
              ? { background: 'var(--accent)', color: '#fff' }
              : { background: 'var(--surface-2)', color: 'var(--text-muted)' }
          }
        >
          {c}
        </button>
      ))}
    </div>
  );
}
