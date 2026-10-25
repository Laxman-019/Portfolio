import { useRef, useState } from 'react'
import { FaGamepad, FaFilm, FaBookOpen, FaThLarge, FaMusic } from 'react-icons/fa'
import SectionHeader from './SectionHeader'
import LastPlayed from './LastPlayed'

const hobbies = [
  {
    Icon: FaGamepad,
    title: 'Gaming',
    text: 'Playing, and building my own multiplayer games.',
  },
  {
    Icon: FaFilm,
    title: 'Movies & series',
    text: 'Always one more episode.',
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
    widget: true,
  },
]

const pad = n => String(n).padStart(2, '0')

export default function BeyondCode() {
  const ref = useRef(null)
  const scrollerRef = useRef(null)
  const [active, setActive] = useState(0)


  const onMove = e => {
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  const getStep = () => {
    const items = scrollerRef.current?.children
    if (!items || items.length < 2) return 1
    return items[1].offsetLeft - items[0].offsetLeft
  }

  const onScroll = () => {
    const el = scrollerRef.current
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
    const i = atEnd ? hobbies.length - 1 : Math.round(el.scrollLeft / getStep())
    setActive(Math.min(hobbies.length - 1, Math.max(0, i)))
  }

  const goTo = i => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    scrollerRef.current.scrollTo({ left: i * getStep(), behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <section
      id="hobbies"
      ref={ref}
      onMouseMove={onMove}
      className="group/section relative overflow-hidden px-5 py-16 sm:px-8 sm:py-24"
    >

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden opacity-0 transition-opacity duration-500 group-hover/section:opacity-100 sm:block"
        style={{
          background:
            'radial-gradient(560px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--color-accent) 24%, transparent), transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeader title="Beyond code" intro="What I do when I'm away from the keyboard." />

        {/* Phones: swipeable cards that snap into place, next card peeks in */}
        <div className="sm:hidden">
          <ul
            ref={scrollerRef}
            onScroll={onScroll}
            tabIndex={0}
            aria-label="Hobbies, swipe to browse"
            className="-mx-5 flex snap-x snap-mandatory scroll-pl-5 gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {hobbies.map(({ Icon, title, text, widget }, i) => {
              const isActive = i === active
              return (
                <li
                  key={title}
                  className={`relative flex min-h-80 w-[78%] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-3xl border p-6 transition-all duration-300 ${
                    isActive
                      ? 'border-accent/50 bg-surface'
                      : 'scale-[0.96] border-line bg-surface/60 opacity-60'
                  }`}
                >
                  {/* soft glow in the corner and a big watermark icon */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-10 -top-10 size-44 rounded-full bg-accent/25 blur-3xl"
                  />
                  <Icon
                    aria-hidden="true"
                    size={170}
                    className="pointer-events-none absolute -bottom-8 -right-8 text-accent/10"
                  />

                  <div className="relative flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-2xl bg-accent-deep text-white">
                      <Icon size={20} />
                    </span>
                    <span className="font-mono text-xs text-muted">
                      {pad(i + 1)} / {pad(hobbies.length)}
                    </span>
                  </div>

                  <div className="relative">
                    <h3 className="font-display text-3xl font-extrabold leading-tight">{title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-muted">{text}</p>
                    {widget && (
                      <div className="mt-4">
                        <LastPlayed />
                      </div>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>

          <div className="mt-4 flex items-center justify-center" role="group" aria-label="Choose a hobby">
            {hobbies.map(({ title }, i) => (
              <button
                key={title}
                onClick={() => goTo(i)}
                aria-label={`Show ${title}`}
                aria-current={i === active}
                className="grid h-7 place-items-center px-1"
              >
                <span
                  className={`block h-2 rounded-full transition-all duration-300 ${
                    i === active ? 'w-8 bg-accent' : 'w-2 bg-line'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Tablet and desktop: wrapping card layout, any leftover cards stay centred */}
        <ul className="hidden flex-wrap justify-center gap-5 sm:flex">
          {hobbies.map(({ Icon, title, text, widget }) => (
            <li
              key={title}
              className="w-[calc(50%-0.625rem)] rounded-2xl border border-line bg-surface/80 p-7 text-center backdrop-blur-sm transition-colors hover:border-accent/60 lg:w-[calc(33.333%-0.834rem)]"
            >
              <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Icon size={22} />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold">{title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{text}</p>
              {widget && (
                <div className="mt-4 flex justify-center">
                  <LastPlayed />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}