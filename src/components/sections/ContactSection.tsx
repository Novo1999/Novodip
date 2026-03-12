import contactData from '@/data/contact.json'
import { motion, useInView } from 'framer-motion'
import { Github, Linkedin, Mail, Send } from 'lucide-react'
import { useRef, useState } from 'react'

const iconMap: Record<string, React.ElementType> = { Github, Linkedin, Mail }

const ContactSection = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="py-32 relative" aria-label="Contact">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm font-mono text-primary mb-4">
            {contactData.sectionLabel}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {contactData.heading}
          </h2>
          <p className="text-muted-foreground mb-16 max-w-lg">
            {contactData.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 max-w-4xl">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label htmlFor="contact-name" className="sr-only">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                placeholder="Name"
                required
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="sr-only">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                placeholder="Email"
                required
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="sr-only">
                Message
              </label>
              <textarea
                id="contact-message"
                rows={5}
                placeholder="Message"
                required
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              {submitted ? 'Message Sent!' : 'Send Message'}
              <Send className="w-4 h-4" />
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <p className="text-muted-foreground">Or reach me through:</p>
            <nav aria-label="Social links" className="space-y-4">
              {contactData.socialLinks.map((link) => {
                const Icon = iconMap[link.icon]
                return (
                  <a
                    key={link.label}
                    href={link.url}
                    target={
                      link.url.startsWith('mailto:') ? undefined : '_blank'
                    }
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    <div className="p-2.5 rounded-lg border border-border group-hover:border-primary/30 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    {link.label}
                  </a>
                )
              })}
            </nav>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
