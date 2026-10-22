import { useRef } from 'react'
import { FaQuoteLeft, FaBookOpen, FaThLarge, FaMusic } from 'react-icons/fa'
import SectionHeader from './SectionHeader'

const hobbies = [
  {
    Icon: FaQuoteLeft,
    title: 'Content creation',
    text: 'Turning ideas into short posts and quotes.',
  },
  {
    Icon: FaBookOpen,
    title: 'Reading',
    text: 'Getting lost in books and stories.',
  },
  {
    Icon: FaThLarge,
    title: 'Sudoku',
    text: 'Working through grids and logic puzzles.',
  },
  {
    Icon: FaMusic,
    title: 'Music',
    text: 'Usually something playing in the background.',
  },
]

export default function BeyondCode() {
  const ref = useRef(null)
  const onMove = e => {
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <section
      id="hobbies"
      ref={ref}
      onMouseMove={onMove}
      className="group/section relative overflow-hidden px-5 py-16 sm:px-8 sm:py-24"
    >
      {/* cursor-following glow: fades in only while the mouse is over this section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/section:opacity-100"
        style={{
          background:
            'radial-gradient(560px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--color-accent) 24%, transparent), transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeader title="Beyond code" intro="What I do when I'm away from the keyboard." />

        <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {hobbies.map(({ Icon, title, text }) => (
            <li
              key={title}
              className="rounded-2xl border border-line bg-surface/80 p-5 text-center sm:p-7 backdrop-blur-sm transition-colors hover:border-accent/60"
            >
              <span className="mx-auto flex size-12 items-center sm:size-14 justify-center rounded-full bg-accent/10 text-accent">
                <Icon size={22} />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold sm:mt-5 sm:text-xl">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}