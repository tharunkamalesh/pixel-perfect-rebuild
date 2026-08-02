import { Star } from "lucide-react";
import { TESTIMONIALS, type Testimonial } from "./content";
import { SectionHeading } from "./Features";

function QuoteCard({ item }: { item: Testimonial }) {
  return (
    <figure className="flex flex-col justify-between gap-6 rounded-[24px] border border-white/5 bg-[#0a0a0a] p-8">
      <blockquote className="text-[1.0625rem] leading-[1.65] text-[#A1A1A9]">
        {item.quote}
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
          <span className="block text-[0.875rem] font-medium text-white">{item.name}</span>
          <span className="block text-[0.8125rem] text-[#9CA3AF]">{item.company}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="section bg-black py-20 lg:py-32">
      <div className="mx-auto w-full lg:max-w-none px-6 lg:px-10 xl:px-16 2xl:px-20">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <h2 className="text-[3.5rem] font-semibold leading-[1.1] tracking-tight text-white lg:text-[4rem]">
            See how Accretion empowers<br />teams to achieve more
          </h2>
          <p className="mt-6 text-[1.125rem] leading-relaxed text-[#9CA3AF] max-w-4xl">
            Hear how our platform is helping teams deliver results faster, smarter, and efficiently.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

          {/* Column 1 */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-5 rounded-[24px] border border-white/5 bg-[#0a0a0a] p-8 lg:p-10">
              <div className="flex items-end justify-between">
                <p className="text-[3.5rem] font-bold leading-none tracking-tight text-white">
                  4.9<span className="text-[1.5rem] font-medium text-white/50">/5</span>
                </p>
                <div className="mb-2 flex gap-1 text-[#FF4800]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
              </div>

              <div className="mt-4 flex -space-x-3">
                {TESTIMONIALS.slice(0, 4).map((t) => (
                  <img
                    key={t.name}
                    src={t.avatar}
                    alt=""
                    loading="lazy"
                    className="h-10 w-10 rounded-full border-2 border-[#0a0a0a] object-cover"
                  />
                ))}
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#0a0a0a] bg-[#1a1a1a] text-[0.6875rem] font-medium text-white">
                  +82
                </span>
              </div>

              <p className="mt-1 text-[0.875rem] font-medium leading-snug text-white">
                Clients worldwide<br />
                <span className="font-normal text-[#9CA3AF]">who love our service</span>
              </p>

              <a href="#testimonials" className="mt-5 w-full rounded-xl bg-white/5 py-3.5 text-center text-[0.9375rem] font-medium text-white transition hover:bg-white/10">
                Leave a review
              </a>
            </div>

            <QuoteCard item={TESTIMONIALS[1]!} />
            <QuoteCard item={TESTIMONIALS[2]!} />
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-6">
            <QuoteCard item={TESTIMONIALS[3]!} />
            <QuoteCard item={TESTIMONIALS[4]!} />
            <QuoteCard item={TESTIMONIALS[5]!} />
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-6">
            <QuoteCard item={TESTIMONIALS[6]!} />

            <figure className="flex flex-col justify-between gap-6 rounded-[24px] border border-white/5 bg-[#0a0a0a] p-8">
              <blockquote className="text-[1.0625rem] leading-[1.65] text-[#A1A1A9]">
                Before Accretion, projects felt like a constant scramble. Now, automation handles the repetitive stuff, and the insights keep us on track without extra effort. It's rare to find a tool that actually delivers on the promise of making work easier, but this one really does.
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <img
                  src={TESTIMONIALS[9]!.avatar}
                  alt=""
                  loading="lazy"
                  className="h-9 w-9 rounded-full object-cover"
                />
                <span className="leading-tight">
                  <span className="block text-[0.875rem] font-medium text-white">Mateo A.</span>
                  <span className="block text-[0.8125rem] text-[#9CA3AF]">Stratus Technologies</span>
                </span>
              </figcaption>
            </figure>

            <QuoteCard item={TESTIMONIALS[7]!} />
          </div>

          {/* Column 4 */}
          <div className="flex flex-col gap-6">
            <QuoteCard item={TESTIMONIALS[0]!} />

            {/* Stat Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex min-h-[220px] flex-col justify-between rounded-[20px] bg-gradient-to-br from-[#FF5500] to-[#C21500] p-6 text-white shadow-[0_4px_40px_rgba(255,60,0,0.3)]">
                <div>
                  <p className="text-[2.75rem] font-bold leading-none tracking-tight">
                    29<span className="text-[1.5rem] font-medium">%</span>
                  </p>
                  <p className="mt-3 text-[0.9375rem] font-medium leading-[1.4]">Faster Project<br />Delivery</p>
                </div>
                <div className="flex items-center gap-1.5 text-[0.875rem] font-medium">
                  <span className="opacity-80">✦</span> Acme Corp
                </div>
              </div>
              <div className="flex min-h-[220px] flex-col justify-between rounded-[20px] border border-white/5 bg-[#141414] p-6">
                <div>
                  <p className="text-[2.75rem] font-bold leading-none tracking-tight text-white">
                    43<span className="text-[1.5rem] font-medium">%</span>
                  </p>
                  <p className="mt-3 text-[0.9375rem] font-medium leading-[1.4] text-[#9CA3AF]">Lower<br />Overhead<br />Costs</p>
                </div>
                <div className="flex items-center gap-1.5 text-[0.875rem] font-medium text-[#9CA3AF]">
                  <span className="opacity-80">///</span> Luminous
                </div>
              </div>
            </div>

            <QuoteCard item={TESTIMONIALS[8]!} />
          </div>

        </div>
      </div>
    </section>
  );
}
