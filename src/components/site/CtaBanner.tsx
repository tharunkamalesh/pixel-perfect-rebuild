"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/** Closing call-to-action banner. */
export function CtaBanner() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  // Simply stretch downwards. The flat base stays firmly glued to the top boundary.
  const scaleY = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <section ref={containerRef} className="bg-[#F8F7F2] pt-[280px] md:pt-[360px] pb-24 lg:pb-32 relative overflow-visible z-0">

      {/* Inverted dripping horizon */}
      <motion.div className="pointer-events-none absolute top-[-1px] left-0 right-0 z-0 flex justify-center">
        <motion.div
          className="w-full max-w-[1520px] flex justify-center"
          style={{ scaleY, transformOrigin: "top" }}
        >
          <img
            src="https://framerusercontent.com/images/7JW5hiKTuIExiSp00XQILMZFt8.png?width=1920&height=676"
            className="w-full h-[320px] rotate-180"
            alt=""
          />
        </motion.div>
      </motion.div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center px-6">
        <h2 className="text-[2.5rem] font-semibold tracking-tight text-black md:text-[3.5rem] whitespace-nowrap">
          Pull your team in with Accretion
        </h2>
        <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-[#71717A] md:text-[1.125rem]">
          Your team's next big win starts here. Try Accretion and experience simpler, smarter task management built for growth.
        </p>
        <button className="mt-8 rounded-[12px] bg-[#141414] px-8 py-3.5 text-[0.9375rem] font-medium text-white shadow-md transition-all hover:bg-black hover:shadow-lg">
          Get started
        </button>
      </div>
    </section>
  );
}
