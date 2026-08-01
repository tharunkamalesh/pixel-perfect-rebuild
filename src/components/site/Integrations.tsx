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
    <li className="flex items-center gap-2.5 rounded-full border border-line bg-surface px-3 py-2 transition-colors duration-300 hover:border-foreground/25">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-tint text-[0.6875rem] font-semibold text-brand">
        {initials}
      </span>
      <span className="text-[0.875rem] text-body">{name}</span>
    </li>
  );
}

export function Integrations() {
  return (
    <section id="integrations" className="section pt-0">
      <div className="shell">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Integrations"
            title="17 integrations and adding more every month"
            body="Plug Accretion into the tools your team already lives in — and keep everything in sync."
          />
          <div className="card-dark flex items-center gap-5 p-6 md:justify-self-end">
            <span className="text-[3.25rem] leading-none font-medium tracking-tight text-white">
              17
            </span>
            <span className="text-[0.9375rem] leading-snug text-white/55">
              integrations and
              <br />
              growing
            </span>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {INTEGRATION_GROUPS.map((group) => (
            <article
              key={group.category}
              className="card group flex flex-col p-6 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-card"
            >
              <header className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="display-3">{group.category}</h3>
                  <p className="mt-2 max-w-[38ch] text-[0.9375rem] leading-relaxed text-body">
                    {group.body}
                  </p>
                </div>
                <span className="flex h-9 items-center gap-1 rounded-full bg-brand-tint px-3 text-[0.8125rem] font-medium text-brand">
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
