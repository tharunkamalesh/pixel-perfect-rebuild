"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SHOWCASE_ITEMS } from "./content";
import { SectionHeading } from "./Features";

/** Tabbed showcase with autoplaying media, matching the original interaction. */
export function Showcase() {
  const [active, setActive] = useState(0);
  const current = SHOWCASE_ITEMS[active] ?? SHOWCASE_ITEMS[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % SHOWCASE_ITEMS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section relative z-10 bg-[#0a0a0a]">
      <div className="mx-auto w-full max-w-[1536px] px-6 lg:px-12 xl:px-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16 xl:gap-20">
          <div className="w-full pl-0">
            <h2 className="text-[2.5rem] lg:text-[3.25rem] font-semibold leading-[1.05] tracking-[-0.04em] text-white">
              Get more done, together,
              <br />
              anytime, anywhere
            </h2>
            <p className="mt-5 text-[1.125rem] leading-[1.5] text-[#9CA3AF]">
              This is how we help you stay organized,
              <br />
              collaborate with your team.
            </p>
            <div role="tablist" aria-label="Product highlights" className="mt-28 flex flex-col">
              {SHOWCASE_ITEMS.map((item, i) => {
                const isActive = i === active;
                return (
                  <div key={item.title} className="flex flex-col">
                    <div className="relative h-[1px] w-full bg-white/10">
                      {isActive && (
                        <motion.div
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 6, ease: "linear" }}
                          className="absolute left-0 top-0 h-full bg-gradient-to-r from-orange-500 to-yellow-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]"
                        />
                      )}
                    </div>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActive(i)}
                      className="group w-full py-6 text-left transition-colors"
                    >
                      <span
                        className={`block text-[1.25rem] font-semibold transition-colors ${isActive ? "text-white" : "text-white/40 group-hover:text-white/60"
                          }`}
                      >
                        {item.title}
                      </span>
                      <span
                        className={`block overflow-hidden text-[1rem] leading-relaxed text-[#9CA3AF] transition-all duration-500 ${isActive ? "mt-3 max-h-40 opacity-100" : "max-h-0 opacity-0"
                          }`}
                      >
                        {item.body}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative flex h-[500px] w-full overflow-hidden rounded-[32px] bg-[#f8f6f1] lg:h-[650px] xl:h-[750px] shadow-2xl">
            <video
              key={current.video}
              src={current.video}
              autoPlay
              muted
              loop
              playsInline
              aria-label={current.title}
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
