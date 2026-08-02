"use client";

import React from "react";
import { VortexGrid } from "./VortexGrid";

export function HeroBackground() {
    return (
        <div className="absolute top-[0px] md:top-[0px] left-0 w-full h-[600px] md:h-[800px] pointer-events-none z-0 overflow-hidden">

            <div className="relative w-full h-full max-w-[1600px] md:max-w-[2400px] mx-auto flex justify-center items-center">

                <div
                    className="absolute top-[67%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[35%] bg-[#FCE5CB] blur-[100px] rounded-full opacity-[0.9]"
                />

                <VortexGrid />
            </div>
        </div>
    );
}
