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
    <section id="home" className="relative w-full min-h-[700px] bg-[#F7F1E5] flex flex-col items-center justify-center overflow-hidden pt-[120px] md:pt-[150px]">

      {/* Upper Canvas Background Gradient (#FAF6EE to #F7F1E5) */}
      <div
        className="absolute top-0 inset-x-0 h-[650px] pointer-events-none z-0"
        style={{
          background: "linear-gradient(to bottom, #FAF6EE 0%, rgba(250, 246, 238, 0) 100%)"
        }}
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
          className="mt-5 md:mt-6 font-semibold text-[#0A0A0A] text-[2.40rem] sm:text-[3rem] md:text-[4.25rem] lg:text-[4.75rem] leading-[1.1] md:leading-[1.05] tracking-tight w-full max-w-[1100px] mx-auto px-1"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.7, ease: customEase }}
        >
          Transform Identity Documents Into Structured Data With AI
        </motion.h1>

        <motion.p
          className="mt-3 md:mt-5 max-w-[960px] text-[1rem] md:text-[1.25rem] leading-[1.45] text-[#525252]"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.8, ease: customEase }}
        >
          Extract accurate, structured data from passports, IDs, driver's licenses, and resumes—securely, instantly, and at enterprise scale.
        </motion.p>

        <motion.a
          href="#pricing"
          className="relative z-10 inline-flex mt-[28px] md:mt-[48px] items-center justify-center bg-[#171717] text-white font-medium text-[15px] px-8 py-[14px] rounded-lg border border-black/10 hover:bg-[#262626] transition-colors shadow-sm"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.9, ease: customEase }}
        >
          Get Started
        </motion.a>

      </div>

      {/* 
        Slightly lifted the entire grid visually upwards on mobile using translate 
        so the glowing hole slips safely out from behind the dashboard mockup! 
      */}
      <div className="w-full flex justify-center pointer-events-none mt-[-100px] sm:mt-[-120px] lg:mt-[-90px] max-md:-translate-y-[60px] md:-translate-y-[90px] relative z-0">
        <VortexGrid />
      </div>

      <div className="mt-[5px] md:mt-[15px] lg:mt-[20px] xl:mt-[30px] w-full max-w-[1600px] px-3 md:px-8 relative z-10">
        <DashboardMockup />
      </div>
    </section>
  );
}
