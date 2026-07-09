import contactData from '@/data/contact.json'
import Reveal from '@/components/Reveal'
import Marquee from '@/components/Marquee'

const TICKER = ['AVAILABLE FOR WORK', "LET'S TALK", 'FRONTEND DEVELOPER']

const ContactSection = () => {
  return (
    <footer
      id="contact"
      data-screen-label="Contact"
      className="relative mt-15 overflow-hidden border-t border-border"
    >
      <div className="pointer-events-none absolute -bottom-[40%] left-1/2 h-[400px] w-4/5 -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,hsl(var(--primary)),transparent_70%)] opacity-10 blur-[60px]" />

      <div className="mx-auto max-w-[1280px] px-7 pt-24">
        <Reveal>
          <div className="mb-10 flex items-center gap-3.5">
            <span className="font-mono text-[13px] tracking-[0.05em] text-primary">
              05
            </span>
            <span className="h-px w-8 bg-white/20" />
            <span className="eyebrow">Contact</span>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="m-0 mb-11 font-display text-[clamp(3rem,11vw,9rem)] font-extrabold leading-[0.85] tracking-[-0.045em]">
            Let&apos;s build
            <br />
            something<span className="text-primary">.</span>
          </h2>
        </Reveal>

        <Reveal>
          <div className="mb-14 flex flex-wrap items-center gap-4">
            <a
              href="mailto:novorony52@gmail.com"
              className="inline-flex items-center gap-2.5 rounded-[13px] bg-primary px-7 py-[18px] text-[clamp(1rem,2vw,1.2rem)] font-bold tracking-tight text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-10px_hsl(var(--primary))]"
            >
              novorony52@gmail.com →
            </a>
            <a
              href="/resume/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-[13px] border border-border px-7 py-[18px] text-[clamp(1rem,2vw,1.2rem)] font-semibold text-foreground transition-colors hover:border-primary"
            >
              Download Résumé ↓
            </a>
          </div>
        </Reveal>

        <Reveal>
          <div className="mb-20 flex flex-wrap gap-3">
            {contactData.socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-border px-[18px] py-2.5 font-mono text-[13px] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {s.label.includes('@') ? 'Email' : s.label} ↗
              </a>
            ))}
          </div>
        </Reveal>
      </div>

      {/* footer marquee */}
      <div className="border-t border-border py-8">
        <Marquee reverse>
          {TICKER.map((t) => (
            <span
              key={t}
              className="whitespace-nowrap px-8 font-display text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-[-0.03em]"
            >
              {t} <span className="text-primary">✦</span>
            </span>
          ))}
        </Marquee>
      </div>

      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 border-t border-border px-7 py-7">
        <span className="font-mono text-xs text-muted-foreground/70">
          © 2026 Novodip. Built with care.
        </span>
        <a
          href="#top"
          className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground/70 transition-colors hover:text-primary"
        >
          BACK TO TOP ↑
        </a>
      </div>
    </footer>
  )
}

export default ContactSection
