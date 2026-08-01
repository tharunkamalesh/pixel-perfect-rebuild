import { ArrowRight } from "lucide-react";
import { ASSETS } from "./content";

/** Closing call-to-action banner. */
export function CtaBanner() {
  return (
    <section className="section pt-0">
      <div className="shell">
        <div className="card-dark relative overflow-hidden px-6 py-16 text-center md:px-16 md:py-24">
          <img
            src={ASSETS.converging}
            alt=""
            aria-hidden="true"
            width={1200}
            height={540}
            loading="lazy"
            className="pointer-events-none absolute inset-x-0 bottom-0 w-full opacity-25 mix-blend-screen"
          />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center">
            <h2 className="display-2 text-white">Pull your team in with Accretion</h2>
            <p className="lede mt-4 text-white/60">
              Your team's next big win starts here. Try Accretion and experience simpler, smarter
              task management built for growth.
            </p>
            <a href="#pricing" className="btn btn-brand group mt-8">
              Get started
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
