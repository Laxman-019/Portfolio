import SectionHeader from './SectionHeader'
import { profile } from '../data/content'

const facts = [
  { label: 'Based in', value: profile.location },
  { label: 'Studying', value: 'B.Tech CSE, Ajay Binay Institute of Technology (2022–2026)' },
  { label: 'Right now', value: 'Data Science Intern at SkillOTech' },
]

export default function About() {
  return (
    <section id="about" className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader title="Building things from front end to data" />

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="max-w-xl space-y-5 text-lg leading-relaxed text-muted">
            <p>
              I&rsquo;m a final-year Computer Science student from Cuttack who likes
              building things end to end: a React interface, a backend that holds up,
              and the data work behind it.
            </p>
            <p>
              My projects include a student score predictor with a React front end and a Flask API, BookNest, a full-stack library tracker with live updates over WebSockets, and a gesture and voice controller built on OpenCV and MediaPipe. At SkillOTech I work with Python, Pandas and machine learning models on real datasets.
            </p>
            <p>Away from the keyboard, you&rsquo;ll usually find me reading, solving Sudoku or listening to music.</p>
          </div>

          <dl className="space-y-6 border-l border-line pl-8">
            {facts.map(f => (
              <div key={f.label}>
                <dt className="text-sm text-muted">{f.label}</dt>
                <dd className="mt-1 text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}