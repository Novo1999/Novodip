import { motion, useScroll, useSpring } from 'motion/react'

/**
 * Fixed 3px progress bar pinned to the very top of the viewport.
 * Uses Framer Motion's scroll progress (0 → 1) mapped to scaleX.
 */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[200] h-[3px] origin-left bg-primary shadow-[0_0_12px_hsl(var(--primary))]"
    />
  )
}

export default ScrollProgress
