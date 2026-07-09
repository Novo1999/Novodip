import experienceData from '@/data/experience.json'
import Reveal from '@/components/Reveal'

// Data is authored oldest-first; show most recent at the top.
const experiences = [...experienceData.experiences].reverse()

const ExperienceSection = () => {
  return (
    <section
      id="experience"
      data-screen-label="Experience"
      className="mx-auto max-w-[1280px] px-7 py-24"
    >
      <Reveal>
        <div className="mb-14 flex items-center gap-3.5">
          <span className="font-mono text-[13px] tracking-[0.05em] text-primary">
            03
          </span>
          <span className="h-px w-8 bg-white/20" />
          <span className="eyebrow">Experience</span>
        </div>
      </Reveal>

      <Reveal>
        <h2 className="m-0 mb-16 font-display text-[clamp(2.4rem,6vw,4.4rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">
          Where I&apos;ve worked.
        </h2>
      </Reveal>

      <div className="flex flex-col">
        {experiences.map((e) => (
          <Reveal key={e.company}>
            <div className="grid grid-cols-1 gap-5 border-t border-white/10 py-10 md:grid-cols-[240px_1fr]">
              <div className="flex items-center gap-4">
                <span className="h-[11px] w-[11px] shrink-0 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" />
                <span className="font-mono text-sm tracking-wide text-foreground/85">
                  {e.period}
                </span>
              </div>
              <div>
                <h3 className="m-0 mb-1 font-display text-[clamp(1.5rem,3vw,2.2rem)] font-bold leading-[1.05] tracking-[-0.02em]">
                  {e.role}
                </h3>
                <div className="mb-5 text-[1.05rem] font-semibold text-primary">
                  {e.company}
                </div>
                <ul className="m-0 flex list-none flex-col gap-3 p-0">
                  {e.description.map((d) => (
                    <li
                      key={d}
                      className="flex gap-3 text-[1.02rem] leading-normal text-muted-foreground"
                    >
                      <span className="shrink-0 text-primary">—</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
        <div className="border-t border-white/10" />
      </div>
    </section>
  )
}

export default ExperienceSection
