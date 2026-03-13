import heroData from '@/data/hero.json'
import { ArrowDown } from 'lucide-react'
import { motion } from 'motion/react'

const HeroSection = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden dot-pattern"
      aria-label="Hero"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/10 blur-[120px] animate-glow-pulse pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border bg-secondary/50 text-sm text-muted-foreground mb-8">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {heroData.statusText}
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
              className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
            >
              Hi, I'm <span className="gradient-text">{heroData.name}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mb-4 font-light"
            >
              {heroData.title}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="text-base sm:text-lg text-muted-foreground/70 max-w-xl mb-12"
            >
              {heroData.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              className="flex items-center gap-4 justify-center lg:justify-start"
            >
              <a
                href={heroData.ctaPrimary.href}
                className="inline-flex items-center px-6 py-3 rounded-lg font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity btn-gradient"
              >
                {heroData.ctaPrimary.label}
              </a>
              <a
                href={heroData.ctaSecondary.href}
                className="inline-flex items-center px-6 py-3 rounded-lg font-medium border text-foreground hover:bg-secondary transition-colors"
              >
                {heroData.ctaSecondary.label}
              </a>
            </motion.div>
          </div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            className="flex-shrink-0 w-64 h-64 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px] relative"
          >
            <div className="absolute inset-0 rounded-full bg-primary/5 blur-[60px]" />
            <img
              src="https://picsum.photos/seed/picsum/200/300"
              alt="Abstract tech illustration representing modern web development"
              className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
              loading="eager"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ArrowDown className="w-5 h-5 text-muted-foreground animate-bounce" />
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
