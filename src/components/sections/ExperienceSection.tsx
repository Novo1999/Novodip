import experienceData from '@/data/experience.json'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ExperienceSection = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="experience"
      className="py-32 relative"
      aria-label="Work experience"
    >
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm font-mono text-primary mb-4">
            {experienceData.sectionLabel}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-16">
            {experienceData.heading}
          </h2>
        </motion.div>

        <div className="relative max-w-2xl">
          <div
            className="absolute left-[7px] top-2 bottom-2 w-px bg-white/50"
            aria-hidden="true"
          />

          <div className="space-y-12">
            {experienceData.experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="relative pl-10"
              >
                <div
                  className="absolute left-0 top-2 w-[15px] h-[15px] rounded-full bg-background gradient-border"
                  aria-hidden="true"
                />
                <p className="text-xs font-mono text-primary mb-1">
                  {exp.period}
                </p>
                <h3 className="text-lg font-semibold">{exp.role}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {exp.company}
                </p>
                {exp.description.map((item) => (
                  <li className='list-none' key={item}>{item}</li>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
