type LogoMarkProps = {
  className?: string;
  /** Stroke/fill color, defaults to currentColor. */
  color?: string;
};

/** Recreated brand mark: converging accretion arcs around a solid core. */
export function LogoMark({ className, color = "currentColor" }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      role="img"
      aria-label="Accretion logo"
      fill="none"
    >
      <circle cx="12" cy="12" r="3.2" fill={color} />
      <path
        d="M12 2.5c5.25 0 9.5 4.25 9.5 9.5S17.25 21.5 12 21.5 2.5 17.25 2.5 12"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M12 6.2a5.8 5.8 0 1 1-5.8 5.8"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.8"
      />
    </svg>
  );
}
