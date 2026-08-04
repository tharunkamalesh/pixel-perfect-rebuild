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
    <header className="fixed inset-x-0 top-0 z-50 pt-3 md:pt-5 px-4 pointer-events-none">
      <div className={`mx-auto w-full max-w-[1536px] flex transition-[justify-content] duration-300 ${isScrolled ? "justify-end md:justify-center" : "justify-center"}`}>
        <nav
          aria-label="Main"
          className={`pointer-events-auto flex items-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden rounded-[20px] shadow-sm ${isScrolled
            ? "w-fit gap-3 md:gap-8 bg-[#111111] md:bg-neutral-900/60 md:backdrop-blur-xl px-2.5 py-2 md:px-4 border border-white/5"
            : "w-full max-w-[980px] justify-between gap-6 bg-[#111111] px-4 py-3 md:px-[1.125rem]"
            }`}
        >
          <a
            href="#home"
            className="flex items-center gap-2.5 text-[1.25rem] font-semibold tracking-tight text-white hover:opacity-90 pl-1 md:pl-0"
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

          <div className="flex items-center">
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
              className="inline-flex h-[40px] w-[40px] md:h-[44px] md:w-[44px] items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 md:hidden pointer-events-auto"
            >
              {open ? <X className="h-[20px] w-[20px]" /> : <Menu className="h-[20px] w-[20px]" />}
            </button>
          </div>
        </nav>
      </div>

      {open && (
        <>
          {/* Invisible backdrop strictly for dismissing the menu without dimming the page */}
          <div className="fixed inset-0 z-50 pointer-events-auto md:hidden" onClick={() => setOpen(false)} />

          {/* The Floating Overlay Menu Card - Compact */}
          <div className="fixed inset-x-2 top-2 z-[60] flex flex-col rounded-[20px] bg-[#141414] p-5 shadow-[0_20px_40px_rgba(0,0,0,0.6)] pointer-events-auto md:hidden overflow-hidden border border-white/5">

            {/* Header: Logo and Close Button */}
            <div className="flex items-center justify-between mb-6">
              <a href="#home" className="flex items-center gap-2.5 text-white" onClick={() => setOpen(false)}>
                <LogoMark className="h-[1.35rem] w-[1.35rem]" />
                <span className="text-[1.125rem] font-bold tracking-tight text-white">Veriis</span>
              </a>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition-colors hover:text-white hover:bg-white/10"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Centered Navigation Links - Strictly Limited to 5 Links */}
            <ul className="flex flex-col gap-5 text-center">
              {[
                { label: "Features", href: "#features" },
                { label: "Integrations", href: "#" },
                { label: "Testimonials", href: "#testimonials" },
                { label: "FAQ", href: "#faq" }
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block text-[1rem] font-medium text-white transition-colors hover:text-white/70"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Bottom CTA */}
            <a
              href="#pricing"
              onClick={() => setOpen(false)}
              className="mt-8 w-full rounded-[10px] bg-[#FF5500] py-3 text-center text-[0.9375rem] font-semibold text-white shadow-[0_4px_14px_rgba(255,85,0,0.3)] transition-colors hover:bg-[#E64A00]"
            >
              Get started
            </a>
          </div>
        </>
      )}
    </header>
  );
}
