import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

// Keep in sync with the :root[data-accent] blocks in styles.css and the
// ACCENT_INIT_SCRIPT in routes/__root.tsx.
const ACCENTS = [
  { id: 'orange', label: 'Orange', hsl: '12 100% 60%' },
  { id: 'teal', label: 'Teal', hsl: '172 66% 50%' },
  { id: 'blue', label: 'Blue', hsl: '217 91% 60%' },
  { id: 'yellow', label: 'Yellow', hsl: '45 100% 55%' },
] as const

type AccentId = (typeof ACCENTS)[number]['id']

function applyAccent(accent: AccentId) {
  if (accent === 'orange') {
    document.documentElement.removeAttribute('data-accent')
  } else {
    document.documentElement.setAttribute('data-accent', accent)
  }
}

function getInitialAccent(): AccentId {
  if (typeof window === 'undefined') {
    return 'orange'
  }

  const stored = window.localStorage.getItem('accent')
  return ACCENTS.some((a) => a.id === stored) ? (stored as AccentId) : 'orange'
}

const AccentPicker = () => {
  const [accent, setAccent] = useState<AccentId>('orange')
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setAccent(getInitialAccent())
  }, [])

  // close on outside click / Escape
  useEffect(() => {
    if (!open) {
      return
    }

    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  function pickAccent(next: AccentId) {
    setAccent(next)
    applyAccent(next)
    window.localStorage.setItem('accent', next)
    setOpen(false)
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Choose accent color"
        aria-expanded={open}
        title="Accent color"
        className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-[9px] border border-border text-foreground transition-colors hover:bg-white/5"
      >
        <span className="h-3.5 w-3.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.16 }}
            role="menu"
            aria-label="Accent colors"
            className="absolute right-0 top-[calc(100%+10px)] flex items-center gap-2 rounded-[12px] border border-border bg-popover/95 p-2.5 shadow-[var(--shadow-card)] backdrop-blur-xl"
          >
            {ACCENTS.map((a) => (
              <button
                key={a.id}
                type="button"
                role="menuitemradio"
                aria-checked={accent === a.id}
                aria-label={a.label}
                title={a.label}
                onClick={() => pickAccent(a.id)}
                className={`h-6 w-6 rounded-full border-2 transition-transform hover:scale-110 ${
                  accent === a.id ? 'border-foreground' : 'border-transparent'
                }`}
                style={{ backgroundColor: `hsl(${a.hsl})` }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AccentPicker
