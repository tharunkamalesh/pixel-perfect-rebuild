import { Star } from "lucide-react";
import { TESTIMONIALS, type Testimonial } from "./content";
import { SectionHeading } from "./Features";

function QuoteCard({ item }: { item: Testimonial }) {
  return (
    <figure className="card flex w-[320px] shrink-0 flex-col justify-between gap-5 p-6 md:w-[380px]">
      <blockquote className="text-[0.9375rem] leading-relaxed text-body">
        “{item.quote}”
      </blockquote>
      <figcaption className="flex items-center gap-3">
        <img
          src={item.avatar}
          alt=""
          width={128}
          height={128}
          loading="lazy"
          className="h-9 w-9 rounded-full object-cover"
        />
        <span className="leading-tight">
          <span className="block text-[0.875rem] font-medium text-foreground">{item.name}</span>
          <span className="block text-[0.8125rem] text-subtle">{item.company}</span>
        </span>
      </figcaption>
    </figure>
  );
}

function Row({ items, reverse = false }: { items: Testimonial[]; reverse?: boolean }) {
  return (
    <div className="marquee-mask overflow-hidden">
      <div
        className="marquee-track flex w-max gap-4"
        style={{
          animation: `marquee ${reverse ? 68 : 52}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {[...items, ...items].map((item, i) => (
          <QuoteCard key={`${item.name}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  const firstRow = TESTIMONIALS.slice(0, 5);
  const secondRow = TESTIMONIALS.slice(5);

  return (
    <section id="testimonials" className="section pt-0">
      <div className="shell">
        <SectionHeading
          eyebrow="Testimonials"
          title="See how Accretion empowers teams to achieve more"
          body="Hear how our platform is helping teams deliver results faster, smarter, and efficiently."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <div className="card flex flex-col items-start gap-4 p-6">
            <div className="flex items-center gap-1 text-brand">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="text-[2.5rem] leading-none font-medium tracking-tight">
              4.9
              <span className="text-[1.25rem] text-subtle">/5</span>
            </p>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {TESTIMONIALS.slice(0, 4).map((t) => (
                  <img
                    key={t.name}
                    src={t.avatar}
                    alt=""
                    width={128}
                    height={128}
                    loading="lazy"
                    className="h-8 w-8 rounded-full border-2 border-surface object-cover"
                  />
                ))}
                <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-surface bg-ink text-[0.6875rem] font-medium text-ink-foreground">
                  +82
                </span>
              </div>
              <p className="text-[0.8125rem] leading-tight text-subtle">
                Clients worldwide
                <br />
                who love our service
              </p>
            </div>
            <a href="#testimonials" className="btn btn-ghost mt-auto">
              Leave a review
            </a>
          </div>

          <div className="card-dark flex flex-col justify-between gap-6 p-6">
            <p className="text-[0.9375rem] leading-relaxed text-white/75">
              “Accretion has completely changed how we organize our work. Our team finally has one
              place to keep tasks, updates, and files without getting lost in endless threads.”
            </p>
            <div className="flex items-center gap-3">
              <img
                src={TESTIMONIALS[0]!.avatar}
                alt=""
                width={128}
                height={128}
                loading="lazy"
                className="h-9 w-9 rounded-full object-cover"
              />
              <span className="leading-tight">
                <span className="block text-[0.875rem] font-medium text-white">Marcus C.</span>
                <span className="block text-[0.8125rem] text-white/45">Corebyte</span>
              </span>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="card grid grid-cols-2 gap-4 p-6">
              <div>
                <p className="text-[2rem] leading-none font-medium tracking-tight text-brand">
                  29<span className="text-[1.25rem]">%</span>
                </p>
                <p className="mt-2 text-[0.8125rem] text-subtle">Faster Project Delivery</p>
              </div>
              <div>
                <p className="text-[2rem] leading-none font-medium tracking-tight text-brand">
                  43<span className="text-[1.25rem]">%</span>
                </p>
                <p className="mt-2 text-[0.8125rem] text-subtle">Lower Overhead Costs</p>
              </div>
            </div>
            <figure className="card flex flex-1 flex-col justify-between gap-5 p-6">
              <blockquote className="text-[0.9375rem] leading-relaxed text-body">
                “We tried three other platforms before this one. None of them clicked with the team.
                This did, almost instantly.”
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <img
                  src={TESTIMONIALS[8]!.avatar}
                  alt=""
                  width={128}
                  height={128}
                  loading="lazy"
                  className="h-9 w-9 rounded-full object-cover"
                />
                <span className="leading-tight">
                  <span className="block text-[0.875rem] font-medium">Lucas M.</span>
                  <span className="block text-[0.8125rem] text-subtle">SummitFlow</span>
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4">
        <Row items={firstRow} />
        <Row items={secondRow} reverse />
      </div>
    </section>
  );
}
