import { SectionHeader } from './Skills'

const education = [
  {
    year: '2022 — 2026',
    degree: 'B.Tech in Computer Science & Engineering',
    school: 'Ajay Binay Institute of Technology, Cuttack',
  },
  {
    year: '2020 — 2022',
    degree: '12th Science',
    school: 'Odisha Science College, Cuttack',
  },
  {
    year: '2018 — 2020',
    degree: '10th Standard',
    school: 'Saraswati Shishu Vidya Mandir, Agrahat',
  },
]

export default function Education() {
  return (
    <section id="education">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-20 py-24">
        <SectionHeader tag="My Academic Path" title="Education" />

        
        <div className="relative pl-6 sm:pl-10">
          
          <div
            className="absolute left-0 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, #00d2ff, transparent)' }}
          />

          {education.map((e, i) => (
            <div
              key={i}
              className="reveal relative pl-8 sm:pl-12 pb-12 last:pb-0"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              
              <div
                className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#00d2ff]"
                style={{ boxShadow: '0 0 16px #00d2ff' }}
              />

              <p className="font-mono text-[11px] text-[#00d2ff] tracking-widest mb-1.5">{e.year}</p>
              <h3 className="font-display font-bold text-lg sm:text-xl text-[#e8eef8] mb-1">{e.degree}</h3>
              <p className="text-muted text-sm">{e.school}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}