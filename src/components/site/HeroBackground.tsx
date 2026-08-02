"use client";

import React from "react";
import { AccretionSVG } from "./AccretionSVG";

export function HeroBackground() {
    return (
        <div className="absolute top-[200px] md:top-[250px] left-0 w-full h-[600px] md:h-[800px] pointer-events-none z-0 overflow-hidden"
            style={{
                /* Smooth but strong fade matching the reference */
                maskImage: 'radial-gradient(ellipse 90% 70% at 50% 55%, black 20%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.3) 80%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 55%, black 20%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.3) 80%, transparent 100%)'
            }}>

            <div className="relative w-full h-full max-w-[1600px] md:max-w-[2400px] mx-auto flex justify-center items-center">

                {/* Prominent warm glowing center ellipse */}
                <div
                    className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45%] h-[40%] bg-[#F2C089] blur-[90px] rounded-full opacity-[0.5]"
                />

                <AccretionSVG />
            </div>
        </div>
    );
}
