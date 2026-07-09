import heroData from '@/data/hero.json'
import Marquee from '@/components/Marquee'
import { motion } from 'motion/react'

type IconProps = { className?: string }

const GithubMark = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

const LinkedinMark = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
)

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/Novo1999', Icon: GithubMark },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/novodip/',
    Icon: LinkedinMark,
  },
]

const STACK = [
  'React',
  'Next.js',
  'TypeScript',
  'React Native',
  'Tailwind CSS',
  'Node.js',
  'PostgreSQL',
  'Expo',
  'Redux',
]

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] as const },
})

const HeroSection = () => {
  return (
    <section
      id="top"
      data-screen-label="Hero"
      className="relative mx-auto flex min-h-screen max-w-[1280px] flex-col justify-center px-7 pt-[150px]"
      aria-label="Hero"
    >
      {/* ambient orange glow + grid */}
      <div className="pointer-events-none absolute right-[6%] top-[14%] h-[340px] w-[340px] animate-float rounded-full bg-[radial-gradient(circle,hsl(var(--primary)),transparent_68%)] opacity-20 blur-[70px]" />
      <div className="grid-bg pointer-events-none absolute inset-0" />

      <div className="relative">
        {/* status row */}
        <motion.div
          {...rise(0)}
          className="mb-8 flex flex-wrap items-center gap-4"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/[0.06] px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.06em] text-primary">
            <span className="h-2 w-2 animate-pulse-dot rounded-full bg-primary" />
            {heroData.statusText}
          </span>
          <span className="font-mono text-xs tracking-[0.1em] text-muted-foreground/70">
            PORTFOLIO — DHAKA, BD / 2026
          </span>
        </motion.div>

        <motion.h1
          {...rise(0.08)}
          className="m-0 font-display text-[clamp(4.2rem,17vw,15.5rem)] font-extrabold leading-[0.82] tracking-[-0.045em]"
        >
          {heroData.name}
        </motion.h1>

        <motion.div
          {...rise(0.16)}
          className="mt-5 flex flex-wrap items-end justify-between gap-10"
        >
          <div className="max-w-[640px]">
            <p className="mb-5 font-display text-[clamp(1.4rem,3.4vw,2.35rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
              Frontend Developer <span className="text-primary">/</span> React
              &amp; Next.js Specialist
            </p>
            <p className="m-0 max-w-[520px] text-[clamp(1rem,2vw,1.18rem)] leading-relaxed text-muted-foreground">
              {heroData.tagline}
            </p>
          </div>

          {/* rotating badge */}
          <div className="relative h-[132px] w-[132px] shrink-0 animate-spin-slow">
            <svg viewBox="0 0 132 132" className="h-full w-full">
              <defs>
                <path
                  id="circPath"
                  d="M 66,66 m -50,0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"
                />
              </defs>
              <text
                fill="hsl(var(--muted-foreground))"
                className="font-mono"
                style={{ fontSize: 11, letterSpacing: '0.28em' }}
              >
                <textPath href="#circPath">
                  OPEN&nbsp;TO&nbsp;WORK&nbsp;•&nbsp;LET&apos;S&nbsp;BUILD&nbsp;•&nbsp;
                </textPath>
              </text>
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-3xl text-primary">
              ↓
            </span>
          </div>
        </motion.div>

        {/* CTAs + socials */}
        <motion.div
          {...rise(0.24)}
          className="mt-11 flex flex-wrap items-center gap-3.5"
        >
          <a
            href={heroData.ctaPrimary.href}
            className="inline-flex items-center gap-2.5 rounded-[11px] bg-primary px-6 py-4 text-base font-bold tracking-tight text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-8px_hsl(var(--primary))]"
          >
            {heroData.ctaPrimary.label} →
          </a>
          <a
            href={heroData.ctaSecondary.href}
            className="inline-flex items-center gap-2.5 rounded-[11px] border border-border px-6 py-4 text-base font-semibold text-foreground transition-all hover:border-primary hover:bg-white/[0.03]"
          >
            {heroData.ctaSecondary.label}
          </a>
          <div className="ml-1.5 flex gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="inline-flex h-[50px] w-[50px] items-center justify-center rounded-[11px] border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <s.Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* hero marquee */}
      <div className="mt-auto py-11 pb-6">
        <Marquee>
          {STACK.map((t) => (
            <span
              key={t}
              className="whitespace-nowrap px-6 font-display text-[clamp(1.6rem,3vw,2.4rem)] font-bold tracking-tight text-white/10"
            >
              {t} <span className="text-primary/30">✦</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  )
}

export default HeroSection
