import {
  Bell,
  CalendarDays,
  ChevronRight,
  FileText,
  Filter,
  Home,
  Inbox,
  LayoutGrid,
  ListChecks,
  PieChart,
  Plus,
  Search,
  Settings,
  SlidersHorizontal,
  UserPlus,
} from "lucide-react";
import { ASSETS } from "./content";

const SIDEBAR_MAIN = [
  { label: "Home", icon: Home, count: null, active: true },
  { label: "My Tasks", icon: ListChecks, count: 7, active: false },
  { label: "Inbox", icon: Inbox, count: 27, active: false },
  { label: "Analytics", icon: PieChart, count: null, active: false },
  { label: "Docs", icon: FileText, count: null, active: false },
  { label: "Calendar", icon: CalendarDays, count: 4, active: false },
  { label: "Settings", icon: Settings, count: null, active: false },
];

const PROJECTS = [
  { label: "Product & Engineering", tone: "var(--brand)" },
  { label: "Marketing", tone: "oklch(0.66 0.17 148)" },
  { label: "Operations", tone: "oklch(0.62 0.19 264)" },
  { label: "HR & People", tone: "oklch(0.65 0.2 320)" },
  { label: "Finance", tone: "oklch(0.75 0.16 80)" },
];

const TABS = ["Board", "Timeline", "Calendar", "Dashboard", "Progress", "Forms"];

const COLUMNS = [
  { title: "Backlog Tasks", count: 4, tone: "oklch(0.556 0 0)", cards: 4 },
  { title: "To Do Tasks", count: 4, tone: "var(--brand)", cards: 3 },
  { title: "In Progress", count: 2, tone: "oklch(0.75 0.16 80)", cards: 2 },
  { title: "Done", count: 4, tone: "var(--success)", cards: 3 },
];

function TaskCard({ index }: { index: number }) {
  const widths = ["92%", "76%", "84%", "68%"];
  return (
    <article className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3">
      <div className="flex items-center gap-1.5">
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: index % 2 ? "var(--brand-bright)" : "var(--success)" }}
        />
        <span className="h-2 w-10 rounded-full bg-white/12" />
      </div>
      <div className="mt-2.5 space-y-1.5">
        <span
          className="block h-2 rounded-full bg-white/20"
          style={{ width: widths[index % widths.length] }}
        />
        <span className="block h-2 w-1/2 rounded-full bg-white/10" />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <img
          src={ASSETS.memberStrip}
          alt=""
          width={128}
          height={32}
          className="h-4 w-auto opacity-90"
        />
        <span className="h-2 w-8 rounded-full bg-white/10" />
      </div>
    </article>
  );
}

/** Product UI mockup shown in the hero — rebuilt as real markup, not an image. */
export function DashboardMockup() {
  return (
    <div className="card-dark relative mx-auto max-w-[1160px] overflow-hidden rounded-[24px] p-1.5 shadow-float">
      <div className="flex overflow-hidden rounded-[18px] bg-[oklch(0.17_0_0)]">
        {/* Sidebar */}
        <aside className="hidden w-[210px] shrink-0 flex-col border-r border-white/[0.06] p-3 md:flex">
          <div className="flex items-center gap-2.5 rounded-xl p-1.5">
            <img
              src={ASSETS.profile}
              alt=""
              width={128}
              height={128}
              className="h-8 w-8 rounded-full object-cover"
            />
            <div className="leading-tight">
              <p className="text-[0.8125rem] font-medium text-white">Nancy Martino</p>
              <p className="text-[0.6875rem] text-white/40">Designer</p>
            </div>
          </div>

          <nav className="mt-4 flex flex-col gap-0.5">
            {SIDEBAR_MAIN.map(({ label, icon: Icon, count, active }) => (
              <span
                key={label}
                className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[0.8125rem] ${
                  active ? "bg-white/[0.07] text-white" : "text-white/55"
                }`}
              >
                <Icon className="h-4 w-4" strokeWidth={1.6} />
                <span className="flex-1">{label}</span>
                {count !== null && (
                  <span className="rounded-full bg-white/10 px-1.5 text-[0.625rem] text-white/60">
                    {count}
                  </span>
                )}
              </span>
            ))}
          </nav>

          <p className="mt-5 px-2.5 text-[0.6875rem] tracking-wide text-white/35">Projects</p>
          <div className="mt-1.5 flex flex-col gap-0.5">
            {PROJECTS.map((p) => (
              <span
                key={p.label}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[0.8125rem] text-white/55"
              >
                <span className="h-2 w-2 rounded-[3px]" style={{ background: p.tone }} />
                {p.label}
              </span>
            ))}
          </div>
        </aside>

        {/* Main panel */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3">
            <div className="flex flex-1 items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1.5">
              <Search className="h-3.5 w-3.5 text-white/40" />
              <span className="text-[0.75rem] text-white/40">Search by task name</span>
            </div>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.07] text-white/50">
              <Bell className="h-3.5 w-3.5" />
            </span>
            <span className="hidden items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-[0.75rem] font-medium text-[oklch(0.2_0_0)] sm:inline-flex">
              <UserPlus className="h-3.5 w-3.5" />
              Invite members
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 px-4 pt-3.5 text-[0.75rem] text-white/45">
            <span>Projects</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white">Product &amp; Engineering</span>
          </div>

          <div className="mt-3 flex items-center gap-1 overflow-hidden border-b border-white/[0.06] px-4">
            {TABS.map((tab, i) => (
              <span
                key={tab}
                className={`relative flex items-center gap-1.5 px-2.5 pb-2.5 text-[0.75rem] ${
                  i === 0 ? "text-white" : "text-white/45"
                }`}
              >
                {i === 0 && <LayoutGrid className="h-3.5 w-3.5" />}
                {tab}
                {i === 0 && (
                  <span className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-[var(--brand)]" />
                )}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 px-4 py-3 text-[0.75rem] text-white/45">
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.07] px-2 py-1">
              <Filter className="h-3 w-3" /> Filter
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.07] px-2 py-1">
              <SlidersHorizontal className="h-3 w-3" /> Sort
            </span>
            <span className="hidden items-center gap-1.5 rounded-lg border border-white/[0.07] px-2 py-1 sm:inline-flex">
              <LayoutGrid className="h-3 w-3" /> Group by
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 px-4 pb-5 lg:grid-cols-4">
            {COLUMNS.map((col, ci) => (
              <section key={col.title} className={ci > 1 ? "hidden lg:block" : ""}>
                <header className="mb-2.5 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: col.tone }} />
                  <h3 className="text-[0.75rem] font-medium text-white/85">{col.title}</h3>
                  <span className="rounded-full bg-white/10 px-1.5 text-[0.625rem] text-white/55">
                    {col.count}
                  </span>
                  <Plus className="ml-auto h-3.5 w-3.5 text-white/35" />
                </header>
                <div className="flex flex-col gap-2">
                  {Array.from({ length: col.cards }).map((_, i) => (
                    <TaskCard key={i} index={i + ci} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
