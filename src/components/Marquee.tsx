import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type MarqueeProps = {
  children: ReactNode
  reverse?: boolean
  className?: string
}

/**
 * Infinite horizontal ticker. The children are rendered twice back-to-back;
 * the track animates -50% so the loop is seamless. Edges are feathered via
 * the `.marquee-mask` utility.
 */
const Marquee = ({ children, reverse, className }: MarqueeProps) => {
  return (
    <div className={cn('marquee-mask overflow-hidden', className)}>
      <div
        className={cn(
          'flex w-max will-change-transform',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee',
        )}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Marquee
