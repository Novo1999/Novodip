import Reveal from '@/components/Reveal'
import projectsData from '@/data/projects.json'
import { Link } from '@tanstack/react-router'
import { ArrowUpRight, Code2, Globe, Server } from 'lucide-react'
import type { ReactNode } from 'react'

type Project = {
  title: string
  description: string
  stack: string[]
  thumbnail: string
  live: string
  frontend: string
  backend: string
}

type ProjectLinkSet = Pick<Project, 'live' | 'frontend' | 'backend'>

const projects = projectsData.projects as Project[]
const [docuflash, moneymate] = projects
const rest = projects.slice(2)

const domainOf = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

const BG_WARM = 'radial-gradient(120% 120% at 80% 10%,#2a1a12,#0c0d0e)'
const BG_COOL = 'radial-gradient(120% 120% at 20% 10%,#12202a,#0c0d0e)'
const BG_EMBER = 'radial-gradient(120% 120% at 20% 10%,#241810,#0c0d0e)'
const BG_SAND = 'radial-gradient(120% 120% at 80% 10%,#1f1c14,#0c0d0e)'
/** Teal, picked to echo MoneyMate Mobile's own palette. */
const BG_TEAL = 'radial-gradient(120% 120% at 80% 10%,#0f2926,#0c0d0e)'

const DOCUFLASH_MOBILE_SHOTS = [
  {
    src: '/thumbnails/docuflash_1.jpeg',
    alt: 'Docuflash Mobile upload screen',
    tilt: '-5deg',
  },
  {
    src: '/thumbnails/docuflash_2.jpeg',
    alt: 'Docuflash Mobile uploads list',
    tilt: '0deg',
  },
  {
    src: '/thumbnails/docuflash_3.jpeg',
    alt: 'Docuflash Mobile profile screen',
    tilt: '5deg',
  },
]

const MONEYMATE_MOBILE_SHOTS = [
  {
    src: '/thumbnails/moneymate_mobile_3.jpg',
    alt: 'MoneyMate Mobile transactions list, filtered and grouped by day',
    tilt: '-5deg',
  },
  {
    src: '/thumbnails/moneymate_mobile_1.jpg',
    alt: 'MoneyMate Mobile dashboard with balance hero and spending donut',
    tilt: '0deg',
  },
  {
    src: '/thumbnails/moneymate_mobile_2.jpg',
    alt: 'MoneyMate Mobile accounts screen showing net worth',
    tilt: '5deg',
  },
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

/** Live / Frontend / Backend buttons — only renders the links that exist. */
const LINK_META = [
  { key: 'live', label: 'Live', Icon: Globe },
  { key: 'frontend', label: 'Frontend', Icon: Code2 },
  { key: 'backend', label: 'Backend', Icon: Server },
] as const

const ProjectLinks = ({
  links,
  className = '',
}: {
  links: ProjectLinkSet
  className?: string
}) => {
  const available = LINK_META.filter(({ key }) => links[key])
  if (available.length === 0) return null

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {available.map(({ key, label, Icon }) => (
        <a
          key={key}
          href={links[key]}
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

const cardShell =
  'mb-6 overflow-hidden rounded-[22px] border border-border bg-card transition-colors hover:border-primary'

/** Large web project card: browser screenshot on one side, details on the other. */
const FeaturedProject = ({
  project,
  number,
  background,
  reverse = false,
}: {
  project: Project
  number: string
  background: string
  reverse?: boolean
}) => (
  <Reveal>
    <div className={cardShell}>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <a
          href={project.live || project.frontend}
          target="_blank"
          rel="noreferrer"
          style={{ background }}
          className={`flex min-h-[300px] items-center justify-center border-b border-border p-8 md:border-b-0 md:p-10 ${
            reverse ? 'md:order-2 md:border-l' : 'md:order-1 md:border-r'
          }`}
        >
          <BrowserFrame project={project} />
        </a>

        <div
          className={`flex flex-col justify-between gap-8 p-7 md:p-13 ${
            reverse ? 'md:order-1' : 'md:order-2'
          }`}
        >
          <div>
            <span className="mb-5 block font-mono text-xs text-primary">
              {number} / FEATURED
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
            <ProjectLinks links={project} />
          </div>
        </div>
      </div>
    </div>
  </Reveal>
)

/** Mobile project card: tilted phone screenshots on one side, details on the other. */
const MobileShowcase = ({
  title,
  description,
  number,
  badge,
  stack,
  shots,
  background,
  reverse = false,
  children,
}: {
  title: string
  description: ReactNode
  number: string
  badge: string
  stack: string[]
  shots: Array<{ src: string; alt: string; tilt: string }>
  background: string
  reverse?: boolean
  children: ReactNode
}) => (
  <Reveal>
    <div className={cardShell}>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div
          style={{ background }}
          className={`flex min-h-[340px] items-center justify-center gap-4 overflow-hidden border-b border-border px-5 py-11 md:border-b-0 ${
            reverse ? 'md:order-2 md:border-l' : 'md:order-1 md:border-r'
          }`}
        >
          {shots.map((s, i) => (
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

        <div
          className={`flex flex-col justify-between gap-8 p-7 md:p-13 ${
            reverse ? 'md:order-1' : 'md:order-2'
          }`}
        >
          <div>
            <div className="mb-5 flex items-center gap-2.5">
              <span className="font-mono text-xs text-primary">
                {number} / MOBILE
              </span>
              <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground/70">
                {badge}
              </span>
            </div>
            <h3 className="m-0 mb-4 font-display text-[clamp(2.2rem,4vw,3.4rem)] font-bold leading-none tracking-[-0.03em]">
              {title}
            </h3>
            <p className="m-0 max-w-[46ch] text-[1.05rem] leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
          <div>
            <div className="mb-6 flex flex-wrap gap-2">
              {stack.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  </Reveal>
)

const ProjectsSection = () => (
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
            built.
          </h2>
        </div>
        <span className="font-mono text-[13px] text-muted-foreground/70">
          12 PROJECTS
        </span>
      </div>
    </Reveal>

    {/* 01 — Docuflash (web) */}
    <FeaturedProject project={docuflash} number="01" background={BG_WARM} />

    {/* 02 — Docuflash Mobile */}
    <MobileShowcase
      number="02"
      badge="EXPO"
      title="Docuflash Mobile"
      description="The React Native companion to Docuflash — pick up to 5 files, lock them behind a password, and hand out encrypted links that self-delete after 1 hour to 30 days. Native Google Sign-In, secure session storage, and light/dark theming."
      stack={[
        'Expo SDK 56',
        'React Native',
        'React 19',
        'Expo Router',
        'UploadThing',
        'TypeScript',
      ]}
      shots={DOCUFLASH_MOBILE_SHOTS}
      background={BG_SAND}
      reverse
    >
      <ProjectLinks
        links={{
          live: '',
          frontend: 'https://github.com/Novo1999/docuflash-mobile',
          backend: 'https://github.com/Novo1999/Docuflash-Backend',
        }}
      />
    </MobileShowcase>

    {/* 03 — Moneymate */}
    <FeaturedProject project={moneymate} number="03" background={BG_COOL} />

    {/* 04 — MoneyMate Mobile */}
    <MobileShowcase
      number="04"
      badge="EXPO"
      title="MoneyMate Mobile"
      description="The native client for MoneyMate, sharing the web app's backend and API contracts. Balance hero and category spending donut, day-grouped transactions with type/category filters, gradient account cards with transfers, and native Google sign-in — with tokens in secure storage and transparent refresh on 401."
      stack={[
        'Expo SDK 56',
        'React Native',
        'React 19',
        'Expo Router',
        'Jotai',
        'TypeScript',
      ]}
      shots={MONEYMATE_MOBILE_SHOTS}
      background={BG_TEAL}
      reverse
    >
      <ProjectLinks
        links={{
          live: '',
          frontend: 'https://github.com/Novo1999/moneymate-mobile',
          backend: 'https://github.com/Novo1999/moneymate-backend',
        }}
      />
    </MobileShowcase>

    {/* 05 — TaskaTask (private company product) */}
    <MobileShowcase
      number="05"
      badge="ENTERPRISE"
      title="TaskaTask"
      description={
        <>
          A field-service mobile app built at Dhrubok Infotech — in-app chat,
          live maps &amp; geolocation, and task scheduling. Shipped with Expo
          &amp; React Native, state managed with Redux.
        </>
      }
      stack={['React Native', 'Expo', 'Redux Toolkit', 'TypeScript']}
      shots={TASKATASK_SHOTS}
      background={BG_EMBER}
    >
      <Link
        to="/project"
        className="inline-flex items-center gap-1.5 font-semibold text-primary"
      >
        View case study <ArrowUpRight className="h-[18px] w-[18px]" />
      </Link>
    </MobileShowcase>

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
                  {String(i + 6).padStart(2, '0')}
                </span>
                <span className="absolute bottom-3 left-3.5 font-mono text-[10.5px] text-white/80 [text-shadow:0_1px_3px_rgba(0,0,0,0.8)]">
                  {domainOf(primary)}
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
                <ProjectLinks links={p} className="pt-1" />
              </div>
            </div>
          </Reveal>
        )
      })}
    </div>
  </section>
)

export default ProjectsSection
