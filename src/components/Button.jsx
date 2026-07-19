import { Link } from "react-router-dom";

/**
 * CTA button with a smooth "curtain reveal" hover: a solid accent layer
 * slides down from the top edge on hover. Pure CSS transforms (no JS
 * per-frame state updates), so it stays perfectly smooth — no shaking.
 */
export default function Button({
  to,
  href,
  onClick,
  variant = "primary",
  children,
  className = "",
  type,
  disabled = false,
}) {
  const base = `relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium isolate overflow-hidden group transition-transform duration-200 ease-out ${disabled ? "opacity-60 cursor-not-allowed" : "hover:scale-[1.03] active:scale-[0.97]"}`;

  const shell = variant === "primary" ? "text-white" : "surface";

  const content = (
    <span className={`${base} ${shell} ${className}`}>
      {variant === "primary" && (
        <>
          {/* base fill */}
          <span className="absolute inset-0 -z-10 accent-bg" />
          {/* reveal layer sliding down from the top on hover */}
          <span
            className="absolute inset-0 -z-10 -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"
            style={{
              background:
                "linear-gradient(135deg, var(--accent-2), var(--accent))",
            }}
          />
        </>
      )}
      {variant === "secondary" && (
        <span
          className="absolute inset-0 -z-10 -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"
          style={{ background: "var(--accent)", opacity: 0.12 }}
        />
      )}
      <span className="relative flex items-center gap-2">{children}</span>
    </span>
  );

  if (to)
    return (
      <Link
        to={to}
        data-cursor-hover
        onClick={onClick}
        className="inline-block"
      >
        {content}
      </Link>
    );
  if (href)
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        data-cursor-hover
        className="inline-block"
      >
        {content}
      </a>
    );
  return (
    <button
      type={type || "button"}
      disabled={disabled}
      data-cursor-hover
      onClick={onClick}
      className="inline-block"
    >
      {content}
    </button>
  );
}
