"use client";

import { DashboardMockup } from "./DashboardMockup";
import { HeroBackground } from "./HeroBackground";
import { motion, Easing } from "framer-motion";

export function Hero() {
  const customEase: Easing = [0.12, 0.23, 0.5, 1];

  const itemVariants = {
    hidden: { opacity: 0, scale: 1.2, y: -20 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  return (
    <section id="home" className="relative w-full min-h-[700px] bg-[#F8F6F1] flex flex-col items-center justify-center overflow-hidden pt-[120px] md:pt-[150px]">

      {/* Background Animated SVG Wrapper */}
      <HeroBackground />

      {/* Foreground Staggered Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 mt-8 flex flex-col items-center">

        <motion.div
          className="chip bg-white/50 border border-black/10 text-[#0A0A0A]"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.6, ease: customEase }}
        >
          <span className="chip-badge bg-[#FF4F00] text-white">NEW</span>
          <span>Now with brand new AI integration</span>
        </motion.div>

        <motion.h1
          className="display-1 mt-6 text-[#0A0A0A] leading-[1.1]"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.7, ease: customEase }}
        >
          All your work pulled <br className="hidden md:block" /> into one powerful place
        </motion.h1>

        <motion.p
          className="lede mt-5 max-w-2xl md:whitespace-nowrap text-[#525252]"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.8, ease: customEase }}
        >
          Organize tasks and projects in one connected, accessible platform.
        </motion.p>

        <motion.a
          href="#pricing"
          className="inline-flex mt-8 items-center justify-center bg-[#171717] text-white font-medium text-[15px] px-8 py-[14px] rounded-lg border border-black/10 hover:bg-[#262626] transition-colors shadow-sm"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.9, ease: customEase }}
        >
          Get started
        </motion.a>

      </div>

      <div className="mt-[180px] md:mt-[240px] w-full max-w-[1600px] px-4 md:px-8 relative z-10">
        <DashboardMockup />
      </div>
    </section>
  );
}
