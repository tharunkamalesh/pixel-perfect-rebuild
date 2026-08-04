"use client";

import { motion } from "framer-motion";

export function HeroGlow() {
    return (
        <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-1/2 w-[140%] max-w-[1400px] h-[220px] -translate-x-1/2 translate-y-[30%] -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
                background: "radial-gradient(ellipse at top, #FF0000 0%, #A30000 45%, #000000 80%, transparent 100%)",
                filter: "blur(40px)",
                borderRadius: "50% 50% 0 0 / 100% 100% 0 0"
            }}
        />
    );
}
