import { useRef } from 'react'


export default function CursorGlow({
  as: Tag = 'div',
  size = 560,
  strength = 24,
  className = '',
  children,
  ...rest
}) {
  const ref = useRef(null)

  const onMove = e => {
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <Tag
      ref={ref}
      onMouseMove={onMove}
      className={`group/glow relative ${className}`}
      {...rest}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/glow:opacity-100"
        style={{
          background: `radial-gradient(${size}px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--color-accent) ${strength}%, transparent), transparent 70%)`,
        }}
      />
      <div className="relative">{children}</div>
    </Tag>
  )
}