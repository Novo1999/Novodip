import { Download, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

interface ResumeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const ResumeModal = ({ open, onOpenChange }: ResumeModalProps) => {
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false)
    }

    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onOpenChange])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) setZoom(1)
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl h-[90vh] flex flex-col rounded-xl overflow-hidden pointer-events-auto border border-border bg-background"
            >
              {/* Toolbar */}
              <div className="flex items-center justify-between px-4 py-3 shrink-0 border-b border-border">
                <span className="text-sm font-semibold">Resume</span>

                <div className="flex items-center gap-1">
                  <div className="w-px h-5 mx-2 bg-border" />

                  <a
                    href="/resume/resume.pdf"
                    download="Novo-Resume.pdf"
                    className="p-1.5 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                  >
                    <Download className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => onOpenChange(false)}
                    aria-label="Close"
                    className="p-1.5 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground ml-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* PDF viewer */}
              <div className="flex-1 overflow-auto bg-muted/40">
                <div
                  className="flex justify-center p-6"
                  style={{ minWidth: zoom > 1 ? `${zoom * 100}%` : '100%' }}
                >
                  <div
                    style={{
                      transform: `scale(${zoom})`,
                      transformOrigin: 'top center',
                      transition: 'transform 0.2s ease',
                      width: '100%',
                      maxWidth: 800,
                    }}
                  >
                    <iframe
                      src="resume/resume.pdf#toolbar=0&navpanes=0&scrollbar=0"
                      title="Resume"
                      className="w-full rounded-lg shadow-lg border-0"
                      style={{ height: '75vh', minHeight: 600 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ResumeModal
