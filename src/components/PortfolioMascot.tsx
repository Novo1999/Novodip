import { useEffect, useRef, useState } from 'react'
import AccentAvatar from '@/components/AccentAvatar'
import { cn } from '@/lib/utils'

type PortfolioMascotProps = {
  size?: number
  className?: string
  label?: string
}

// A lightweight cursor-tracking avatar: the head leans toward the pointer in 3D
// and gives a little bounce on click. Not the sprite-sheet `page-mascot` (that
// needs generated 9-direction sheets) — this reuses the real accent avatars.
const PortfolioMascot = ({
  size = 132,
  className,
  label = 'Novodip — say hi',
}: PortfolioMascotProps) => {
  const rootRef = useRef<HTMLButtonElement>(null)
  const tiltRef = useRef<HTMLSpanElement>(null)
  const frame = useRef<number | undefined>(undefined)
  const [reacting, setReacting] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const apply = (clientX: number, clientY: number) => {
      const root = rootRef.current
      const tilt = tiltRef.current
      if (!root || !tilt) return
      const rect = root.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      // soft-cap the distance so a far cursor doesn't slam to the max angle
      const reach = 320
      const nx = Math.max(-1, Math.min(1, (clientX - cx) / reach))
      const ny = Math.max(-1, Math.min(1, (clientY - cy) / reach))
      tilt.style.transform =
        `translate(${nx * 6}px, ${ny * 6}px) ` +
        `rotateX(${-ny * 16}deg) rotateY(${nx * 16}deg)`
    }

    const onMove = (e: MouseEvent) => {
      if (frame.current) return
      frame.current = requestAnimationFrame(() => {
        frame.current = undefined
        apply(e.clientX, e.clientY)
      })
    }

    const onLeave = () => {
      if (tiltRef.current) tiltRef.current.style.transform = ''
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [])

  return (
    <button
      ref={rootRef}
      type="button"
      aria-label={label}
      onClick={() => {
        setReacting(true)
        window.setTimeout(() => setReacting(false), 520)
      }}
      className={cn('group relative shrink-0 select-none', className)}
      style={{ width: size, height: size, perspective: 640 }}
    >
      {/* accent glow behind the head */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-2 rounded-full bg-[radial-gradient(circle,hsl(var(--primary)),transparent_70%)] opacity-25 blur-xl"
      />
      <span
        className={cn('block h-full w-full', reacting && 'animate-mascot-pop')}
      >
        <span
          ref={tiltRef}
          className="block h-full w-full rounded-full ring-1 ring-border transition-transform duration-300 ease-out will-change-transform [transform-style:preserve-3d]"
        >
          <AccentAvatar
            alt=""
            className="h-full w-full rounded-full object-cover"
          />
        </span>
      </span>
    </button>
  )
}

export default PortfolioMascot
