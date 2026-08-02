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
  Menu
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

import { CalendarDays as CalendarIcon, Paperclip, MessageSquare } from "lucide-react";

type Task = {
  date: string;
  badge?: "Low" | "Medium" | "High";
  title: string;
  avatars: number;
  moreAvatars?: number;
  attachments?: number;
  comments?: number;
};

const COLUMNS = [
  {
    title: "Backlog Tasks", count: 4, tone: "oklch(0.556 0 0)",
    tasks: [
      { date: "13 Nov, 2025", badge: "Medium", title: "Design onboarding flow", avatars: 2, attachments: 3, comments: 2 },
      { date: "No due date", badge: "Low", title: "Write product launch announcement", avatars: 2, attachments: 1 }
    ] as Task[],
    showAddBlock: true
  },
  {
    title: "To Do Tasks", count: 4, tone: "var(--brand)",
    tasks: [
      { date: "15 Nov, 2025", badge: "Low", title: "Draft Q3 roadmap documents", avatars: 2, moreAvatars: 3, attachments: 5, comments: 7 },
      { date: "16 Nov, 2025", badge: "Medium", title: "Add dark mode toggle", avatars: 1, comments: 4 },
      { date: "23 Nov, 2025", badge: "High", title: "Review security compliance checklist", avatars: 2, moreAvatars: 4, comments: 13 },
      { date: "24 Nov, 2025", badge: "Low", title: "Run employee survey on tool adoption", avatars: 3, attachments: 1 }
    ] as Task[]
  },
  {
    title: "In Progress", count: 2, tone: "oklch(0.75 0.16 80)",
    tasks: [
      { date: "17 Nov, 2025", badge: "High", title: "Improve search functionality", avatars: 2, moreAvatars: 2, comments: 6 },
      { date: "18 Nov, 2025", badge: "Low", title: "Refactor authentication logic", avatars: 1, attachments: 3 },
      { date: "22 Nov, 2025", badge: "Low", title: "Review customer support tickets and identify recurring issues", avatars: 2, moreAvatars: 2, comments: 6 }
    ] as Task[],
    showAddBlock: true
  },
  {
    title: "Done", count: 4, tone: "var(--success)",
    tasks: [
      { date: "09 Nov, 2025", title: "Test notification system", avatars: 2, moreAvatars: 2 },
      { date: "07 Nov, 2025", title: "Create detailed wireframes for onboarding flow", avatars: 2, moreAvatars: 5 },
      { date: "05 Nov, 2025", title: "Write technical documentation authentication module", avatars: 1, attachments: 2 },
      { date: "04 Nov, 2025", title: "Publish Q2 performance metrics", avatars: 3, moreAvatars: 5 }
    ] as Task[]
  },
];

const badgeColors = {
  Low: "border-white/10 text-white/50",
  Medium: "border-yellow-500/20 text-yellow-500/90",
  High: "border-orange-500/20 text-orange-500/90"
};

function TaskCard({ task }: { task: Task }) {
  return (
    <article className="rounded-xl border border-white/[0.04] bg-[#111111] p-3.5 shadow-sm transition-colors hover:bg-white/[0.05]">

      {/* Header: Date & Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[0.6875rem] text-white/40">
          <CalendarIcon className="h-3 w-3" />
          <span>{task.date}</span>
        </div>
        {task.badge && (
          <span className={`rounded-full border px-2 py-0.5 text-[0.625rem] font-medium ${badgeColors[task.badge]}`}>
            {task.badge}
          </span>
        )}
      </div>

      {/* Title */}
      <h4 className="mt-3 text-[0.8125rem] font-medium leading-[1.4] text-white/90">
        {task.title}
      </h4>

      {/* Footer: Avatars & Metrics */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center -space-x-1.5">
          {Array.from({ length: task.avatars }).map((_, i) => (
            <img
              key={i}
              src={ASSETS.avatars[i % ASSETS.avatars.length]}
              alt=""
              className="h-5 w-5 rounded-full ring-2 ring-[#111111] object-cover"
            />
          ))}
          {task.moreAvatars && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 ring-2 ring-[#111111] text-[0.5625rem] text-white/60">
              +{task.moreAvatars}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 text-[0.6875rem] text-white/30">
          {task.attachments !== undefined && (
            <div className="flex items-center gap-1">
              <Paperclip className="h-3 w-3" />
              <span>{task.attachments}</span>
            </div>
          )}
          {task.comments !== undefined && (
            <div className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              <span>{task.comments}</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

/** Product UI mockup shown in the hero — rebuilt as real markup, not an image. */
export function DashboardMockup() {
  return (
    <div className="card-dark relative mx-auto w-full overflow-hidden rounded-[24px] shadow-float bg-[#0a0a0a] border border-white/[0.06]">

      {/* Global Top Nav */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
        <div className="flex items-center gap-2 pr-6">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" className="text-white">
            <path d="M16 2L2 30h28L16 2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            <path d="M16 10l-8 16h16l-8-16z" fill="currentColor" />
          </svg>
          <Menu className="h-5 w-5 text-white/50 md:hidden" />
        </div>

        <div className="max-w-[480px] flex-1">
          <div className="flex items-center gap-2 rounded-lg bg-white/[0.03] px-3 py-1.5 ring-1 ring-white/[0.07]">
            <Search className="h-3.5 w-3.5 text-white/40" />
            <span className="text-[0.75rem] text-white/40">Search by task name</span>
          </div>
        </div>

        <div className="flex items-center gap-3 pl-6 text-white/50">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.02]">
            <span className="text-[0.75rem] font-medium">?</span>
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.02]">
            <Bell className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>

      <div className="flex overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden w-[220px] shrink-0 flex-col border-r border-white/[0.06] p-4 md:flex">
          <div className="mb-6 flex items-center gap-2.5">
            <img
              src={ASSETS.profile}
              alt=""
              className="h-8 w-8 rounded-full object-cover"
            />
            <div className="leading-tight">
              <p className="text-[0.8125rem] font-medium text-white">Nancy Martino</p>
              <p className="text-[0.6875rem] text-white/40">Designer</p>
            </div>
          </div>

          <nav className="flex flex-col gap-0.5">
            {SIDEBAR_MAIN.map(({ label, icon: Icon, count, active }) => (
              <span
                key={label}
                className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[0.8125rem] ${active ? "bg-white/[0.07] text-white" : "text-white/55 hover:text-white/80 transition-colors"}`}
              >
                <Icon className="h-4 w-4" strokeWidth={1.6} />
                <span className="flex-1">{label}</span>
                {count !== null && (
                  <span className="rounded-full text-[0.625rem] text-[#FF5500]">
                    {count}
                  </span>
                )}
              </span>
            ))}
          </nav>

          <div className="mt-8 flex items-center justify-between px-2.5">
            <span className="text-[0.6875rem] font-medium tracking-wide text-white/35">Projects</span>
            <Plus className="h-3.5 w-3.5 text-white/35" />
          </div>
          <div className="mt-2 flex flex-col gap-0.5">
            {PROJECTS.map((p) => (
              <span
                key={p.label}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[0.8125rem] text-white/55 hover:text-white/80 transition-colors"
                style={{
                  backgroundColor: p.label === "Product & Engineering" ? "rgba(255,255,255,0.04)" : "transparent",
                  color: p.label === "Product & Engineering" ? "#fff" : undefined
                }}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: p.tone }} />
                {p.label}
              </span>
            ))}
          </div>
        </aside>

        {/* Main panel */}
        <div className="min-w-0 flex-1 overflow-auto bg-[#0a0a0a]">
          <div className="px-6 py-5 md:px-8 md:pt-8 pb-10">

            {/* Breadcrumb & Invite Row */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-[0.75rem] text-white/45">
                <span>Projects</span>
                <ChevronRight className="h-3 w-3" />
                <span className="text-white">Product &amp; Engineering</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center -space-x-1.5">
                  <img src={ASSETS.avatars[0]} alt="" className="h-6 w-6 rounded-full object-cover ring-2 ring-[#0a0a0a]" />
                  <img src={ASSETS.avatars[1]} alt="" className="h-6 w-6 rounded-full object-cover ring-2 ring-[#0a0a0a]" />
                  <img src={ASSETS.avatars[2]} alt="" className="h-6 w-6 rounded-full object-cover ring-2 ring-[#0a0a0a]" />
                  <img src={ASSETS.avatars[3]} alt="" className="h-6 w-6 rounded-full object-cover ring-2 ring-[#0a0a0a]" />
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 ring-2 ring-[#0a0a0a] text-[0.625rem] text-white/60">
                    +5
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-transparent px-3 py-1.5 text-[0.75rem] font-medium text-white hover:bg-white/[0.04] transition-colors">
                  <Plus className="h-3.5 w-3.5" />
                  Invite members
                </span>
              </div>
            </div>

            {/* Giant Title */}
            <h2 className="mt-4 text-[1.5rem] md:text-[1.75rem] font-semibold text-white tracking-tight">
              Product &amp; Engineering
            </h2>

            {/* Tabs Row (aligned flex) */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-[1.125rem]">
                {TABS.map((tab, i) => (
                  <span
                    key={tab}
                    className={`relative flex items-center gap-1.5 pb-3 text-[0.8125rem] font-medium ${i === 0 ? "text-white" : "text-white/45 hover:text-white/70 transition-colors"}`}
                  >
                    {i === 0 && <LayoutGrid className="h-4 w-4" />}
                    {tab}
                    {i === 5 && <Plus className="ml-1 h-3.5 w-3.5 text-white/30" />}
                    {i === 0 && (
                      <span className="absolute inset-x-0 -bottom-[1px] h-[2px] rounded-t-full bg-white" />
                    )}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 pb-3 text-[0.75rem] text-white/45">
                <span className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                  <Filter className="h-3.5 w-3.5" /> Filter
                </span>
                <span className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                  <SlidersHorizontal className="h-3.5 w-3.5" /> Sort
                </span>
                <span className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                  <LayoutGrid className="h-3.5 w-3.5" /> Group by
                </span>
              </div>
            </div>

            {/* Kanban Columns */}
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {COLUMNS.map((col, ci) => (
                <section key={col.title}>
                  <header className="mb-3.5 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: col.tone }} />
                    <h3 className="text-[0.75rem] font-medium text-white/80">{col.title}</h3>
                    <span className="rounded-full bg-white/[0.06] px-1.5 text-[0.625rem] text-white/40 border border-white/[0.04]">
                      {col.count}
                    </span>
                    <Plus className="ml-auto h-3.5 w-3.5 text-white/30" />
                  </header>
                  <div className="flex flex-col gap-3">
                    {col.tasks.map((task, i) => (
                      <TaskCard key={i} task={task} />
                    ))}
                    {col.showAddBlock && (
                      <div className="mt-2 flex items-center justify-center py-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-white/30 hover:bg-white/[0.04] transition-colors cursor-pointer">
                          <Plus className="h-4 w-4" />
                        </span>
                      </div>
                    )}
                  </div>
                </section>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
