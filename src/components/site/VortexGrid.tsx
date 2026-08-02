"use client";

import React from "react";
import { AccretionSVG } from "./AccretionSVG";

export function VortexGrid() {
    return (
        <div
            className="absolute inset-0 w-full h-full z-10 pointer-events-none opacity-80"
            style={{
                // Radial opacity fade as requested natively here to fade out edges
                maskImage: 'radial-gradient(ellipse 90% 70% at 50% 67%, black 20%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.3) 80%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 67%, black 20%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.3) 80%, transparent 100%)'
            }}
        >
            <AccretionSVG />
        </div>
    );
}
