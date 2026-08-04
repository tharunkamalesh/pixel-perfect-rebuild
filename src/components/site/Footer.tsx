"use client";

import { useState } from "react";
import { NAV_LINKS, ASSETS } from "./content";
import { LogoMark } from "./LogoMark";

const FOOTER_NAV = [
  { label: "Features", href: "#features" },
  { label: "Integrations", href: "#" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const FOOTER_SOCIAL = [
  { label: "Twitter", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer className="relative bg-[#F8F7F2] text-black pb-24 sm:pb-0">
      <div className="mx-auto w-full lg:max-w-none px-6 lg:px-12 xl:px-24">
        <div className="flex flex-col-reverse md:flex-row justify-between border-t border-black/10 pt-8 md:pt-16">

          {/* Automatically stacks to BOTTOM on Mobile, sits LEFT on Desktop */}
          <div className="flex gap-20 md:gap-32 xl:gap-40 border-t border-black/10 pt-8 mt-8 md:border-0 md:pt-0 md:mt-0 w-full md:w-auto relative z-10">
            <nav aria-label="Footer navigation">
              <h2 className="text-[0.75rem] text-[#6B7280] mb-6">Navigation</h2>
              <ul className="flex flex-col gap-4">
                {FOOTER_NAV.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-[0.875rem] font-medium text-black transition-opacity hover:opacity-75"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Social">
              <h2 className="text-[0.75rem] text-[#6B7280] mb-6">Social</h2>
              <ul className="flex flex-col gap-4">
                {FOOTER_SOCIAL.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      rel="noreferrer noopener"
                      target="_blank"
                      className="text-[0.875rem] font-medium text-black transition-opacity hover:opacity-75"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Automatically stacks to TOP on Mobile, sits RIGHT on Desktop */}
          <div className="w-full max-w-[400px]">
            <h2 className="text-[1.125rem] font-medium text-black mb-4">
              What's new, straight to you
            </h2>
            <form
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@framer.com"
                className="w-full rounded-[8px] bg-black/[0.04] px-4 py-3 text-[0.875rem] text-black outline-none placeholder:text-black/40 focus:ring-2 focus:ring-black/10"
              />
              <button type="submit" className="w-full sm:w-auto shrink-0 rounded-[8px] bg-[#222] px-6 py-3 text-[0.875rem] font-medium text-white transition-colors hover:bg-black">
                {sent ? "Subscribed" : "Subscribe"}
              </button>
            </form>
            <p className="mt-4 text-[0.75rem] text-[#6B7280]">
              Includes the latest product updates, productivity tips, and insights.
            </p>
          </div>

        </div>
      </div>

      {/* Massive Faded Background Graphic */}
      <div className="absolute bottom-0 left-0 right-0 sm:relative sm:mt-16 md:mt-24 flex w-full justify-center overflow-hidden pointer-events-none select-none">
        <div
          className="flex items-center gap-4 md:gap-8 text-black opacity-[0.05]"
          style={{ maskImage: "linear-gradient(to bottom, black 0%, transparent 60%)", WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 60%)" }}
        >
          {/* Circular Accretion SVG */}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-[20vw] lg:h-[18vw] max-h-[300px] w-auto">
            <circle cx="12" cy="12" r="6" />
            <path d="M5.5 19.5L18.5 4.5" strokeLinecap="round" />
            <path d="M14 18c3-1 4-4 4-7" strokeLinecap="round" opacity="0.8" />
          </svg>

          <h1 className="text-[22vw] lg:text-[20vw] font-bold tracking-tighter leading-none whitespace-nowrap">
            Veriis
          </h1>
        </div>
      </div>

    </footer>
  );
}
