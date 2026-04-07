import { Dialog, DialogContent } from '@/components/ui/dialog'
import { X } from 'lucide-react'
import { useState } from 'react'

const screenshots = [
  { file: 'taskatask-address.jpg', label: 'Address' },
  { file: 'taskatask-chat-image.jpg', label: 'Chat Image' },
  { file: 'taskatask-chat-img-file.jpg', label: 'Chat Image With File' },
  { file: 'taskatask-chat-options.jpg', label: 'Chat Options' },
  { file: 'taskatask-chat.jpg', label: 'Chat' },
  { file: 'taskatask-chatsetting.jpg', label: 'Chat Settings' },
  { file: 'taskatask-closing.jpg', label: 'Closing' },
  { file: 'taskatask-createtask.jpg', label: 'Create Task' },
  { file: 'taskatask-deadline.jpg', label: 'Deadline' },
  { file: 'taskatask-feedback.jpg', label: 'Feedback' },
  { file: 'taskatask-leftmenu.jpg', label: 'Left Menu' },
  { file: 'taskatask-location.jpg', label: 'Location' },
  { file: 'taskatask-map.jpg', label: 'Map' },
  { file: 'taskatask-navigation-step.jpg', label: 'Navigation Step' },
  { file: 'taskatask-operatingtimes.jpg', label: 'Operating Times' },
  { file: 'taskatask-parking.jpg', label: 'Parking' },
  { file: 'taskatask-person.jpg', label: 'Person' },
  { file: 'taskatask-rightmenu.jpg', label: 'Right Menu' },
  { file: 'taskatask-schedule.jpg', label: 'Schedul Message' },
  { file: 'taskatask-sending.jpg', label: 'Chat Message Sending' },
  { file: 'taskatask-task.jpg', label: 'Task' },
  { file: 'taskatask-workspace.jpg', label: 'Workspace' },
]

export default function ProjectPage() {
  const [selected, setSelected] = useState<(typeof screenshots)[0] | null>(null)

  return (
    <div className="min-h-screen bg-background text-foreground px-4 sm:px-8 md:px-16 lg:px-32 py-16 sm:py-24 space-y-16">
      {/* Header */}
      <header className="space-y-3 max-w-2xl">
        <p className="text-sm text-muted-foreground tracking-widest uppercase">
          Project
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
          Taskatask
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          A real-time task management platform with chat, scheduling, maps, and
          workspace features.
        </p>
      </header>

      {/* Video */}
      <section className="space-y-3">
        <h2 className="text-sm text-muted-foreground tracking-widest uppercase">
          Demo
        </h2>
        <div className="w-full aspect-video rounded-xl overflow-hidden bg-muted">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/K2l2Umhyirk?si=hwlrwFjjUNUIubGb"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </section>

      {/* Screenshots */}
      <section className="space-y-6">
        <h2 className="text-sm text-muted-foreground tracking-widest uppercase">
          Here is a glimpse of the project I've been working on
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {screenshots.map((shot) => (
            <button
              key={shot.file}
              onClick={() => setSelected(shot)}
              className="group flex flex-col gap-2 text-left focus:outline-none"
            >
              <div className="w-full aspect-[9/16] rounded-lg overflow-hidden bg-muted ring-1 ring-border group-hover:ring-2 group-hover:ring-foreground/30 transition-all duration-200">
                <img
                  src={`/Taskatask/${shot.file}`}
                  alt={shot.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground group-hover:text-foreground transition-colors px-0.5 truncate">
                {shot.label}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Modal */}
      <Dialog
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        <DialogContent className="max-w-sm sm:max-w-md p-0 overflow-hidden bg-background border border-border rounded-xl">
          {selected && (
            <div className="flex flex-col">
              {/* Close button inside the modal */}
              <div className="relative w-full aspect-[9/16] bg-muted">
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-20 right-2 z-10 p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition"
                >
                  <X size={16} />
                </button>
                <img
                  src={`/Taskatask/${selected.file}`}
                  alt={selected.label}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="px-5 py-4 border-t border-border">
                <p className="text-sm font-medium text-foreground">
                  {selected.label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Taskatask · Screenshot
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
