"use client";

import { useState } from "react";
import { NAV_LINKS } from "./content";
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
    <footer className="pb-10">
      <div className="shell">
        <div className="grid gap-10 border-t border-line pt-14 md:grid-cols-[1.2fr_repeat(2,0.7fr)_1.4fr]">
          <div>
            <a href="#home" className="flex items-center gap-2.5 text-[1rem] font-medium">
              <LogoMark className="h-6 w-6 text-foreground" />
              Accretion
            </a>
            <p className="mt-4 max-w-[28ch] text-[0.875rem] leading-relaxed text-subtle">
              One connected place for tasks, projects and everything your team ships.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="text-[0.8125rem] font-medium text-foreground">Navigation</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[0.875rem] text-subtle transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Social links">
            <h2 className="text-[0.8125rem] font-medium text-foreground">Social</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    rel="noreferrer noopener"
                    target="_blank"
                    className="text-[0.875rem] text-subtle transition-colors hover:text-foreground"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[0.9375rem] font-medium text-foreground">
              What's new, straight to you
            </h2>
            <form
              className="mt-4 flex items-center gap-2 rounded-full border border-line bg-surface p-1.5"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="min-w-0 flex-1 bg-transparent px-3 text-[0.875rem] text-foreground outline-none placeholder:text-subtle"
              />
              <button type="submit" className="btn btn-primary px-4 py-2">
                {sent ? "Subscribed" : "Subscribe"}
              </button>
            </form>
            <p className="mt-3 text-[0.8125rem] text-subtle">
              Includes the latest product updates, productivity tips, and insights.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-[0.8125rem] text-subtle md:flex-row">
          <p>© 2025 Accretion. All rights reserved.</p>
          <p>
            Created by <span className="text-foreground">Kreativnik</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
