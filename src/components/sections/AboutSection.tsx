import aboutData from '@/data/about.json'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const highlightWords = (text: string, highlights: string[]) => {
  const parts = text.split(new RegExp(`(${highlights.join('|')})`, 'g'))
  return parts.map((part, i) =>
    highlights.includes(part) ? (
      <span key={i} className="text-foreground font-medium">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}

const AboutSection = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-32 relative" aria-label="About me">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          <p className="text-sm font-mono text-primary mb-4">
            {aboutData.sectionLabel}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            {aboutData.heading.split('precision')[0]}
            <span className="gradient-text">precision</span>
          </h2>
          <div className="space-y-5 text-muted-foreground text-lg leading-relaxed text-justify">
            {aboutData.paragraphs.map((p, i) => (
              <p key={i}>{highlightWords(p, aboutData.highlights)}</p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection
