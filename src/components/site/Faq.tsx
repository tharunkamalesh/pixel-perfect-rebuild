"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { FAQS } from "./content";
import { SectionHeading } from "./Features";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section pt-0">
      <div className="shell">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          body="Get answers to commonly asked questions."
        />

        <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-3">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.question} className="card overflow-hidden px-6">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-[1rem] font-medium tracking-[-0.01em]">
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line transition-transform duration-300 ${
                        isOpen ? "rotate-45 border-transparent bg-brand text-ink-foreground" : ""
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  hidden={!isOpen}
                  className="pb-5 text-[0.9375rem] leading-relaxed text-body"
                >
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
