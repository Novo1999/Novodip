import { Mascot } from 'page-mascot'

type AccentMascotProps = {
  size?: number
  className?: string
}

// CSS selects the sheets from the existing root accent attribute. This also
// respects the saved accent before hydration and keeps just one active mascot.
const AccentMascot = ({ size = 140, className = '' }: AccentMascotProps) => (
  <Mascot
    directions="/mascots/novodip-orange-directions.webp"
    reactions="/mascots/novodip-orange-reactions.webp"
    size={size}
    label="Novodip mascot"
    className={`accent-mascot rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${className}`}
  />
)

export default AccentMascot
