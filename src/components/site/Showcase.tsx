"use client";

import { useState } from "react";
import { SHOWCASE_ITEMS } from "./content";
import { SectionHeading } from "./Features";

/** Tabbed showcase with autoplaying media, matching the original interaction. */
export function Showcase() {
  const [active, setActive] = useState(0);
  const current = SHOWCASE_ITEMS[active] ?? SHOWCASE_ITEMS[0];


  return (
    <section className="section pt-0">
      <div className="shell">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
          <div className="max-w-[32rem]">
            <h2 className="text-[clamp(2.75rem,5vw,4.25rem)] font-medium leading-[0.98] tracking-[-0.04em] text-white">
              Get more done, together,
              <br />
              anytime, anywhere
            </h2>
            <p className="mt-6 max-w-[28rem] text-[1.125rem] leading-[1.6] text-white/70">
              This is how we help you stay organized,
              <br />
              collaborate with your team.
            </p>
          </div>

          <div className="card-dark grid gap-6 p-4 md:mt-0 md:p-6">
          <div role="tablist" aria-label="Product highlights" className="flex flex-col gap-1.5">
            {SHOWCASE_ITEMS.map((item, i) => {
              const isActive = i === active;
              return (
                <button
                  key={item.title}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(i)}
                  className={`rounded-2xl border p-5 text-left transition-colors duration-300 ${
                    isActive
                      ? "border-white/10 bg-white/[0.06]"
                      : "border-transparent hover:bg-white/[0.03]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-colors ${
                        isActive ? "bg-[var(--brand)]" : "bg-white/25"
                      }`}
                    />
                    <span className="display-3 text-[1.0625rem] text-white">{item.title}</span>
                  </span>
                  <span
                    className={`mt-2 block overflow-hidden text-[0.9375rem] leading-relaxed text-white/55 transition-all duration-500 ${
                      isActive ? "max-h-32 opacity-100" : "max-h-0 opacity-0 md:max-h-0"
                    }`}
                  >
                    {item.body}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-black/25">
            <video
              key={current.video}
              src={current.video}
              autoPlay
              muted
              loop
              playsInline
              aria-label={current.title}
              className="h-full min-h-[260px] w-full object-cover"
            />
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
