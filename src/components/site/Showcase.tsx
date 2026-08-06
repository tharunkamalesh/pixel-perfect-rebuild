"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SHOWCASE_ITEMS } from "./content";

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
        <div className="grid items-center lg:grid-cols-[1fr_1.6fr] lg:gap-16 xl:gap-20">
          <div className="w-full pl-0">
            <h2 className="text-[2.5rem] lg:text-[3.25rem] font-semibold leading-[1.05] tracking-[-0.04em] text-white">
              See Veriis In Action
            </h2>
            <p className="mt-5 text-[1.125rem] leading-[1.5] text-[#9CA3AF]">
              Watch how Veriis extracts structured information from identity documents and resumes in real time—from upload to structured output.
            </p>
            <div role="tablist" aria-label="Product highlights" className="mt-16 lg:mt-28 flex flex-col">
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
                          className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#FF6B00] to-[#FF8C33] shadow-[0_0_8px_rgba(255,107,0,0.6)]"
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
                        className={`block text-[1.25rem] font-semibold tracking-tight transition-colors ${isActive ? "text-white" : "text-white/40 group-hover:text-white/60"
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

                    {/* Inline Video Rendering (Mobile/Tablet Only) - Placed directly under the active tab description */}
                    <div
                      className={`overflow-hidden transition-all duration-500 lg:hidden ${isActive ? "max-h-[500px] opacity-100 mb-8" : "max-h-0 opacity-0 mb-0 pointer-events-none"
                        }`}
                    >
                      <div className="relative flex h-[280px] sm:h-[400px] w-full overflow-hidden rounded-[24px] bg-[#f8f6f1] shadow-xl">
                        {isActive && (
                          <video
                            key={item.video}
                            src={item.video}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="h-full w-full object-contain"
                          />
                        )}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* Persistent Independent Video Block (Desktop Only) */}
          <div className="hidden lg:flex relative h-[650px] xl:h-[750px] w-full overflow-hidden rounded-[32px] bg-[#f8f6f1] shadow-2xl">
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
