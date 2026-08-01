const COMPANIES = [
  "Corebyte",
  "Studio Polaris",
  "Everpath",
  "HorizonWorks",
  "NimbusWorks",
  "Horizon Labs",
  "Brightwave",
  "Northstar",
  "SummitFlow",
  "Stratus",
];

/** Infinite logo marquee — "Trusted by teams everywhere". */
export function LogoTicker() {
  return (
    <section aria-label="Trusted by teams everywhere" className="pb-16 md:pb-24">
      <div className="shell">
        <p className="text-center text-[0.875rem] text-subtle">Trusted by teams everywhere</p>
        <div className="marquee-mask relative mt-8 overflow-hidden">
          <ul className="marquee-track flex w-max animate-[marquee_38s_linear_infinite] items-center gap-12 pr-12">
            {[...COMPANIES, ...COMPANIES].map((name, i) => (
              <li
                key={`${name}-${i}`}
                aria-hidden={i >= COMPANIES.length}
                className="flex items-center gap-2.5 text-[1.375rem] font-medium tracking-[-0.03em] whitespace-nowrap text-foreground/35 transition-colors duration-300 hover:text-foreground/70"
              >
                <span className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-foreground/20" />
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
