import { ASSETS } from "./content";

function SectionHeading({
  eyebrow,
  title,
  body,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto flex max-w-2xl flex-col items-center text-center"
          : "flex max-w-2xl flex-col"
      }
    >
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="display-2">{title}</h2>
      {body && <p className="lede mt-4">{body}</p>}
    </div>
  );
}

export { SectionHeading };



export function Features() {
  return (
    <section id="features" className="section dark bg-black text-foreground py-20 lg:py-32">
      <div className="mx-auto w-full lg:max-w-none px-6 lg:px-10 xl:px-16 2xl:px-20">

        <div className="mb-16 text-white [&_.lede]:text-white/80">
          <SectionHeading
            title="All the essentials for modern productivity"
            body="Mobile, automation, workflows, and insights - all in sync and ready to go."
            align="center"
          />
        </div>
        <div className="mx-auto flex w-full flex-col gap-6 lg:grid lg:grid-cols-4">

          {/* Card 1: Mobile App (Left) */}
          <div className="lg:col-span-2 relative flex min-h-[500px] flex-col overflow-hidden rounded-[24px] border border-white/5 bg-[#0a0a0a] p-8 lg:p-10">
            <div className="relative z-10 w-full max-w-lg">
              <h3 className="text-[1.5rem] font-semibold tracking-tight text-white md:text-[1.75rem]">
                Work anywhere with our mobile app
              </h3>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-[#A1A1A9]">
                Stay connected and productive on the go – the power of our platform in your pocket.
              </p>
            </div>

            <div className="absolute -bottom-[20%] left-1/2 w-[90%] sm:w-[75%] lg:w-[85%] max-w-[600px] -translate-x-1/2 overflow-hidden lg:-bottom-[5%]">
              <img
                src={ASSETS.mobileApp}
                alt=""
                className="w-full h-auto object-cover object-top opacity-95"
              />
            </div>
          </div>

          {/* Cards 2 & 3: Middle Column Stacked */}
          <div className="flex flex-col gap-4">

            <div className="relative flex min-h-[250px] flex-col justify-end overflow-hidden rounded-[24px] border border-white/5 bg-[#0a0a0a] p-8 pt-[200px] group">
              <div className="absolute left-0 top-0 w-full h-[220px] flex items-start justify-center overflow-hidden">
                <img
                  src={ASSETS.converging}
                  alt="Performance scale lines"
                  className="w-full h-full object-cover object-top opacity-100 transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay intentionally removed so image shows clearly */}
              </div>

              <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-1">
                <h3 className="text-[1.25rem] font-semibold text-white">
                  Performance that scales with you
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-[1.6] text-[#A1A1A9]">
                  Whether you're a 3-person startup or a growing enterprise.
                </p>
              </div>
            </div>

            <div className="relative flex min-h-[250px] flex-col justify-end overflow-hidden rounded-[24px] border border-white/5 bg-[#0a0a0a] p-8 pt-[200px]">
              <div className="absolute left-0 top-0 w-full h-[200px] flex items-center justify-center">
                <img src={ASSETS.collaboration} alt="" className="h-full w-full object-cover opacity-80" />
              </div>
              <div className="relative z-10">
                <h3 className="text-[1.25rem] font-semibold text-white">
                  Live collaboration
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-[1.6] text-[#A1A1A9]">
                  Team members stay aligned with real-time updates, comments, and notifications.
                </p>
              </div>
            </div>

          </div>

          {/* Card 4: Smart Automation (Right) */}
          <div className="relative flex min-h-[500px] flex-col justify-end overflow-hidden rounded-[24px] bg-gradient-to-br from-[#FF5500] to-[#991A00] p-8 lg:p-10">
            {/* Visual Flow diagram */}
            <div className="absolute top-12 left-1/2 flex -translate-x-1/2 flex-col gap-[1.35rem] w-full max-w-[280px]">
              {["Capture data automatically", "Analyze with AI", "Categorize tasks instantly", "Generate organized output"].map((step, i) => (
                <div
                  key={i}
                  className="relative z-10 flex w-[90%] items-center gap-3.5 rounded-full bg-black/40 px-3.5 py-3.5 shadow-md border border-white/5 mx-auto"
                >
                  <div className="relative z-10 flex h-[22px] w-[22px] shrink-0 items-center justify-center">
                    {/* Dotted Spinner Layer */}
                    <div
                      className="absolute inset-0 flex items-center justify-center text-white/50"
                      style={{
                        animation: `spinHide 6s infinite`,
                        animationDelay: `${i * 1.5}s`,
                        animationFillMode: "both"
                      }}
                    >
                      <svg className="animate-[spin_3s_linear_infinite] h-full w-full" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 6" />
                      </svg>
                    </div>

                    {/* Solid Checkmark Layer */}
                    <span
                      className="absolute inset-0 flex items-center justify-center rounded-full bg-white text-black"
                      style={{
                        animation: `tickPop 6s infinite`,
                        animationDelay: `${i * 1.5}s`,
                        opacity: 0,
                        animationFillMode: "both"
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                  </div>
                  <span className="text-[0.875rem] font-medium text-white shadow-sm">{step}</span>

                  {/* Connector line exactly aligned to the center of the 22px circle. */}
                  {i !== 3 && (
                    <div className="absolute top-[22px] left-[24.5px] h-[34px] w-[1px] bg-white/30" />
                  )}
                </div>
              ))}
            </div>

            <style>{`
              @keyframes tickPop {
                0%, 5% { opacity: 0; transform: scale(0.2) rotate(-30deg); }
                15%, 85% { opacity: 1; transform: scale(1) rotate(0deg); }
                95%, 100% { opacity: 0; transform: scale(0.2) rotate(30deg); }
              }
              @keyframes spinHide {
                0%, 5% { opacity: 1; }
                15%, 85% { opacity: 0; }
                95%, 100% { opacity: 1; }
              }
            `}</style>

            <div className="relative z-10 mt-auto pt-48">
              <h3 className="text-[1.5rem] font-semibold tracking-tight text-white md:text-[1.75rem]">
                Smart automation
              </h3>
              <p className="mt-2 text-[1rem] leading-[1.65] text-white/90">
                Reduce manual tasks with AI-driven workflows (like expense categorization or time tracking).
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
