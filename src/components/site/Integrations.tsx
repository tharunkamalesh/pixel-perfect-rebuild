"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { INTEGRATION_GROUPS } from "./content";
import { SectionHeading } from "./Features";

/** Simple monogram tiles stand in for each partner logo. */
function ToolTile({ name }: { name: string }) {
  return (
    <li className="flex items-center gap-2 rounded-full border border-white/5 bg-[#121212] px-4 py-2.5 text-white/85 transition-colors duration-300 hover:border-white/20 hover:bg-white/5">
      <span className="flex h-5 w-5 items-center justify-center text-white/50">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      </span>
      <span className="text-[1rem] font-semibold">{name}</span>
    </li>
  );
}

export function Integrations() {
  return (
    <section id="integrations" className="section bg-[#0a0a0a] pt-32 lg:pt-48 pb-20 text-white">
      <div className="mx-auto w-full max-w-[1600px] lg:max-w-none px-6 lg:px-10 xl:px-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <h2 className="text-[40px] md:text-[56px] font-semibold tracking-tight text-white leading-tight">Integrations</h2>
          <div className="mt-6 flex items-center justify-center gap-3 text-[1.125rem] text-[#9CA3AF]">
            <div className="flex items-center gap-2 rounded-[8px] border border-white/10 bg-white/5 px-2.5 py-1 text-[1rem] font-semibold text-white">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 8v8M16 8v8M4 12h16" />
              </svg>
              17
            </div>
            <span>integrations and adding more <strong className="font-semibold text-white">every month</strong></span>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_320px_1fr] xl:grid-cols-[1fr_400px_1fr]">

          <motion.div
            className="flex flex-col gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: { opacity: 0, x: -40 },
              visible: {
                opacity: 1, x: 0,
                transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
              }
            }}
          >
            {INTEGRATION_GROUPS.slice(0, 2).map((group) => (
              <article
                key={group.category}
                className="relative flex min-h-[260px] flex-col rounded-[24px] border border-white/5 bg-[#0a0a0a] p-8"
              >
                <div className="absolute right-6 top-6 text-[1.125rem] font-semibold text-white/40">{group.tools.length}</div>
                <h3 className="text-[1.375rem] md:text-[1.5rem] font-semibold tracking-tight text-white">{group.category}</h3>
                <p className="mt-3 text-[1rem] leading-[1.6] text-[#A1A1A9]">
                  {group.body}
                </p>
                <div className="mt-8 mt-auto border-t border-white/5 pt-6">
                  <ul className="flex flex-wrap gap-2.5">
                    {group.tools.map((tool) => (
                      <ToolTile key={tool} name={tool} />
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </motion.div>

          <motion.article
            className="relative flex min-h-[400px] w-full items-center justify-center overflow-hidden rounded-[24px] border border-white/5 bg-[#0a0a0a]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: {
                opacity: 1, scale: 1,
                transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
              }
            }}
          >
            {/* Bottom Glows */}
            <div className="pointer-events-none absolute -bottom-[40%] left-1/2 aspect-square w-[150%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,100,0,0.25),rgba(200,40,0,0.1)_40%,transparent_60%)] blur-2xl" />
            <div className="pointer-events-none absolute bottom-0 left-1/2 h-[300px] w-[140%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(255,120,0,0.4),transparent_65%)] opacity-80 blur-xl" />
            <div className="pointer-events-none absolute bottom-0 left-1/2 h-[150px] w-[60%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(255,200,100,0.7),transparent_70%)] blur-lg" />

            {/* Card Logo with rising/floating animation inside the card */}
            <motion.div
              className="relative z-10 flex h-[160px] w-[160px] md:h-[180px] md:w-[180px] items-center justify-center rounded-[28px] md:rounded-[36px] bg-[#1a1a1a] shadow-[0_8px_40px_rgba(0,0,0,0.8)]"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white">
                <circle cx="12" cy="12" r="6" />
                <path d="M5.5 19.5L18.5 4.5" strokeLinecap="round" />
                <path d="M14 18c3-1 4-4 4-7" strokeLinecap="round" opacity="0.8" />
              </svg>
            </motion.div>
          </motion.article>

          <motion.div
            className="flex flex-col gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: { opacity: 0, x: 40 },
              visible: {
                opacity: 1, x: 0,
                transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
              }
            }}
          >
            {INTEGRATION_GROUPS.slice(2).map((group) => (
              <article
                key={group.category}
                className="relative flex min-h-[260px] flex-col rounded-[24px] border border-white/5 bg-[#0a0a0a] p-8"
              >
                <div className="absolute right-6 top-6 text-[1.125rem] font-semibold text-white/40">{group.tools.length}</div>
                <h3 className="text-[1.375rem] md:text-[1.5rem] font-semibold tracking-tight text-white">{group.category}</h3>
                <p className="mt-3 text-[1rem] leading-[1.6] text-[#A1A1A9]">
                  {group.body}
                </p>
                <div className="mt-8 mt-auto border-t border-white/5 pt-6">
                  <ul className="flex flex-wrap gap-2.5">
                    {group.tools.map((tool) => (
                      <ToolTile key={tool} name={tool} />
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </motion.div>

        </div>
      </div>
    </section >
  );
}
