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
          className="flex items-center justify-between gap-6 rounded-[20px] bg-[#111111] px-4 py-3 md:px-[1.125rem] shadow-sm"
        >
          <a
            href="#home"
            className="flex items-center gap-2.5 text-[1.25rem] font-semibold tracking-tight text-white hover:opacity-90"
          >
            <LogoMark className="h-[1.35rem] w-[1.35rem]" />
            <span>Accretion</span>
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[0.875rem] font-medium text-white hover:text-white/80 transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#pricing"
              className="hidden rounded-[12px] bg-[#FF5500] px-5 py-2.5 text-[0.875rem] font-semibold text-white transition-colors duration-200 hover:bg-[#E64D00] md:inline-flex shadow-[0_1px_2px_rgba(255,255,255,0.1)_inset]"
            >
              Get started
            </a>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 md:hidden"
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
