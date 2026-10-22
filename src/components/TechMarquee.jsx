import { marqueeTech } from '../data/skills'

export default function TechMarquee() {
  const items = [...marqueeTech, ...marqueeTech]

  return (
    <div
      className="overflow-hidden border-y border-line py-6 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      aria-label="Technologies I work with"
    >
      <ul className="animate-marquee flex w-max items-center">
        {items.map(({ name, Icon }, i) => (
          <li
            key={`${name}-${i}`}
            aria-hidden={i >= marqueeTech.length}
            className="flex items-center gap-3 px-6 text-muted"
          >
            <Icon size={22} />
            <span className="whitespace-nowrap text-sm">{name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}