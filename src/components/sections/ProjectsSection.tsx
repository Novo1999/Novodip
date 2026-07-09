import projectsData from '@/data/projects.json'
import Reveal from '@/components/Reveal'
import { ArrowUpRight } from 'lucide-react'

type Project = {
  title: string
  description: string
  stack: string[]
  github: string[]
  live: string
}

const projects = projectsData.projects as Project[]

const domainOf = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

const GRADS = [
  'radial-gradient(120% 120% at 75% 15%,#1a1c22,#0d0e10)',
  'radial-gradient(120% 120% at 25% 15%,#221a1c,#0d0e10)',
  'radial-gradient(120% 120% at 75% 85%,#1a2220,#0d0e10)',
  'radial-gradient(120% 120% at 25% 85%,#1c1a22,#0d0e10)',
  'radial-gradient(120% 120% at 50% 15%,#22201a,#0d0e10)',
  'radial-gradient(120% 120% at 80% 50%,#181f22,#0d0e10)',
  'radial-gradient(120% 120% at 20% 50%,#201a1e,#0d0e10)',
]

const TASKATASK_SHOTS = [
  {
    src: '/Taskatask/taskatask-chat.jpg',
    alt: 'TaskaTask chat',
    tilt: '-5deg',
  },
  {
    src: '/Taskatask/taskatask-map.jpg',
    alt: 'TaskaTask live map',
    tilt: '0deg',
  },
  {
    src: '/Taskatask/taskatask-createtask.jpg',
    alt: 'TaskaTask create task',
    tilt: '5deg',
  },
]

const Tag = ({ children }: { children: string }) => (
  <span className="tag">{children}</span>
)

const ProjectsSection = () => {
  const feature = projects[0] // Moneymate
  const rest = projects.slice(1) // remaining 7

  return (
    <section
      id="work"
      data-screen-label="Projects"
      className="mx-auto max-w-[1280px] px-7 py-24"
    >
      {/* header */}
      <Reveal>
        <div className="mb-15 flex flex-wrap items-end justify-between gap-5">
          <div>
            <div className="mb-5 flex items-center gap-3.5">
              <span className="font-mono text-[13px] tracking-[0.05em] text-primary">
                02
              </span>
              <span className="h-px w-8 bg-white/20" />
              <span className="eyebrow">Selected Work</span>
            </div>
            <h2 className="m-0 font-display text-[clamp(2.6rem,7vw,5.2rem)] font-extrabold leading-[0.92] tracking-[-0.04em]">
              Things I&apos;ve
              <br />
              shipped.
            </h2>
          </div>
          <span className="font-mono text-[13px] text-muted-foreground/70">
            09 PROJECTS
          </span>
        </div>
      </Reveal>

      {/* FEATURE 1 — Moneymate */}
      <Reveal>
        <a
          href={feature.live}
          target="_blank"
          rel="noreferrer"
          className="group mb-6 block overflow-hidden rounded-[22px] border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary"
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.05fr]">
            <div className="flex flex-col justify-between gap-8 p-7 md:p-13">
              <div>
                <span className="mb-5 block font-mono text-xs text-primary">
                  01 / FEATURED
                </span>
                <h3 className="m-0 mb-4 font-display text-[clamp(2.2rem,4vw,3.4rem)] font-bold leading-none tracking-[-0.03em]">
                  {feature.title}
                </h3>
                <p className="m-0 max-w-[46ch] text-[1.05rem] leading-relaxed text-muted-foreground">
                  A modern personal-finance platform to track transactions and
                  manage your financial history — full-stack, fast, and clean.
                </p>
              </div>
              <div>
                <div className="mb-6 flex flex-wrap gap-2">
                  {feature.stack.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
                <span className="inline-flex items-center gap-2 font-semibold text-primary">
                  Live Demo <ArrowUpRight className="h-[18px] w-[18px]" />
                </span>
              </div>
            </div>

            {/* stylized dashboard mock */}
            <div className="flex min-h-[280px] items-center justify-center border-t border-border bg-[radial-gradient(120%_120%_at_80%_10%,#2a1a12,#0c0d0e)] p-10 md:border-l md:border-t-0">
              <div className="w-full max-w-[420px] overflow-hidden rounded-xl border border-white/10 bg-card shadow-[var(--shadow-card)]">
                <div className="flex items-center gap-1.5 bg-secondary px-3.5 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="ml-2.5 font-mono text-[10.5px] text-muted-foreground/70">
                    {domainOf(feature.live)}
                  </span>
                </div>
                <div className="p-[22px]">
                  <div className="mb-2 font-mono text-[10px] tracking-widest text-muted-foreground/70">
                    TOTAL BALANCE
                  </div>
                  <div className="mb-5 font-display text-[32px] font-extrabold tracking-tight">
                    $24,830<span className="text-primary">.50</span>
                  </div>
                  <div className="mb-4 flex h-[70px] items-end gap-1.5">
                    {[40, 65, 50, 85, 55, 72].map((h, i) => (
                      <div
                        key={i}
                        style={{ height: `${h}%` }}
                        className={`flex-1 rounded ${i === 3 ? 'bg-primary' : 'bg-white/10'}`}
                      />
                    ))}
                  </div>
                  <div className="mb-2.5 h-2.5 w-full rounded bg-white/[0.07]" />
                  <div className="h-2.5 w-[70%] rounded bg-white/[0.07]" />
                </div>
              </div>
            </div>
          </div>
        </a>
      </Reveal>

      {/* FEATURE 2 — TaskaTask (device mockup) */}
      <Reveal>
        <div className="mb-6 overflow-hidden rounded-[22px] border border-border bg-card transition-colors hover:border-primary">
          <div className="grid grid-cols-1 md:grid-cols-[1.05fr_1fr]">
            <div className="flex min-h-[340px] items-center justify-center gap-4 overflow-hidden border-b border-border bg-[radial-gradient(120%_120%_at_20%_10%,#241810,#0c0d0e)] px-5 py-11 md:border-b-0 md:border-r">
              {TASKATASK_SHOTS.map((s, i) => (
                <div
                  key={s.src}
                  style={{
                    transform: `rotate(${s.tilt}) translateY(${i === 1 ? 0 : 14}px)`,
                  }}
                  className={`w-[150px] overflow-hidden rounded-[22px] border-[5px] border-[#1b1b1e] shadow-[var(--shadow-card)] ${
                    i === 1 ? 'z-10 w-[158px]' : ''
                  }`}
                >
                  <img
                    src={s.src}
                    alt={s.alt}
                    className="block w-full"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-between gap-8 p-7 md:p-13">
              <div>
                <div className="mb-5 flex items-center gap-2.5">
                  <span className="font-mono text-xs text-primary">
                    02 / MOBILE
                  </span>
                  <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground/70">
                    ENTERPRISE
                  </span>
                </div>
                <h3 className="m-0 mb-4 font-display text-[clamp(2.2rem,4vw,3.4rem)] font-bold leading-none tracking-[-0.03em]">
                  TaskaTask
                </h3>
                <p className="m-0 max-w-[46ch] text-[1.05rem] leading-relaxed text-muted-foreground">
                  A field-service mobile app built at Dhrubok Infotech — in-app
                  chat, live maps &amp; geolocation, and task scheduling.
                  Shipped with Expo &amp; React Native, state managed with
                  Redux.
                </p>
              </div>
              <div>
                <div className="mb-6 flex flex-wrap gap-2">
                  {['React Native', 'Expo', 'Redux Toolkit', 'TypeScript'].map(
                    (t) => (
                      <Tag key={t}>{t}</Tag>
                    ),
                  )}
                </div>
                <span className="font-mono text-sm text-muted-foreground/70">
                  Private company product
                </span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* COMPACT GRID — remaining 7 */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((p, i) => (
          <Reveal key={p.title} delay={(i % 3) * 0.06}>
            <a
              href={p.live}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-border bg-card transition-all hover:-translate-y-1.5 hover:border-primary"
            >
              <div
                className="relative flex h-[150px] items-center justify-center overflow-hidden border-b border-border"
                style={{ background: GRADS[i % GRADS.length] }}
              >
                <span className="font-display text-[110px] font-extrabold leading-none tracking-[-0.04em] text-white/[0.05]">
                  {p.title.charAt(0)}
                </span>
                <span className="absolute bottom-3 left-3.5 font-mono text-[10.5px] text-muted-foreground/60">
                  {domainOf(p.live)}
                </span>
                <span className="absolute right-3.5 top-3 font-mono text-[11px] text-primary">
                  {String(i + 3).padStart(2, '0')}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3.5 p-[22px]">
                <div className="flex items-center justify-between gap-2.5">
                  <h3 className="m-0 font-display text-[1.45rem] font-bold tracking-[-0.02em]">
                    {p.title}
                  </h3>
                  <ArrowUpRight className="h-[18px] w-[18px] shrink-0 text-primary" />
                </div>
                <p className="m-0 flex-1 text-[0.92rem] leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-border px-2.5 py-1 font-mono text-[10.5px] text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default ProjectsSection
