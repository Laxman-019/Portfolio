import SectionHeader from './SectionHeader'
import { education } from '../data/content'

export default function Education() {
  return (
    <section id="education" className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader title="Education" intro="My academic path, most recent first." />

        <ol className="relative ml-2 border-l border-line">
          {education.map(e => (
            <li key={e.degree} className="relative pb-12 pl-8 last:pb-0">
              <span className="absolute -left-1.25 top-2 size-2.5 rounded-full bg-accent" />
              <p className="text-sm text-muted">{e.year}</p>
              <h3 className="mt-1 font-display text-xl font-bold sm:text-2xl">{e.degree}</h3>
              <p className="mt-1 text-muted">{e.school}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}