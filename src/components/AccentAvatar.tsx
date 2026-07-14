// Renders one avatar image per accent theme; the .accent-avatar-img rules in
// styles.css display only the variant matching <html data-accent>. Keep the
// variant ids in sync with AccentPicker.tsx.
const VARIANTS = ['orange', 'teal', 'blue', 'yellow'] as const

type AccentAvatarProps = {
  alt?: string
  className?: string
  loading?: 'eager' | 'lazy'
}

const AccentAvatar = ({
  alt = '',
  className = '',
  loading,
}: AccentAvatarProps) => (
  <>
    {VARIANTS.map((id) => (
      <img
        key={id}
        src={`/portfolio-avatar-${id}.webp`}
        alt={alt}
        data-accent-img={id}
        loading={loading}
        className={`accent-avatar-img ${className}`}
      />
    ))}
  </>
)

export default AccentAvatar
