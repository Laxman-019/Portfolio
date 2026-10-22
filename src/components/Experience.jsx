import SectionHeader from './SectionHeader'
import { experiences } from '../data/content'

export default function Experience() {
  return (
    <section id="experience" className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader title="Experience" intro="Where I've worked and what I did there." />

        <div className="space-y-6">
          {experiences.map(exp => (
            <article
              key={exp.company + exp.date}
              className="grid gap-6 rounded-xl border border-line bg-surface p-6 sm:p-8 md:grid-cols-[220px_1fr] md:gap-12"
            >
              <div>
                <p className="text-sm text-muted">{exp.date}</p>
                <p className="mt-2 font-display text-lg font-bold text-accent">{exp.company}</p>
                <p className="mt-1 text-sm text-muted">{exp.location}</p>
              </div>

              <div>
                <h3 className="font-display text-2xl font-bold">{exp.role}</h3>
                <ul className="mt-5 space-y-3">
                  {exp.bullets.map(b => (
                    <li key={b} className="flex gap-3 leading-relaxed text-muted">
                      <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}