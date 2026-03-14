import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import projectsData from '@/data/projects.json'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { useRef } from 'react'

const ProjectsSection = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" className="py-32 relative" aria-label="Projects">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm font-mono text-primary mb-4">
            {projectsData.sectionLabel}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-16">
            {projectsData.heading}
          </h2>
        </motion.div>

        <div className="grid gap-6">
          {projectsData.projects.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass-card rounded-xl p-8 group"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground mb-5 max-w-xl leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-xs font-mono bg-secondary text-muted-foreground border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <TooltipProvider>
                  <div className="flex items-center gap-3 shrink-0">
                    {project.github.map((link, idx) => {
                      const label = idx === 0 ? 'Frontend code' : 'Backend code'

                      return (
                        <Tooltip key={idx}>
                          <TooltipTrigger asChild>
                            <a
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2.5 rounded-lg border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
                              aria-label={`${project.title} GitHub repository`}
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{label}</p>
                          </TooltipContent>
                        </Tooltip>
                      )
                    })}

                    {project.live && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-lg border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
                            aria-label={`${project.title} live demo`}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Live site</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                </TooltipProvider>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
