import { useState } from 'react'
import SectionHeader from './SectionHeader'
import ProjectCard from './ProjectCard'
import { projects, projectCategories } from '../data/projects'

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const visible = filter === 'All' ? projects : projects.filter(p => p.category === filter)

  return (
    <section id="projects" className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title="Featured projects"
          intro="Things I've built, from ML apps to full-stack platforms. Projects that aren't deployed yet are marked as coming soon."
        />

        <div className="mb-14 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
          {projectCategories.map(c => (
            <button
              key={c}
              role="tab"
              aria-selected={filter === c}
              onClick={() => setFilter(c)}
              className={`rounded-full border px-5 py-2 text-sm transition-colors ${
                filter === c
                  ? 'border-accent bg-accent text-canvas'
                  : 'border-line text-muted hover:border-accent hover:text-ink'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="space-y-24 lg:space-y-32">
          {visible.map((p, i) => (
            <ProjectCard key={p.title} project={p} reversed={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}