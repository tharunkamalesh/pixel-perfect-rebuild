"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "./content";
import { LogoMark } from "./LogoMark";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById("home");
      // Trigger minimization when scrolling near the bottom of the Hero section (where the Trusted ticker begins)
      const threshold = heroEl ? heroEl.offsetHeight - 150 : 600;
      setIsScrolled(window.scrollY > threshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-3 md:pt-5 pointer-events-none">
      <div className="shell">
        <nav
          aria-label="Main"
          className={`pointer-events-auto mx-auto flex flex-wrap items-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden rounded-[20px] shadow-sm ${isScrolled
            ? "max-w-[720px] justify-between md:justify-center gap-6 md:gap-8 bg-neutral-900/60 backdrop-blur-xl px-4 py-2 border border-white/5"
            : "w-full max-w-[980px] justify-between gap-6 bg-[#111111] px-4 py-3 md:px-[1.125rem]"
            }`}
        >
          <a
            href="#home"
            className="flex shrink-0 items-center gap-2.5 text-[1.25rem] font-semibold tracking-tight text-white hover:opacity-90"
          >
            <LogoMark className="h-[1.35rem] w-[1.35rem]" />
            <span
              className={`transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap overflow-hidden ${isScrolled ? "max-w-0 opacity-0" : "max-w-[120px] opacity-100"
                }`}
            >
              Veriis
            </span>
          </a>

          <ul className={`hidden items-center md:flex transition-all duration-300 ${isScrolled ? "gap-6" : "gap-8"}`}>
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
              className={`hidden rounded-[12px] bg-[#FF0000] text-[0.875rem] font-semibold text-white transition-all duration-200 hover:bg-[#CC0000] md:inline-flex shadow-[0_1px_2px_rgba(255,255,255,0.1)_inset] ${isScrolled ? "px-4 py-2" : "px-5 py-2.5"
                }`}
            >
              Get started
            </a>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 md:hidden pointer-events-auto"
            >
              {open ? <X className="h-[22px] w-[22px]" /> : <Menu className="h-[22px] w-[22px]" />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="card-dark pointer-events-auto mt-2 overflow-hidden p-2 md:hidden">
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
