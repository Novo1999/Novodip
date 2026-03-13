import skillsData from '@/data/skills.json'
import { motion, useInView } from 'framer-motion'
import { Code2, Server, Wrench } from 'lucide-react'
import { useRef } from 'react'

const iconMap: Record<string, React.ElementType> = { Code2, Server, Wrench }

const SkillsSection = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="py-32 relative" aria-label="Skills">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm font-mono text-primary mb-4">
            {skillsData.sectionLabel}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-16">
            {skillsData.heading}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {skillsData.groups.map((group, i) => {
            const Icon = iconMap[group.icon]
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="glass-card rounded-xl p-8"
              >
                <Icon className="w-6 h-6 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-5">{group.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-md text-sm bg-secondary text-secondary-foreground border"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
