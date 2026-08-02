import { ArrowRight } from "lucide-react";
import { ASSETS } from "./content";
import { DashboardMockup } from "./DashboardMockup";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-16 md:pt-44 md:pb-24">
      {/* soft warm glow behind the headline */}
      <div
        aria-hidden="true"
        className="grain-glow pointer-events-none absolute inset-x-0 top-0 h-[620px] opacity-80"
      />


      <div className="shell relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="chip animate-rise-1">
            <span className="chip-badge">NEW</span>
            <span>Now with brand new AI integration</span>
          </div>

          <h1 className="display-1 animate-rise-2 mt-6 max-w-[18ch]">
            All your work pulled into one powerful place
          </h1>

          <p className="lede animate-rise-3 mt-5 max-w-[46ch]">
            Organize tasks and projects in one connected, accessible platform.
          </p>

          <a href="#pricing" className="btn btn-primary animate-rise-4 group mt-8">
            Get started
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      <div className="animate-rise-4 mt-14 md:mt-20 mx-auto w-full max-w-[1600px] px-4 md:px-8 pb-32">
        <DashboardMockup />
      </div>
    </section>
  );
}
