import skillsData from '@/data/skills.json'
import Reveal from '@/components/Reveal'

const SkillsSection = () => {
  return (
    <section
      id="skills"
      data-screen-label="Skills"
      className="mx-auto max-w-[1280px] px-7 py-24"
    >
      <Reveal>
        <div className="mb-14 flex items-center gap-3.5">
          <span className="font-mono text-[13px] tracking-[0.05em] text-primary">
            04
          </span>
          <span className="h-px w-8 bg-white/20" />
          <span className="eyebrow">Capabilities</span>
        </div>
      </Reveal>

      <Reveal>
        <h2 className="m-0 mb-16 font-display text-[clamp(2.4rem,6vw,4.4rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">
          The stack I
          <br />
          build with.
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {skillsData.groups.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.06}>
            <div className="flex h-full flex-col gap-6 rounded-[20px] border border-border bg-card p-8 transition-colors hover:border-primary/35">
              <div className="flex items-baseline justify-between">
                <h3 className="m-0 font-display text-[1.5rem] font-bold tracking-[-0.02em]">
                  {g.title}
                </h3>
                <span className="font-mono text-[13px] text-white/25">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {g.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border bg-white/[0.045] px-4 py-2.5 text-[14.5px] font-medium text-foreground/85 transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default SkillsSection
