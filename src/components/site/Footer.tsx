"use client";

import { useState } from "react";
import { NAV_LINKS, ASSETS } from "./content";
import { LogoMark } from "./LogoMark";

const SOCIAL = [
  { label: "Twitter", href: "https://twitter.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Instagram", href: "https://instagram.com" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer className="bg-[#F8F7F2] text-black">
      <div className="mx-auto w-full lg:max-w-none px-6 lg:px-12 xl:px-24">
        <div className="flex flex-col md:flex-row justify-between gap-12 border-t border-black/10 pt-16">

          <div className="flex gap-16 md:gap-32 xl:gap-40">
            <nav aria-label="Footer navigation">
              <h2 className="text-[0.75rem] text-[#6B7280] mb-6">Navigation</h2>
              <ul className="flex flex-col gap-4">
                {NAV_LINKS.map((link) => (
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

            <nav aria-label="Social links">
              <h2 className="text-[0.75rem] text-[#6B7280] mb-6">Social</h2>
              <ul className="flex flex-col gap-4">
                {SOCIAL.map((s) => (
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

          <div className="w-full max-w-[400px]">
            <h2 className="text-[1.125rem] font-medium text-black mb-4">
              What's new, straight to you
            </h2>
            <form
              className="flex items-center gap-3"
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
                className="w-full flex-1 rounded-[8px] bg-black/5 px-4 py-2.5 text-[0.875rem] text-black outline-none placeholder:text-black/40 focus:ring-2 focus:ring-black/10"
              />
              <button type="submit" className="rounded-[8px] bg-[#222] px-6 py-2.5 text-[0.875rem] font-medium text-white transition-colors hover:bg-black">
                {sent ? "Subscribed" : "Subscribe"}
              </button>
            </form>
            <p className="mt-4 text-[0.75rem] text-[#6B7280]">
              Includes the latest product updates, productivity tips, and insights.
            </p>
          </div>

        </div>
      </div>

      {/* Huge Faded Logo Strip */}
      <div className="w-full mt-24 mb-0 flex justify-center pointer-events-none select-none">
        <img
          src={ASSETS.logoStrip}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="w-full max-w-[1920px] h-auto object-cover"
        />
      </div>
    </footer>
  );
}
