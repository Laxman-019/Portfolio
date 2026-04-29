const skillGroups = [
  {
    icon: 'fa-solid fa-code',
    title: 'Programming Languages',
    tags: ['Python', 'Java', 'JavaScript'],
  },
  {
    icon: 'fa-brands fa-dev',
    title: 'Web Development',
    tags: ['HTML', 'CSS', 'React.js', 'Firebase'],
  },
  {
    icon: 'fa-solid fa-database',
    title: 'Database',
    tags: ['MySQL', 'Oracle SQL', 'Firestore'],
  },
  {
    icon: 'fa-solid fa-screwdriver-wrench',
    title: 'Tools & Platforms',
    tags: ['Git', 'GitHub', 'Jupyter', 'Google Colab'],
  },
  {
    icon: 'fa-solid fa-brain',
    title: 'Data Science & AI/ML',
    tags: ['Pandas', 'NumPy', 'Scikit-learn', 'Gemini API', 'Streamlit'],
  },
  {
    icon: 'fa-regular fa-lightbulb',
    title: 'Concepts',
    tags: ['CRUD Operations', 'EDA', 'ML Models', 'Modular Architecture'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="bg-[#080d1a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-20 py-24">
        <SectionHeader tag="What I Work With" title="Core Skills" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((g, i) => (
            <div
              key={g.title}
              className="skill-card reveal group relative bg-[#0c1428] border border-[rgba(0,210,255,0.12)]
                         p-6 sm:p-8 overflow-hidden transition-all duration-300
                         hover:border-[rgba(0,210,255,0.4)] hover:-translate-y-1"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
            
              <div
                className="absolute left-0 top-0 w-0.5 h-full scale-y-0 origin-top
                           group-hover:scale-y-100 transition-transform duration-300"
                style={{ background: 'linear-gradient(to bottom, #00d2ff, #7c3aed)' }}
              />

              <div className="text-3xl mb-4"><i className={`${g.icon}`}></i></div>
              <h3 className="font-display font-bold text-sm text-[#e8eef8] mb-4">{g.title}</h3>
              <div className="flex flex-wrap gap-2">
                {g.tags.map(t => (
                  <span
                    key={t}
                    className="font-mono text-[11px] text-[#00d2ff] border border-[rgba(0,210,255,0.25)]
                               px-2.5 py-1 tracking-wider"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SectionHeader({ tag, title }) {
  return (
    <div className="mb-12 reveal">
      <p className="font-mono text-[11px] text-[#00d2ff] tracking-[0.2em] uppercase
                   flex items-center gap-3 mb-3">
        <span className="inline-block w-8 h-px bg-[#00d2ff]" />
        {tag}
      </p>
      <h2 className="font-display font-extrabold tracking-tight
                     text-[clamp(2rem,4vw,3.2rem)] text-[#e8eef8]">
        {title}
      </h2>
    </div>
  )
}