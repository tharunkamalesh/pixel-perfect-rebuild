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
          className="card-dark flex items-center justify-between gap-6 rounded-2xl px-3 py-2.5 backdrop-blur-md md:px-4"
          style={{ backgroundColor: "color-mix(in oklab, var(--ink) 88%, transparent)" }}
        >
          <a
            href="#home"
            className="flex items-center gap-2.5 pl-1 text-[0.9375rem] font-medium tracking-[-0.01em] text-ink-foreground"
          >
            <LogoMark className="h-6 w-6" />
            <span>Accretion</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-3 py-2 text-[0.875rem] text-white/65 transition-colors duration-200 hover:text-ink-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a href="#pricing" className="btn btn-onDark hidden md:inline-flex">
              Get started
            </a>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ink-foreground transition-colors hover:bg-white/10 md:hidden"
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
