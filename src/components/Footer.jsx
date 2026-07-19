import { profile } from '../data/mockData';

export default function Footer() {
  return (
    <footer className="mt-32 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="container-px mx-auto max-w-7xl py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} {profile.name}. Built with Laravel &amp; React.
        </p>
        <div className="flex gap-5 text-sm">
          {profile.socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noreferrer" data-cursor-hover className="hover:accent-text" style={{ color: 'var(--text-muted)' }}>
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
