import { Plus } from "lucide-react";
import { INTEGRATION_GROUPS } from "./content";
import { SectionHeading } from "./Features";

/** Simple monogram tiles stand in for each partner logo. */
function ToolTile({ name }: { name: string }) {
  // Use a generic plug/link or just simple initials inside a generic circle
  return (
    <li className="flex items-center gap-2 rounded-full border border-white/5 bg-[#121212] px-3.5 py-2 text-white/85 transition-colors duration-300 hover:border-white/20 hover:bg-white/5">
      <span className="flex h-5 w-5 items-center justify-center text-white/50">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      </span>
      <span className="text-[0.875rem] font-medium">{name}</span>
    </li>
  );
}

export function Integrations() {
  return (
    <section id="integrations" className="section bg-[#0a0a0a] pt-32 lg:pt-48 pb-20 text-white">
      <div className="mx-auto w-full max-w-[1600px] lg:max-w-none px-6 lg:px-10 xl:px-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <h2 className="display-2 font-semibold text-white">Integrations</h2>
          <div className="mt-5 flex items-center justify-center gap-3 text-[1.0625rem] text-[#9CA3AF]">
            <div className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-sm font-semibold text-white">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 8v8M16 8v8M4 12h16" />
              </svg>
              17
            </div>
            <span>integrations and adding more <strong className="font-medium text-white">every month</strong></span>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">

          <div className="flex flex-col gap-6">
            {INTEGRATION_GROUPS.slice(0, 2).map((group) => (
              <article
                key={group.category}
                className="relative flex min-h-[260px] flex-col rounded-[24px] border border-white/5 bg-[#0a0a0a] p-8"
              >
                <div className="absolute right-6 top-6 text-[0.875rem] font-medium text-white/40">{group.tools.length}</div>
                <h3 className="text-[1.25rem] font-semibold text-white">{group.category}</h3>
                <p className="mt-3 text-[0.9375rem] leading-[1.6] text-[#A1A1A9]">
                  {group.body}
                </p>
                <div className="mt-8 mt-auto border-t border-white/5 pt-6">
                  <ul className="flex flex-wrap gap-2.5">
                    {group.tools.map((tool) => (
                      <ToolTile key={tool} name={tool} />
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <article className="relative flex min-h-[400px] w-full items-center justify-center overflow-hidden rounded-[24px] border border-white/5 bg-[#0a0a0a]">
            {/* Bottom Glows */}
            <div className="pointer-events-none absolute -bottom-[40%] left-1/2 aspect-square w-[150%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,100,0,0.25),rgba(200,40,0,0.1)_40%,transparent_60%)] blur-2xl" />
            <div className="pointer-events-none absolute bottom-0 left-1/2 h-[300px] w-[140%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(255,120,0,0.4),transparent_65%)] opacity-80 blur-xl" />
            <div className="pointer-events-none absolute bottom-0 left-1/2 h-[150px] w-[60%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(255,200,100,0.7),transparent_70%)] blur-lg" />

            {/* Card Logo */}
            <div className="relative z-10 flex h-32 w-32 items-center justify-center rounded-[20px] bg-[#1a1a1a] shadow-[0_4px_40px_rgba(0,0,0,0.6)]">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white">
                <path d="M12 2L2 22h20L12 2z" />
                <ellipse cx="12" cy="14" rx="10" ry="3" transform="rotate(-20 12 14)" strokeDasharray="2 3" />
              </svg>
            </div>
          </article>

          <div className="flex flex-col gap-6">
            {INTEGRATION_GROUPS.slice(2).map((group) => (
              <article
                key={group.category}
                className="relative flex min-h-[260px] flex-col rounded-[24px] border border-white/5 bg-[#0a0a0a] p-8"
              >
                <div className="absolute right-6 top-6 text-[0.875rem] font-medium text-white/40">{group.tools.length}</div>
                <h3 className="text-[1.25rem] font-semibold text-white">{group.category}</h3>
                <p className="mt-3 text-[0.9375rem] leading-[1.6] text-[#A1A1A9]">
                  {group.body}
                </p>
                <div className="mt-8 mt-auto border-t border-white/5 pt-6">
                  <ul className="flex flex-wrap gap-2.5">
                    {group.tools.map((tool) => (
                      <ToolTile key={tool} name={tool} />
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
