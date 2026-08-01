import { Plus } from "lucide-react";
import { INTEGRATION_GROUPS } from "./content";
import { SectionHeading } from "./Features";

/** Simple monogram tiles stand in for each partner logo. */
function ToolTile({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
  return (
    <li className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-white/85 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.06]">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.06] text-[0.6875rem] font-semibold text-white">
        {initials}
      </span>
      <span className="text-[0.875rem] text-white/75">{name}</span>
    </li>
  );
}

export function Integrations() {
  return (
    <section id="integrations" className="section bg-black pt-0 text-white">
      <div className="shell">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <h2 className="display-2 text-white">Integrations</h2>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[0.9375rem] text-white/80">
            <span className="text-[0.9rem]">🚀</span>
            <span>
              <strong className="font-medium text-white">17</strong> integrations and adding more every month
            </span>
          </div>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-[1fr_0.9fr_1fr]">
          {INTEGRATION_GROUPS.slice(0, 2).map((group, index) => (
            <article
              key={group.category}
              className={`group flex min-h-[230px] flex-col rounded-[20px] border border-white/8 bg-[#0b0b0b] p-6 shadow-[0_1px_0_rgba(255,255,255,0.03)] transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-card ${
                index === 1 ? "lg:col-start-3" : ""
              }`}
            >
              <header className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="display-3 text-white">{group.category}</h3>
                  <p className="mt-2 max-w-[38ch] text-[0.9375rem] leading-relaxed text-white/55">
                    {group.body}
                  </p>
                </div>
                <span className="flex h-9 items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-3 text-[0.8125rem] font-medium text-white/80">
                  {group.tools.length}
                  <Plus className="h-3 w-3" />
                </span>
              </header>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.tools.map((tool) => (
                  <ToolTile key={tool} name={tool} />
                ))}
              </ul>
            </article>
          ))}

          <article className="group relative flex min-h-[230px] items-center justify-center overflow-hidden rounded-[20px] border border-white/8 bg-[#0b0b0b] p-6 lg:col-start-2 lg:row-span-2">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,94,0,0.75),rgba(120,10,0,0.4)_48%,transparent_72%)] opacity-80 blur-[2px]" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,135,40,0.9),rgba(160,15,0,0.7)_48%,transparent_72%)] blur-3xl" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-black/35 shadow-[0_0_40px_rgba(255,120,34,0.4)]">
              <span className="text-[4rem] leading-none text-white/90">◌</span>
            </div>
          </article>

          {INTEGRATION_GROUPS.slice(2).map((group, index) => (
            <article
              key={group.category}
              className={`group flex min-h-[230px] flex-col rounded-[20px] border border-white/8 bg-[#0b0b0b] p-6 shadow-[0_1px_0_rgba(255,255,255,0.03)] transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-card ${
                index === 1 ? "lg:col-start-3" : ""
              }`}
            >
              <header className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="display-3 text-white">{group.category}</h3>
                  <p className="mt-2 max-w-[38ch] text-[0.9375rem] leading-relaxed text-white/55">
                    {group.body}
                  </p>
                </div>
                <span className="flex h-9 items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-3 text-[0.8125rem] font-medium text-white/80">
                  {group.tools.length}
                  <Plus className="h-3 w-3" />
                </span>
              </header>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.tools.map((tool) => (
                  <ToolTile key={tool} name={tool} />
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
