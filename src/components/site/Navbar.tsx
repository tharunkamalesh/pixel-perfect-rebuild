"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "./content";
import { LogoMark } from "./LogoMark";

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-3 md:pt-5">
      <div className="shell">
        <nav
          aria-label="Main"
          className="flex items-center justify-between gap-6 rounded-[20px] bg-[#161616] px-4 py-3 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)] md:px-6"
        >
          <a
            href="#home"
            className="flex items-center gap-2.5 text-[1.0625rem] font-medium tracking-[-0.02em] text-white"
          >
            <LogoMark className="h-6 w-6" />
            <span>Accretion</span>
          </a>

          <ul className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[0.9375rem] text-white/85 transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#pricing"
              className="hidden rounded-[14px] bg-[var(--brand)] px-5 py-3 text-[0.9375rem] font-medium text-white transition-colors duration-200 hover:bg-[var(--brand-bright)] md:inline-flex"
            >
              Get started
            </a>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:bg-white/10 md:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="card-dark mt-2 overflow-hidden p-2 md:hidden">
            <ul className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 text-[0.9375rem] text-white/75 transition-colors hover:bg-white/5 hover:text-ink-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#pricing"
              onClick={() => setOpen(false)}
              className="btn btn-onDark mt-2 w-full"
            >
              Get started
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
