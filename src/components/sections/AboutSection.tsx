import aboutData from '@/data/about.json'
import Reveal from '@/components/Reveal'

const SectionLabel = ({ n, label }: { n: string; label: string }) => (
  <div className="mb-14 flex items-center gap-3.5">
    <span className="font-mono text-[13px] tracking-[0.05em] text-primary">
      {n}
    </span>
    <span className="h-px w-8 bg-white/20" />
    <span className="eyebrow">{label}</span>
  </div>
)

const AboutSection = () => {
  return (
    <section
      id="about"
      data-screen-label="About"
      className="mx-auto max-w-[1280px] px-7 py-24"
    >
      <Reveal>
        <SectionLabel n="01" label="About" />
      </Reveal>

      <div className="grid grid-cols-1 gap-14 md:grid-cols-[340px_1fr] md:items-start">
        <Reveal>
          <div className="relative w-[min(340px,80vw)]">
            <div className="pointer-events-none absolute inset-0 translate-x-4 translate-y-4 rounded-[20px] border-2 border-primary" />
            <img
              src="/portfolio-avatar.png"
              alt="Novodip"
              className="relative block w-full rounded-[20px] border border-border bg-card"
              loading="lazy"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="m-0 mb-8 max-w-[16ch] font-display text-[clamp(2.1rem,5vw,3.6rem)] font-bold leading-[1.02] tracking-[-0.03em]">
            {aboutData.heading.replace(/precision$/, '')}
            <span className="text-primary">precision.</span>
          </h2>

          {aboutData.paragraphs.map((p, i) => (
            <p
              key={i}
              className="mb-5 max-w-[60ch] text-[clamp(1rem,1.5vw,1.13rem)] leading-[1.7] text-muted-foreground last:mb-9"
            >
              {p}
            </p>
          ))}

          <div className="flex flex-wrap gap-2.5">
            {aboutData.highlights.map((h) => (
              <span
                key={h}
                className="rounded-full border border-border px-3.5 py-2 font-mono text-[12.5px] text-foreground/85 transition-colors hover:border-primary hover:text-primary"
              >
                {h}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default AboutSection
