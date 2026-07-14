import { useEffect, useState } from 'react'

// Keep in sync with the :root[data-accent] blocks in styles.css and the
// ACCENT_INIT_SCRIPT in routes/__root.tsx.
const ACCENTS = [
  { id: 'orange', label: 'Orange', hsl: '12 100% 60%' },
  { id: 'teal', label: 'Teal', hsl: '172 66% 50%' },
  { id: 'blue', label: 'Blue', hsl: '217 91% 60%' },
  { id: 'yellow', label: 'Yellow', hsl: '45 100% 55%' },
] as const

type AccentId = (typeof ACCENTS)[number]['id']

function applyAccent(accent: AccentId) {
  if (accent === 'orange') {
    document.documentElement.removeAttribute('data-accent')
  } else {
    document.documentElement.setAttribute('data-accent', accent)
  }
}

function getInitialAccent(): AccentId {
  if (typeof window === 'undefined') {
    return 'orange'
  }

  const stored = window.localStorage.getItem('accent')
  return ACCENTS.some((a) => a.id === stored) ? (stored as AccentId) : 'orange'
}

const AccentPicker = () => {
  const [accent, setAccent] = useState<AccentId>('orange')

  useEffect(() => {
    setAccent(getInitialAccent())
  }, [])

  function pickAccent(next: AccentId) {
    setAccent(next)
    applyAccent(next)
    window.localStorage.setItem('accent', next)
  }

  return (
    <div
      role="radiogroup"
      aria-label="Accent color"
      className="fixed right-4 top-[92px] z-[140] flex flex-col items-center gap-2.5 rounded-full border border-border bg-background/55 p-2 backdrop-blur-xl"
    >
      {ACCENTS.map((a) => (
        <button
          key={a.id}
          type="button"
          role="radio"
          aria-checked={accent === a.id}
          aria-label={a.label}
          title={a.label}
          onClick={() => pickAccent(a.id)}
          className={`h-5 w-5 rounded-full border-2 transition-transform hover:scale-110 ${
            accent === a.id
              ? 'scale-110 border-foreground'
              : 'border-transparent'
          }`}
          style={{ backgroundColor: `hsl(${a.hsl})` }}
        />
      ))}
    </div>
  )
}

export default AccentPicker
