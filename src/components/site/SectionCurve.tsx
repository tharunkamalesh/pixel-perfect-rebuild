"use client";

import { motion } from "framer-motion";

interface SectionCurveProps {
    flip?: boolean;
}

export function SectionCurve({ flip = false }: SectionCurveProps) {
    return (
        <div className="w-full overflow-hidden flex justify-center pointer-events-none select-none -mb-[1px]">
            <motion.img
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                src="https://framerusercontent.com/images/7JW5hiKTuIExiSp00XQILMZFt8.png?width=1920&height=676"
                alt="Glow Curve"
                // Using w-full and h-auto to ensure it scales perfectly across all viewports without breaking aspect ratio,
                // and optionally adding rotate-180 based on the 'flip' prop.
                className={`w-full h-auto ${flip ? "rotate-180" : ""
                    }`}
            />
        </div>
    );
}
