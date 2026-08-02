const PARTNERS = [
  {
    name: "Luminous",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14l8-8" />
        <path d="M8 18l8-8" />
        <path d="M12 22l8-8" />
      </svg>
    ),
  },
  {
    name: "Spherule",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-45 12 12)" />
      </svg>
    ),
  },
  {
    name: "Sisyphus",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        {/* Dynamic geometric polygons resembling the isometric "S" staircase ribbons */}
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M2 12l10 5 10-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M12 12v10" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    name: "Capsule",
    icon: (
      <svg width="34" height="24" viewBox="0 0 34 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" fillOpacity="0.4" />
        <circle cx="22" cy="12" r="10" fillOpacity="0.5" />
      </svg>
    ),
  },
  {
    name: "Acme Corp",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l10 18H2L12 3z" />
        <path d="M12 15l-4 6M12 15l4 6M12 15v-8" />
      </svg>
    ),
  }
];

/** Infinite logo marquee — "Trusted by teams everywhere". */
export function LogoTicker() {
  return (
    <section aria-label="Trusted by teams everywhere" className="relative pb-20 md:pb-32 overflow-hidden bg-transparent">

      {/* Explicit fade layers removed in favor of CSS mask-image for agnostic background blending */}

      <div className="w-full max-w-[1440px] mx-auto">
        <p className="text-center text-[0.9375rem] font-medium text-black">Trusted by teams everywhere</p>

        <div
          className="relative mt-8 md:mt-12 flex items-center overflow-hidden w-full"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
          }}
        >
          <div className="flex w-max animate-[marquee_25s_linear_infinite] items-center gap-16 md:gap-24 px-8 md:px-12">
            {[...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, i) => (
              <div
                key={`${partner.name}-${i}`}
                className="flex items-center gap-3 text-black opacity-85 transition-opacity hover:opacity-100"
              >
                <div className="text-black shrink-0">
                  {partner.icon}
                </div>
                <span className="text-[1.35rem] font-bold tracking-tight whitespace-nowrap">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
