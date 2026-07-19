import { useEffect, useRef } from 'react';

const DOT_COUNT = 8;

export default function Cursor() {
  const dotsRef = useRef([]);
  const posRef = useRef({ x: -100, y: -100 });
  const trail = useRef(Array.from({ length: DOT_COUNT }, () => ({ x: -100, y: -100 })));
  const hoverRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return; // skip on touch devices

    const move = (e) => { posRef.current = { x: e.clientX, y: e.clientY }; };
    const over = (e) => {
      hoverRef.current = !!e.target.closest('a, button, [data-cursor-hover]');
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);

    let raf;
    const tick = () => {
      let { x, y } = posRef.current;
      trail.current.forEach((p, i) => {
        const lead = i === 0 ? posRef.current : trail.current[i - 1];
        p.x += (lead.x - p.x) * 0.35;
        p.y += (lead.y - p.y) * 0.35;
        const el = dotsRef.current[i];
        if (el) {
          const scale = 1 - i * 0.09;
          el.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%) scale(${hoverRef.current ? scale * 1.6 : scale})`;
        }
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block" aria-hidden="true">
      {Array.from({ length: DOT_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (dotsRef.current[i] = el)}
          className="fixed top-0 left-0 rounded-full"
          style={{
            width: 10 - i * 0.6,
            height: 10 - i * 0.6,
            background: i === 0 ? 'var(--accent)' : 'var(--accent-2)',
            opacity: 1 - i * 0.1,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  );
}
