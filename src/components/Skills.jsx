import SectionHeader from './SectionHeader'
import CursorGlow from './CursorGlow'
import { skillGroups } from '../data/skills'

export default function Skills() {
  return (
    <CursorGlow
      as="section"
      id="skills"
      className="overflow-hidden px-5 py-16 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title="Tools I work with"
          intro="The languages, frameworks and platforms I use day to day, grouped by what they do."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map(({ icon: Icon, title, tags }) => (
            <div
              key={title}
              className="rounded-xl border border-line bg-surface/80 p-6 backdrop-blur-sm transition-colors hover:border-accent/60"
            >
              <Icon size={26} className="text-accent" />
              <h3 className="mt-4 font-display text-lg font-bold">{title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {tags.map(t => (
                  <li
                    key={t}
                    className="rounded-full border border-line px-3 py-1 text-sm text-muted"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </CursorGlow>
  )
}