import { Check } from "lucide-react";
import { PRICING_PLANS } from "./content";
import { SectionHeading } from "./Features";

export function Pricing() {
  return (
    <section id="pricing" className="section pt-0">
      <div className="shell">
        <SectionHeading
          eyebrow="Pricing"
          title="Choose the plan that matches your workflow"
          body="No hidden fees, no surprises."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PRICING_PLANS.map((plan) => {
            const featured = plan.featured;
            return (
              <article
                key={plan.name}
                className={`${
                  featured ? "card-dark" : "card"
                } flex flex-col p-6 transition-[transform,box-shadow] duration-500 hover:-translate-y-1`}
              >
                <header>
                  <div className="flex items-center justify-between gap-3">
                    <h3
                      className={`text-[0.9375rem] font-medium ${featured ? "text-white" : "text-foreground"}`}
                    >
                      {plan.name}
                    </h3>
                    {"badge" in plan && plan.badge && (
                      <span className="chip-badge bg-brand">{plan.badge}</span>
                    )}
                  </div>
                  <p
                    className={`mt-5 text-[2.75rem] leading-none font-medium tracking-[-0.03em] ${
                      featured ? "text-white" : "text-foreground"
                    }`}
                  >
                    {plan.price}
                    {plan.priceNote && (
                      <span
                        className={`ml-1.5 text-[0.875rem] font-normal ${featured ? "text-white/45" : "text-subtle"}`}
                      >
                        {plan.priceNote}
                      </span>
                    )}
                  </p>
                  {"billing" in plan && plan.billing && (
                    <p className={`mt-1 text-[0.8125rem] ${featured ? "text-white/40" : "text-subtle"}`}>
                      {plan.billing}
                    </p>
                  )}
                </header>

                <div
                  className={`my-6 h-px w-full ${featured ? "bg-white/10" : "bg-line"}`}
                  aria-hidden="true"
                />

                {"intro" in plan && plan.intro && (
                  <p
                    className={`mb-3 text-[0.8125rem] font-medium ${featured ? "text-white/70" : "text-foreground"}`}
                  >
                    {plan.intro}
                  </p>
                )}

                <ul className="flex flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <span
                        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                          featured ? "bg-white/15 text-white" : "bg-brand-tint text-brand"
                        }`}
                      >
                        <Check className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                      <span
                        className={`text-[0.875rem] leading-snug ${featured ? "text-white/70" : "text-body"}`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#home"
                  className={`btn mt-8 w-full ${featured ? "btn-onDark" : "btn-primary"}`}
                >
                  Get started
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
