import { ArrowUp } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'

/**
 * One-shot "made with Claude" intro. On page load it fakes a Claude prompt
 * being typed, submitted, and "thought about" (frolicking / fathoming /
 * schlepping) before dissolving to reveal the real site — all in ~3s.
 *
 * Mounted globally in __root.tsx so it plays once per full page load, not on
 * client-side route changes. Respects `prefers-reduced-motion`.
 */

const PROMPT =
  'Build me a sleek developer portfolio — projects, skills & contact.'
const WORDS = ['Frolicking', 'Fathoming', 'Schlepping', 'Shipping']

const TYPE_MS = 17 // per character
const AFTER_TYPE_MS = 240 // pause before "sending"
const WORD_MS = 300 // per thinking word
const EXIT_MS = 520 // reveal fade

type Phase = 'typing' | 'thinking' | 'done'

/** Approximation of the Claude sunburst — rays radiating from center. */
const RAYS = Array.from({ length: 12 }, (_, i) => (i * 360) / 12)
function ClaudeMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {RAYS.map((deg, i) => (
        <line
          key={i}
          x1="12"
          y1="12"
          x2="12"
          y2={i % 2 ? 4 : 2}
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
          transform={`rotate(${deg} 12 12)`}
        />
      ))}
    </svg>
  )
}

export default function IntroPrompt() {
  const reduce = useReducedMotion()
  // Skip the intro during local development.
  const [show, setShow] = useState(!import.meta.env.DEV)
  const [phase, setPhase] = useState<Phase>('typing')
  const [typed, setTyped] = useState('')
  const [wordIdx, setWordIdx] = useState(0)

  const skip = useCallback(() => setPhase('done'), [])

  // Lock scroll while the overlay is up.
  useEffect(() => {
    if (!show) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [show])

  // Reduced motion (or already dismissed): don't play the intro at all.
  useEffect(() => {
    if (reduce) setShow(false)
  }, [reduce])

  // Let the user bail out early.
  useEffect(() => {
    if (!show || phase === 'done') return
    window.addEventListener('keydown', skip)
    window.addEventListener('pointerdown', skip)
    return () => {
      window.removeEventListener('keydown', skip)
      window.removeEventListener('pointerdown', skip)
    }
  }, [show, phase, skip])

  // Phase: typing.
  useEffect(() => {
    if (reduce || phase !== 'typing') return
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setTyped(PROMPT.slice(0, i))
      if (i >= PROMPT.length) window.clearInterval(id)
    }, TYPE_MS)
    return () => window.clearInterval(id)
  }, [reduce, phase])

  // Advance typing -> thinking once the prompt is fully typed.
  useEffect(() => {
    if (phase !== 'typing' || typed !== PROMPT) return
    const id = window.setTimeout(() => setPhase('thinking'), AFTER_TYPE_MS)
    return () => window.clearTimeout(id)
  }, [phase, typed])

  // Phase: thinking — cycle the whimsical words, then finish.
  useEffect(() => {
    if (phase !== 'thinking') return
    const cycle = window.setInterval(() => setWordIdx((n) => n + 1), WORD_MS)
    const done = window.setTimeout(
      () => setPhase('done'),
      WORDS.length * WORD_MS,
    )
    return () => {
      window.clearInterval(cycle)
      window.clearTimeout(done)
    }
  }, [phase])

  if (!show) return null

  const ready = typed === PROMPT

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'done' ? 0 : 1 }}
      transition={{ duration: EXIT_MS / 1000, ease: [0.4, 0, 0.2, 1] }}
      onAnimationComplete={() => {
        if (phase === 'done') setShow(false)
      }}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-background px-6"
    >
      <div className="w-full max-w-xl">
        {/* wordmark */}
        <div className="mb-4 flex items-center gap-2.5 pl-1">
          <ClaudeMark className="h-5 w-5 text-primary" />
          <span className="font-display text-[17px] font-bold tracking-tight text-foreground">
            Claude
          </span>
          <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10.5px] text-muted-foreground">
            Opus 4.8
          </span>
        </div>

        {/* prompt card */}
        <div className="rounded-2xl border border-border bg-card/80 px-4 py-3.5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          <p className="min-h-[3.25rem] font-sans text-[15px] leading-relaxed text-foreground">
            {typed}
            {phase === 'typing' && (
              <span className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[3px] animate-[pulse-dot_1s_steps(2,start)_infinite] bg-primary align-middle" />
            )}
          </p>

          {/* bottom bar */}
          <div className="mt-2 flex h-9 items-center justify-between">
            <span className="rounded-md bg-secondary px-2 py-1 font-mono text-[11px] text-muted-foreground">
              claude-opus-4-8
            </span>

            <AnimatePresence mode="wait" initial={false}>
              {phase === 'thinking' ? (
                <motion.div
                  key="thinking"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-2"
                >
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="text-primary"
                  >
                    <ClaudeMark className="h-4 w-4" />
                  </motion.span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={wordIdx}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.16 }}
                      className="font-mono text-[13px] text-foreground"
                    >
                      {WORDS[wordIdx % WORDS.length]}…
                    </motion.span>
                  </AnimatePresence>
                  <span className="font-mono text-[11px] text-muted-foreground/70">
                    esc to interrupt
                  </span>
                </motion.div>
              ) : (
                <motion.button
                  key="send"
                  type="button"
                  aria-label="Send"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    scale: ready ? [1, 1.12, 0.92, 1] : 1,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: ready ? 0.32 : 0.15 }}
                  className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground"
                >
                  <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        <p className="mt-4 text-center font-mono text-[11px] text-muted-foreground/60">
          this portfolio was built with Claude
        </p>
      </div>
    </motion.div>
  )
}
