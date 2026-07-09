import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

const Header = () => {
  const [open, setOpen] = useState(false)

  // lock body scroll while the mobile sheet is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className="fixed inset-x-0 top-[3px] z-[150] border-b border-border/70 bg-background/55 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-5 px-7 py-4">
          <a href="#top" className="flex items-center gap-3 text-foreground">
            <span className="h-3 w-3 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
            <span className="font-display text-[19px] font-extrabold tracking-tight">
              Novodip
            </span>
          </a>

          {/* desktop nav */}
          <nav className="hidden items-center gap-0.5 md:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="rounded-lg px-3.5 py-2.5 text-[13.5px] font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href="/resume/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-[9px] bg-primary px-4 py-2.5 text-[13.5px] font-bold tracking-tight text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-6px_hsl(var(--primary))]"
            >
              Résumé ↗
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-[9px] border border-border text-lg text-foreground md:hidden"
            >
              ≡
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[180] flex flex-col bg-background/97 px-7 pb-10 pt-[90px] backdrop-blur-md"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute right-6 top-5 flex h-11 w-11 items-center justify-center rounded-[10px] border border-border text-2xl text-foreground"
            >
              ✕
            </button>
            {NAV.map((n, i) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className={`border-b border-white/10 py-3.5 font-display text-4xl font-bold tracking-tight ${
                  i === NAV.length - 1
                    ? 'border-none text-primary'
                    : 'text-foreground'
                }`}
              >
                {n.label}
                {i === NAV.length - 1 ? ' →' : ''}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
