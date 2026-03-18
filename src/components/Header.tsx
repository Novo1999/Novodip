import ResumeModal from '#/components/ResumeModal'
import ScrollProgress from '#/components/ScrollProgress'
import { supabase } from '#/lib/supabase'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Contact', href: '/#contact' },
]

const incrementResumeClickCount = async () => {
  const allowedOrigins = [
    'https://novodip.netlify.app',
    'https://www.novodip.netlify.app',
  ]

  if (!allowedOrigins.includes(window.location.origin)) return

  await supabase.rpc('increment_resume_count')
}

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [resumeOpen, setResumeOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <ScrollProgress />
      <ResumeModal open={resumeOpen} onOpenChange={setResumeOpen} />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled || mobileOpen ? 'glass-card' : ''
        }`}
      >
        <div className="container mx-auto flex items-center justify-between h-16 px-6">
          <a href="#" className="text-lg font-bold gradient-text">
            Novodip
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}

            <button
              onClick={async () => {
                setResumeOpen(true)
                await incrementResumeClickCount()
              }}
              className="text-sm underline underline-offset-8 animate-pulse py-3 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
            >
              My Resume
            </button>
          </div>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity btn-gradient"
          >
            Get in Touch
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-foreground hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-background/95 backdrop-blur-md pt-20 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-lg py-3 px-4 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}

              <button
                onClick={() => {
                  setMobileOpen(false)
                  setResumeOpen(true)
                }}
                className="text-lg py-3 px-4 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                My Resume
              </button>

              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-4 inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Get in Touch
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
