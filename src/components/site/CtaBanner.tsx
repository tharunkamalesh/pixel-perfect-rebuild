import { ArrowRight } from "lucide-react";
import { ASSETS } from "./content";

/** Closing call-to-action banner. */
export function CtaBanner() {
  return (
    <section className="bg-[#F8F7F2] py-24 lg:py-32 relative overflow-hidden">
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
