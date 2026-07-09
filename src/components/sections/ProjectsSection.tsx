import Reveal from '@/components/Reveal'
import projectsData from '@/data/projects.json'
import { Link } from '@tanstack/react-router'
import { ArrowUpRight, Code2, Globe, Server } from 'lucide-react'

type Project = {
  title: string
  description: string
  stack: string[]
  thumbnail: string
  live: string
  frontend: string
  backend: string
}

const projects = projectsData.projects as Project[]

const domainOf = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

const TASKATASK_SHOTS = [
  { src: '/Taskatask/taskatask-chat.jpg', alt: 'TaskaTask chat', tilt: '-5deg' },
  { src: '/Taskatask/taskatask-map.jpg', alt: 'TaskaTask live map', tilt: '0deg' },
  {
    src: '/Taskatask/taskatask-createtask.jpg',
    alt: 'TaskaTask create task',
    tilt: '5deg',
  },
]

const Tag = ({ children }: { children: string }) => (
  <span className="tag">{children}</span>
)

/** Live / Frontend / Backend buttons — only renders the links that exist. */
const LINK_META = [
  { key: 'live', label: 'Live', Icon: Globe },
  { key: 'frontend', label: 'Frontend', Icon: Code2 },
  { key: 'backend', label: 'Backend', Icon: Server },
] as const

const ProjectLinks = ({
  project,
  className = '',
}: {
  project: Project
  className?: string
}) => {
  const links = LINK_META.filter(({ key }) => project[key])
  if (links.length === 0) return null

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {links.map(({ key, label, Icon }) => (
        <a
          key={key}
          href={project[key]}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[12.5px] font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </a>
      ))}
    </div>
  )
}

/** Screenshot inside a faux browser chrome, used in the featured cards. */
const BrowserFrame = ({ project }: { project: Project }) => (
  <div className="w-full max-w-[460px] overflow-hidden rounded-xl border border-white/10 bg-card shadow-[var(--shadow-card)]">
    <div className="flex items-center gap-1.5 bg-secondary px-3.5 py-3">
      <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
      <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
      <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
      <span className="ml-2.5 font-mono text-[10.5px] text-muted-foreground/70">
        {domainOf(project.live || project.frontend)}
      </span>
    </div>
    <img
      src={project.thumbnail}
      alt={`${project.title} preview`}
      className="block w-full"
      loading="lazy"
    />
  </div>
)

const FEATURE_BG = [
  'radial-gradient(120% 120% at 80% 10%,#2a1a12,#0c0d0e)',
  'radial-gradient(120% 120% at 20% 10%,#12202a,#0c0d0e)',
]

const FeaturedProject = ({
  project,
  index,
  reverse = false,
}: {
  project: Project
  index: number
  reverse?: boolean
}) => (
  <Reveal>
    <div className="mb-6 overflow-hidden rounded-[22px] border border-border bg-card transition-colors hover:border-primary">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* preview */}
        <a
          href={project.live || project.frontend}
          target="_blank"
          rel="noreferrer"
          style={{ background: FEATURE_BG[index % FEATURE_BG.length] }}
          className={`flex min-h-[300px] items-center justify-center border-b border-border p-8 md:border-b-0 md:p-10 ${
            reverse ? 'md:order-2 md:border-l' : 'md:order-1 md:border-r'
          }`}
        >
          <BrowserFrame project={project} />
        </a>

        {/* details */}
        <div
          className={`flex flex-col justify-between gap-8 p-7 md:p-13 ${
            reverse ? 'md:order-1' : 'md:order-2'
          }`}
        >
          <div>
            <span className="mb-5 block font-mono text-xs text-primary">
              {String(index + 1).padStart(2, '0')} / FEATURED
            </span>
            <h3 className="m-0 mb-4 font-display text-[clamp(2.2rem,4vw,3.4rem)] font-bold leading-none tracking-[-0.03em]">
              {project.title}
            </h3>
            <p className="m-0 max-w-[46ch] text-[1.05rem] leading-relaxed text-muted-foreground">
              {project.description}
            </p>
          </div>
          <div>
            <div className="mb-6 flex flex-wrap gap-2">
              {project.stack.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
            <ProjectLinks project={project} />
          </div>
        </div>
      </div>
    </div>
  </Reveal>
)

const ProjectsSection = () => {
  const featured = projects.slice(0, 2) // Docuflash, Moneymate
  const rest = projects.slice(2)

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
            10 PROJECTS
          </span>
        </div>
      </Reveal>

      {/* FEATURED — Docuflash, then Moneymate */}
      {featured.map((project, i) => (
        <FeaturedProject
          key={project.title}
          project={project}
          index={i}
          reverse={i % 2 === 1}
        />
      ))}

      {/* TaskaTask — private mobile product, screenshots on the case-study page */}
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
                    03 / MOBILE
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
                <Link
                  to="/project"
                  className="inline-flex items-center gap-1.5 font-semibold text-primary"
                >
                  View case study <ArrowUpRight className="h-[18px] w-[18px]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* COMPACT GRID — remaining projects */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((p, i) => {
          const primary = p.live || p.frontend
          return (
            <Reveal key={p.title} delay={(i % 3) * 0.06}>
              <div className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-border bg-card transition-all hover:-translate-y-1.5 hover:border-primary">
                <a
                  href={primary || undefined}
                  target={primary ? '_blank' : undefined}
                  rel={primary ? 'noreferrer' : undefined}
                  className="relative block aspect-[16/10] overflow-hidden border-b border-border bg-secondary"
                >
                  <img
                    src={p.thumbnail}
                    alt={`${p.title} preview`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute right-3 top-3 rounded bg-black/50 px-1.5 py-0.5 font-mono text-[11px] text-primary backdrop-blur-sm">
                    {String(i + 4).padStart(2, '0')}
                  </span>
                  <span className="absolute bottom-3 left-3.5 font-mono text-[10.5px] text-white/80 [text-shadow:0_1px_3px_rgba(0,0,0,0.8)]">
                    {domainOf(p.live || p.frontend)}
                  </span>
                </a>
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
                  <ProjectLinks project={p} className="pt-1" />
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

export default ProjectsSection
