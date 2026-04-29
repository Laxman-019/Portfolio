import { SectionHeader } from './Skills'

const experiences = [
  {
    date: 'Jan 2026 — Present',
    company: 'SkillOTech',
    role: 'Data Science Intern',
    location:'Bhubaneswar, Odisha',
    bullets: [
      'Learned Python programming for data handling and automation workflows.',
      'Performed data cleaning, preprocessing, and exploratory data analysis with Pandas, NumPy, and visualization libraries.',
      'Applied machine learning models including regression, classification, clustering, and evaluation techniques.',
      'Worked on real-world datasets to craft predictive models and generate actionable insights.',
      'Gained exposure to Jupyter Notebook, Google Colab, and SQL for data querying.',
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-20 py-24">
        <SectionHeader tag="Where I've Been" title="Experience" />

        <div className="space-y-0">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="reveal grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-12
                         py-10 border-b border-[rgba(0,210,255,0.1)] last:border-0"
            >
              
              <div>
                <p className="font-mono text-xs text-muted tracking-wider leading-relaxed">{exp.date}</p>
                <p className="font-mono text-xs text-[#00d2ff] font-bold tracking-widest uppercase mt-2">
                  {exp.company}
                </p>
                <p className="font-mono text-[10px] text-muted tracking-wider mt-1">{exp.location}</p>
              </div>

              
              <div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#e8eef8] mb-5">
                  {exp.role}
                </h3>
                <ul className="space-y-3">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3 text-muted text-sm leading-relaxed">
                      <span className="text-[#00d2ff] text-xs mt-1 shrink-0">→</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}