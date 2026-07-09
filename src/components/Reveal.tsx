import type { ReactNode } from 'react'
import { motion } from 'motion/react'

type RevealProps = {
  children: ReactNode
  /** stagger delay in seconds */
  delay?: number
  /** vertical offset the element rises from */
  y?: number
  className?: string
}

/**
 * Scroll-triggered reveal. Fades + rises into view once, respecting the
 * `prefers-reduced-motion` fallback declared in styles.css.
 */
const Reveal = ({ children, delay = 0, y = 26, className }: RevealProps) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default Reveal
