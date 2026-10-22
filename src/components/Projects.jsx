import { useState } from 'react'
import SectionHeader from './SectionHeader'
import ProjectCard from './ProjectCard'
import { projects, projectCategories } from '../data/projects'

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const visible = filter === 'All' ? projects : projects.filter(p => p.category === filter)

  return (
    <section id="projects" className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title="Featured projects"
          intro="Things I've built, from ML apps to full-stack platforms. Projects that aren't deployed yet are marked as coming soon."
        />

        <div className="-mx-5 mb-10 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-none] sm:mx-0 sm:mb-14 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0" role="tablist" aria-label="Filter projects">
          {projectCategories.map(c => (
            <button
              key={c}
              role="tab"
              aria-selected={filter === c}
              onClick={() => setFilter(c)}
              className={`shrink-0 rounded-full border px-5 py-2.5 text-sm transition-colors ${
                filter === c
                  ? 'border-accent bg-accent text-canvas'
                  : 'border-line text-muted hover:border-accent hover:text-ink'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="space-y-16 sm:space-y-24 lg:space-y-32">
          {visible.map((p, i) => (
            <ProjectCard key={p.title} project={p} reversed={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}