import { FaGithub } from 'react-icons/fa'
import { FiArrowUpRight } from 'react-icons/fi'
import CursorGlow from './CursorGlow'

const KEYWORDS = new Set([
  'import', 'from', 'def', 'class', 'return', 'if', 'elif', 'else', 'not', 'and', 'or',
  'in', 'is', 'for', 'async', 'await', 'public', 'private', 'static', 'void', 'new',
  'try', 'except', 'self', 'True', 'False', 'None', 'null', 'true', 'false',
])

function highlight(line) {
  const re = /(\/\/.*|#.*)|('[^']*'|"[^"]*")|([A-Za-z_]\w*)|(\s+|.)/g
  return Array.from(line.matchAll(re), (m, i) => {
    const [text, comment, string, word] = m
    let cls = ''
    if (comment) cls = 'text-emerald-300/60'
    else if (string) cls = 'text-amber-200'
    else if (word && KEYWORDS.has(word)) cls = 'text-violet-300'
    else if (word && /^[A-Z]/.test(word)) cls = 'text-teal-300'
    return <span key={i} className={cls}>{text}</span>
  })
}

function CodeWindow({ file, lines }) {
  return (
    <CursorGlow
      aria-hidden="true"
      size={380}
      strength={16}
      className="min-h-88 overflow-hidden rounded-[1.75rem] border border-line/70 bg-surface transition-colors hover:border-accent/40"
    >
      <div className="flex items-center gap-2.5 px-8 pt-8">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[11px] tracking-wide text-muted/70">{file}</span>
      </div>
      <div className="overflow-x-auto px-8 pb-10 pt-8 font-mono text-sm leading-8 text-ink">
        {lines.map((line, i) => (
          <div key={i} className="min-h-8 whitespace-pre">{highlight(line)}</div>
        ))}
      </div>
    </CursorGlow>
  )
}

export default function ProjectCard({ project: p, reversed = false }) {
  return (
    <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={reversed ? 'lg:order-2' : ''}>
        <CodeWindow file={p.file} lines={p.snippet} />
      </div>

      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent/80">{p.category}</p>
        <h3 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">{p.title}</h3>
        <p className="mt-4 text-lg leading-relaxed text-muted">{p.desc}</p>

        <ul className="mt-6 space-y-3 text-ink/90">
          {p.highlights.map(h => (
            <li key={h} className="flex gap-3 leading-relaxed">
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
              {h}
            </li>
          ))}
        </ul>

        <ul className="mt-6 flex flex-wrap gap-2">
          {p.stack.map(t => (
            <li key={t} className="rounded-full border border-line px-3.5 py-1.5 text-sm">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {p.live ? (
            <a
              href={p.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-canvas transition-colors hover:bg-ink"
            >
              Live demo
              <FiArrowUpRight size={18} />
            </a>
          ) : (
            <span
              aria-disabled="true"
              className="inline-flex cursor-default items-center rounded-full bg-accent/10 px-6 py-3 font-medium text-muted"
            >
              Coming soon
            </span>
          )}
          <a
            href={p.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-medium transition-colors hover:border-accent hover:text-accent"
          >
            <FaGithub size={18} />
            GitHub
          </a>
        </div>

        {p.note && <p className="mt-4 text-sm text-muted">{p.note}</p>}
      </div>
    </article>
  )
}