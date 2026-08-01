import { ASSETS } from "./content";

/** Infinite logo marquee — "Trusted by teams everywhere". */
export function LogoTicker() {
  return (
    <section aria-label="Trusted by teams everywhere" className="pb-16 md:pb-24">
      <div className="shell">
        <p className="text-center text-[0.875rem] text-subtle">Trusted by teams everywhere</p>
        <div className="marquee-mask relative mt-8 overflow-hidden">
          <div className="marquee-track flex w-max animate-[marquee_38s_linear_infinite] items-center">
            {[0, 1].map((copy) => (
              <img
                key={copy}
                src={ASSETS.logoStrip}
                alt={copy === 0 ? "Logos of companies using Accretion" : ""}
                aria-hidden={copy === 1}
                width={1920}
                height={676}
                loading="lazy"
                className="h-12 w-auto max-w-none object-contain opacity-70 md:h-16"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
