"use client";

import { DashboardMockup } from "./DashboardMockup";
import { motion, Easing } from "framer-motion";
import { VortexGrid } from "./VortexGrid";

export function Hero() {
  const customEase: Easing = [0.12, 0.23, 0.5, 1];

  const itemVariants = {
    hidden: { opacity: 0, scale: 1.2, y: -20 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };
  return (
    <section id="home" className="relative w-full min-h-[700px] bg-[#F8F5EE] flex flex-col items-center justify-center overflow-hidden pt-[120px] md:pt-[150px]">

      {/* Elegantly subtle edge haze - incredibly faint per request */}
      <div
        className="absolute top-[40%] left-[-20%] w-[1000px] h-[1000px] blur-[250px] pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle at left center, rgba(245,193,84,0.06), transparent 70%)' }}
      />
      <div
        className="absolute top-[40%] right-[-20%] w-[1000px] h-[1000px] blur-[250px] pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle at right center, rgba(245,193,84,0.06), transparent 70%)' }}
      />

      {/* Foreground Staggered Content */}
      <div className="relative z-10 text-center w-full max-w-[1200px] mx-auto px-4 mt-8 flex flex-col items-center">

        <motion.div
          className="flex items-center gap-2 md:gap-3 rounded-full border border-black/10 bg-transparent pl-1.5 pr-4 md:pr-5 py-1.5"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.6, ease: customEase }}
        >
          <span className="flex shrink-0 items-center justify-center rounded-[20px] bg-[#FF0000] px-2.5 md:px-3 py-1 text-[0.625rem] font-bold uppercase tracking-wider text-white">
            NEW
          </span>
          <span className="text-[0.75rem] md:text-[0.875rem] font-medium text-[#3b3b3b] tracking-tight whitespace-nowrap">
            Enterprise AI Document Intelligence
          </span>
        </motion.div>

        <motion.h1
          className="mt-6 font-semibold text-[#0A0A0A] text-[2.75rem] sm:text-[3rem] md:text-[4.25rem] lg:text-[4.75rem] leading-[1.05] tracking-tight w-full max-w-[1100px] mx-auto"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.7, ease: customEase }}
        >
          Transform Identity Documents Into Structured Data With AI
        </motion.h1>

        <motion.p
          className="mt-5 max-w-[960px] text-[1.0625rem] md:text-[1.25rem] leading-[1.45] text-[#525252]"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.8, ease: customEase }}
        >
          Extract accurate, structured data from passports, IDs, driver's licenses, and resumes—securely, instantly, and at enterprise scale.
        </motion.p>

        <motion.a
          href="#pricing"
          className="relative z-10 inline-flex mt-[40px] md:mt-[48px] items-center justify-center bg-[#171717] text-white font-medium text-[15px] px-8 py-[14px] rounded-lg border border-black/10 hover:bg-[#262626] transition-colors shadow-sm"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.9, ease: customEase }}
        >
          Get Started
        </motion.a>

      </div>

      <div className="w-full flex justify-center pointer-events-none mt-[-180px] sm:mt-[-120px] lg:mt-[-90px] relative z-0">
        {/* Exact minimal funnel core glow utilizing user-provided tight stops */}
        <div className="absolute top-[50%] lg:top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[700px] pointer-events-none -z-10 flex items-center justify-center">
          <div
            className="w-full h-full blur-[100px]"
            style={{
              background: 'radial-gradient(ellipse 650px 325px at 50% 65%, rgba(255,250,240,0.95) 0%, rgba(245,193,84,0.18) 40%, rgba(245,193,84,0.06) 70%, transparent 100%)'
            }}
          />
        </div>
        <VortexGrid />
      </div>

      <div className="mt-[20px] md:mt-[40px] lg:mt-[50px] xl:mt-[60px] w-full max-w-[1600px] px-3 md:px-8 relative z-10">
        <DashboardMockup />
      </div>
    </section>
  );
}
