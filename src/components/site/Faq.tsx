"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { FAQS } from "./content";
import { SectionHeading } from "./Features";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section bg-[#0a0a0a] py-20 lg:py-32">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12 xl:px-16">

        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">

          {/* Left Column (Headers) */}
          <div>
            <h2 className="text-[2.25rem] sm:text-[3rem] font-semibold leading-[1.1] tracking-tight text-white lg:text-[3.5rem] xl:whitespace-nowrap">
              Frequently asked questions
            </h2>
            <p className="mt-6 text-[1.125rem] leading-relaxed text-[#9CA3AF]">
              Get answers to commonly asked questions.
            </p>
          </div>

          {/* Right Column (Accordion List) */}
          <div className="flex flex-col gap-4">
            {FAQS.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-[16px] border border-white/5 bg-[#0a0a0a] transition-colors hover:bg-white/[0.03]"
                >
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 p-6 text-left"
                    >
                      <span className="text-[1rem] font-medium text-white">
                        {faq.question}
                      </span>
                      <span className="flex shrink-0 items-center justify-center text-white/50 transition-transform duration-300" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                        <Plus className="h-5 w-5" />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    hidden={!isOpen}
                    className="px-6 pb-6 text-[0.9375rem] leading-[1.6] text-[#A1A1A9]"
                  >
                    {faq.answer}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
