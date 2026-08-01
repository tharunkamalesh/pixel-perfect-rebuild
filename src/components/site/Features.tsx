import { Sparkles, Users, Workflow, BarChart3, Puzzle, Layers } from "lucide-react";
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

function CardShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`card group relative flex flex-col overflow-hidden p-6 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-card ${className}`}
    >
      {children}
    </div>
  );
}

function CardText({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ElementType;
  title: string;
  body: string;
}) {
  return (
    <div className="mt-6">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-tint text-brand">
        <Icon className="h-4.5 w-4.5" strokeWidth={1.7} />
      </span>
      <h3 className="display-3 mt-4">{title}</h3>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-body">{body}</p>
    </div>
  );
}

/** Visual: floating collaboration avatars ("Samuel / Erica"). */
function CollaborationVisual() {
  const people = ["Samuel", "Erica"];
  return (
    <div className="relative h-40 overflow-hidden rounded-2xl bg-brand-tint/60">
      <div className="marquee-mask absolute inset-0 flex items-center">
        <div className="flex w-max animate-[marquee_22s_linear_infinite] items-center gap-3 px-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-2 shadow-card"
            >
              <img
                src={ASSETS.avatars[i % ASSETS.avatars.length]}
                alt=""
                width={128}
                height={128}
                loading="lazy"
                className="h-7 w-7 rounded-full object-cover"
              />
              <span className="text-[0.8125rem] font-medium">{people[i % 2]}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Visual: animated automation flow lines. */
function AutomationVisual() {
  return (
    <div className="relative h-40 overflow-hidden rounded-2xl bg-brand-tint/60">
      <svg viewBox="0 0 320 160" className="h-full w-full" role="presentation">
        <defs>
          <linearGradient id="flow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--brand)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--brand)" />
            <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[40, 80, 120].map((y, i) => (
          <g key={y}>
            <path
              d={`M10 ${y} H140 Q160 ${y} 160 ${y + (80 - y) / 2} V80 H310`}
              fill="none"
              stroke="oklch(0.2 0 0 / 0.12)"
              strokeWidth="1.5"
            />
            <path
              d={`M10 ${y} H140 Q160 ${y} 160 ${y + (80 - y) / 2} V80 H310`}
              fill="none"
              stroke="url(#flow)"
              strokeWidth="2"
              strokeDasharray="40 260"
              style={{
                animation: `dash 3.2s linear ${i * 0.5}s infinite`,
              }}
            />
          </g>
        ))}
        <style>{`@keyframes dash { to { stroke-dashoffset: -300; } }`}</style>
      </svg>
    </div>
  );
}

function InsightsVisual() {
  const bars = [38, 62, 45, 78, 56, 88, 70];
  return (
    <div className="flex h-40 items-end gap-2 rounded-2xl bg-brand-tint/60 p-5">
      {bars.map((h, i) => (
        <span
          key={i}
          className="flex-1 rounded-t-md transition-[height] duration-700 ease-out"
          style={{
            height: `${h}%`,
            background:
              i === bars.length - 2
                ? "var(--brand)"
                : "color-mix(in oklab, var(--brand) 28%, white)",
          }}
        />
      ))}
    </div>
  );
}

function IntegrationsVisual() {
  return (
    <div className="grid h-40 grid-cols-4 place-items-center gap-2 rounded-2xl bg-brand-tint/60 p-4">
      {ASSETS.avatars.slice(0, 8).map((src, i) => (
        <span
          key={i}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface shadow-card"
        >
          <img
            src={src}
            alt=""
            width={128}
            height={128}
            loading="lazy"
            className="h-6 w-6 rounded-md object-cover"
          />
        </span>
      ))}
    </div>
  );
}

function ScaleVisual() {
  return (
    <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-2xl bg-brand-tint/60">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="absolute rounded-full border border-brand/25"
          style={{ width: 80 + i * 56, height: 80 + i * 56 }}
        />
      ))}
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-brand text-ink-foreground">
        <Layers className="h-6 w-6" strokeWidth={1.7} />
      </span>
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="Features"
          title="All the essentials for modern productivity"
          body="Mobile, automation, workflows, and insights - all in sync and ready to go."
        />

        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {/* Wide mobile card */}
          <CardShell className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-2xl bg-brand-tint/60">
              <img
                src={ASSETS.mobileApp}
                alt="Mobile app preview showing projects and tasks"
                width={810}
                height={550}
                loading="lazy"
                className="h-52 w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03] md:h-64"
              />
            </div>
            <CardText
              icon={Sparkles}
              title="Work anywhere with our mobile app"
              body="Stay connected and productive on the go — the power of our platform in your pocket."
            />
          </CardShell>

          <CardShell>
            <ScaleVisual />
            <CardText
              icon={BarChart3}
              title="Performance that scales with you"
              body="Whether you're a 3-person startup or a growing enterprise."
            />
          </CardShell>

          <CardShell>
            <AutomationVisual />
            <CardText
              icon={Workflow}
              title="Smart automation"
              body="Reduce manual tasks with AI-driven workflows (like expense categorization or time tracking)."
            />
          </CardShell>

          <CardShell>
            <CollaborationVisual />
            <CardText
              icon={Users}
              title="Live collaboration"
              body="Team members stay aligned with real-time updates, comments, and notifications."
            />
          </CardShell>

          <CardShell>
            <img
              src={ASSETS.collaboration}
              alt=""
              width={500}
              height={300}
              loading="lazy"
              className="h-40 w-full rounded-2xl bg-brand-tint/60 object-cover"
            />
            <CardText
              icon={Puzzle}
              title="Custom workflows"
              body="Tailored to match your team's unique process with ease."
            />
          </CardShell>

          <CardShell>
            <InsightsVisual />
            <CardText
              icon={BarChart3}
              title="Clear insights"
              body="Intuitive dashboards and analytics to help you track progress and make informed decisions."
            />
          </CardShell>

          <CardShell>
            <IntegrationsVisual />
            <CardText
              icon={Puzzle}
              title="Tool integrations"
              body="Seamlessly connects with popular apps (e.g. Slack, Zoom, Mailchimp)."
            />
          </CardShell>

          <CardShell>
            <div className="flex h-40 items-center justify-center rounded-2xl bg-brand-tint/60">
              <img
                src={ASSETS.highlight}
                alt=""
                width={781}
                height={337}
                loading="lazy"
                className="h-full w-full rounded-2xl object-cover"
              />
            </div>
            <CardText
              icon={Layers}
              title="Adaptable & scalable"
              body="Designed for teams of all sizes with customization options to match your workflow."
            />
          </CardShell>
        </div>
      </div>
    </section>
  );
}
