"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { ASSETS } from "./content";
import { SectionCurve } from "./SectionCurve";

function SectionHeading({
  eyebrow,
  title,
  body,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto flex max-w-2xl flex-col items-center text-center"
          : "flex max-w-2xl flex-col"
      }
    >
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="display-2 font-bold tracking-tight">{title}</h2>
      {body && <p className="lede mt-4">{body}</p>}
    </div>
  );
}

export { SectionHeading };



export function Features() {
  const containerRef = useRef<HTMLElement>(null);
  const phoneCardRef = useRef<HTMLDivElement>(null);

  // Track scroll progress purely when this specific section is in viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  // Map scroll progress so the horizon rises gently from 120px up to 0px and expands
  const y = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const scaleY = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  // Specifically track the exact view frame of the phone card for aggressive parallax
  const { scrollYProgress: phoneScroll } = useScroll({
    target: phoneCardRef,
    offset: ["start end", "end start"]
  });
  const phoneY = useTransform(phoneScroll, [0, 1], [250, -100]);

  return (
    <section ref={containerRef} id="features" className="section dark relative bg-transparent text-foreground pt-[220px] sm:pt-[240px] md:pt-[200px] lg:pt-[240px] z-0 overflow-visible">

      {/* 
        Unified Scroll-Driven Background Wrapper
        Translates Y together so the solid black fill perfectly trails the arch image across all aspect ratios.
      */}
      <motion.div
        className="pointer-events-none absolute top-[-120px] md:top-[-160px] lg:top-[-180px] left-0 right-0 bottom-[-1000px] -z-20 flex flex-col"
        style={{ y }}
      >
        <motion.div
          className="w-full max-w-[1520px] mx-auto flex shrink-0 justify-center"
          style={{ scaleY, transformOrigin: "bottom" }}
        >
          <img
            src="https://framerusercontent.com/images/7JW5hiKTuIExiSp00XQILMZFt8.png?width=1920&height=676"
            alt="Glowing Horizon"
            className="w-full h-auto"
          />
        </motion.div>

        {/* Solid fill explicitly locked directly underneath the bottom edge of the image seamlessly, regardless of scaled height */}
        <div className="w-full bg-[#0a0a0a] flex-grow -mt-[1px]"></div>
      </motion.div>

      <div className="relative z-20 mx-auto w-full lg:max-w-none px-6 lg:px-10 xl:px-16 2xl:px-20 pt-0 lg:pt-16">

        <div className="mb-16 text-white [&_.lede]:text-white/80">
          <SectionHeading
            title="Everything You Need For Enterprise Document Processing"
            body="From AI extraction to structured output, Veriis simplifies document workflows securely, accurately, and at enterprise scale."
            align="center"
          />
        </div>
        <div className="mx-auto flex w-full flex-col gap-6 lg:grid lg:grid-cols-4">

          {/* Card 1: Mobile App (Left) */}
          <div ref={phoneCardRef} className="lg:col-span-2 lg:row-span-2 relative flex min-h-[500px] flex-col overflow-hidden rounded-[24px] border border-white/5 bg-[#0a0a0a] p-8 pb-5 lg:p-10 lg:pb-6">
            <div className="relative z-10 w-full max-w-lg shrink-0">
              <h3 className="text-[1.5rem] font-semibold tracking-tight text-white md:text-[1.75rem]">
                Intelligent Document Processing
              </h3>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-[#A1A1A9]">
                Automatically understand passports, national IDs, driver's licenses, and resumes—even from low-quality scans.
              </p>
            </div>

            {/* Normal flow wrapper ensures card cleanly wraps image + 20px padding */}
            <div className="relative w-full mt-6 md:mt-8 flex justify-center pointer-events-none mt-auto">
              <motion.div
                style={{ y: phoneY }}
                className="w-[180%] sm:w-[150%] md:w-[140%] lg:w-[160%] max-w-[1000px] flex justify-center"
              >
                <img
                  src={ASSETS.mobileApp}
                  alt="Mobile App Interface"
                  className="w-full h-auto object-contain opacity-100"
                />
              </motion.div>
            </div>
          </div>

          {/* Card 2: Performance (Middle Top) */}
          <div className="lg:col-span-1 lg:row-span-1 relative flex min-h-[250px] flex-col justify-end overflow-hidden rounded-[24px] border border-white/5 bg-[#0a0a0a] p-8 pt-[200px] group">
            <div className="absolute left-0 top-0 w-full h-[220px] flex items-start justify-center overflow-hidden">
              <img
                src={ASSETS.converging}
                alt="Performance scale lines"
                className="w-full h-full object-cover object-top opacity-100 transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-1">
              <h3 className="text-[1.25rem] font-semibold text-white tracking-tight">
                Performance that scales with you
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-[1.6] text-[#A1A1A9]">
                Whether you're a 3-person startup or a growing enterprise.
              </p>
            </div>
          </div>

          {/* Card 4: Smart Automation (Right Box - AI Pipeline) */}
          <div className="lg:col-span-1 lg:row-span-2 relative flex min-h-[500px] flex-col justify-end overflow-hidden rounded-[24px] bg-gradient-to-br from-[#FF0000] to-[#800000] p-8 lg:p-10">
            {/* Visual Flow diagram */}
            <div className="absolute top-12 left-1/2 flex -translate-x-1/2 flex-col gap-[1.1rem] w-full max-w-[280px]">
              {["Upload Document", "Detect Document Type", "Extract Fields", "Validate Data", "Export Structured JSON"].map((step, i) => (
                <div
                  key={i}
                  className="relative z-10 flex w-[90%] items-center gap-3.5 rounded-full bg-black/40 px-3.5 py-3 shadow-md border border-white/5 mx-auto"
                >
                  <div className="relative z-10 flex h-[20px] w-[20px] shrink-0 items-center justify-center">
                    {/* Dotted Spinner Layer */}
                    <div
                      className="absolute inset-0 flex items-center justify-center text-white/50"
                      style={{
                        animation: `spinHide 6s infinite`,
                        animationDelay: `${i * 1.5}s`,
                        animationFillMode: "both"
                      }}
                    >
                      <svg className="animate-[spin_3s_linear_infinite] h-full w-full" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 6" />
                      </svg>
                    </div>

                    {/* Solid Checkmark Layer */}
                    <span
                      className="absolute inset-0 flex items-center justify-center rounded-full bg-white text-black"
                      style={{
                        animation: `tickPop 6s infinite`,
                        animationDelay: `${i * 1.5}s`,
                        opacity: 0,
                        animationFillMode: "both"
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                  </div>
                  <span className="text-[0.8rem] font-medium text-white shadow-sm">{step}</span>

                  {/* Connector line */}
                  {i !== 4 && (
                    <div className="absolute top-[20px] left-[23.5px] h-[34px] w-[1px] bg-white/30" />
                  )}
                </div>
              ))}
            </div>

            <style>{`
              @keyframes tickPop {
                0%, 5% { opacity: 0; transform: scale(0.2) rotate(-30deg); }
                15%, 85% { opacity: 1; transform: scale(1) rotate(0deg); }
                95%, 100% { opacity: 0; transform: scale(0.2) rotate(30deg); }
              }
              @keyframes spinHide {
                0%, 5% { opacity: 1; }
                15%, 85% { opacity: 0; }
                95%, 100% { opacity: 1; }
              }
            `}</style>

            <div className="relative z-10 mt-auto pt-48">
              <h3 className="text-[1.5rem] font-semibold tracking-tight text-white md:text-[1.75rem]">
                AI Processing Pipeline
              </h3>
              <p className="mt-2 text-[1rem] leading-[1.65] text-white/90">
                A streamlined workflow processing intelligent extraction from upload to developer-ready JSON.
              </p>
            </div>
          </div>

          {/* Card 3: JSON Output (Middle Bottom) - Appears last on mobile */}
          <div className="lg:col-span-1 lg:row-span-1 relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-[24px] border border-white/5 bg-[#0a0a0a] p-8 pt-[240px]">
            <div className="absolute left-0 top-0 w-full h-[260px] flex items-center justify-center">
              <img src={ASSETS.collaboration} alt="" className="h-full w-full object-cover object-top opacity-90" />
            </div>
            <div className="relative z-10">
              <h3 className="text-[1.25rem] font-semibold text-white">
                Structured JSON Output
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-[1.6] text-[#A1A1A9]">
                Receive clean, developer-ready structured data through APIs.
              </p>
            </div>
          </div>

        </div>

        {/* 4 Mini Features Row (Staggered animation - 2x2 Mobile, 4x1 Desktop) */}
        <motion.div
          className="mt-16 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-8 lg:mt-24 lg:grid-cols-4 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } }
          }}
        >
          {/* Item 1 */}
          <motion.div
            className="flex flex-col items-start"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
            }}
          >
            <div
              className="flex h-[56px] w-[56px] md:h-[64px] md:w-[64px] items-center justify-center rounded-[16px] border border-white/10 mb-6 text-[#FF6B00] shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
              style={{ background: 'radial-gradient(circle at center, rgba(255,107,0,0.2) 0%, rgba(26,26,26,1) 65%)' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
            </div>
            <h4 className="text-[1.125rem] font-semibold tracking-tight text-white">Custom workflows</h4>
            <p className="mt-3 text-[0.9375rem] leading-[1.6] text-[#A1A1A9]">Tailored to match your team's unique process with ease.</p>
          </motion.div>

          {/* Item 2 */}
          <motion.div
            className="flex flex-col items-start"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
            }}
          >
            <div
              className="flex h-[56px] w-[56px] md:h-[64px] md:w-[64px] items-center justify-center rounded-[16px] border border-white/10 mb-6 text-[#FF6B00] shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
              style={{ background: 'radial-gradient(circle at center, rgba(255,107,0,0.2) 0%, rgba(26,26,26,1) 65%)' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <h4 className="text-[1.125rem] font-semibold tracking-tight text-white">Clear insights</h4>
            <p className="mt-3 text-[0.9375rem] leading-[1.6] text-[#A1A1A9]">Intuitive dashboards and analytics to help you track progress and make informed decisions.</p>
          </motion.div>

          {/* Item 3 */}
          <motion.div
            className="flex flex-col items-start"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
            }}
          >
            <div
              className="flex h-[56px] w-[56px] md:h-[64px] md:w-[64px] items-center justify-center rounded-[16px] border border-white/10 mb-6 text-[#FF6B00] shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
              style={{ background: 'radial-gradient(circle at center, rgba(255,107,0,0.2) 0%, rgba(26,26,26,1) 65%)' }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="15" r="5.5" />
                <circle cx="14" cy="10" r="5.5" />
              </svg>
            </div>
            <h4 className="text-[1.125rem] font-semibold tracking-tight text-white">Tool integrations</h4>
            <p className="mt-3 text-[0.9375rem] leading-[1.6] text-[#A1A1A9]">Seamlessly connects with popular apps (e.g. Slack, Zoom, Mailchimp).</p>
          </motion.div>

          {/* Item 4 */}
          <motion.div
            className="flex flex-col items-start"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
            }}
          >
            <div
              className="flex h-[56px] w-[56px] md:h-[64px] md:w-[64px] items-center justify-center rounded-[16px] border border-white/10 mb-6 text-[#FF6B00] shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
              style={{ background: 'radial-gradient(circle at center, rgba(255,107,0,0.2) 0%, rgba(26,26,26,1) 65%)' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8V5a2 2 0 0 1 2-2h3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M21 16v3a2 2 0 0 1-2 2h-3" />
              </svg>
            </div>
            <h4 className="text-[1.125rem] font-semibold tracking-tight text-white">Adaptable & scalable</h4>
            <p className="mt-3 text-[0.9375rem] leading-[1.6] text-[#A1A1A9]">Designed for teams of all sizes with customization options to match your workflow.</p>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
