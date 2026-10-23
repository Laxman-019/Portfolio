import { useEffect, useRef, useState } from 'react'
import { FaGithub, FaLinkedinIn, FaEnvelope } from 'react-icons/fa'
import { FiGrid, FiX } from 'react-icons/fi'
import { navLinks, profile } from '../data/content'


const extraLabels = { hobbies: 'Beyond code' }

const labels = Object.fromEntries([
  ...navLinks.map(l => [l.href.slice(1), l.label]),
  ...Object.entries(extraLabels),
])

const socials = [
  { label: 'GitHub', href: profile.github, Icon: FaGithub },
  { label: 'LinkedIn', href: profile.linkedin, Icon: FaLinkedinIn },
  { label: 'Email', href: `mailto:${profile.email}`, Icon: FaEnvelope },
]


export default function MobileNav({ active }) {
  const [open, setOpen] = useState(false)
  const ringRef = useRef(null)


  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const pct = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0
      ringRef.current?.style.setProperty('--p', pct.toFixed(1))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  
  useEffect(() => {
    if (!open) return
    const onKey = e => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const index = navLinks.findIndex(l => l.href === `#${active}`)
  const number = index >= 0 ? String(index + 1).padStart(2, '0') : '··'
  const label = labels[active] ?? 'Home'

  return (
    <div className="md:hidden">
      {open && (
        <button
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px]"
        />
      )}

      <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="mx-auto max-w-sm overflow-hidden rounded-[1.75rem] border border-line bg-canvas/85 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl">
         
          <div
            id="mobile-nav-panel"
            inert={open ? undefined : ''}
            aria-hidden={!open}
            className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
              open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="overflow-hidden">
              <ul className="grid grid-cols-2 gap-2 p-3">
                {navLinks.map((l, i) => {
                  const isActive = active === l.href.slice(1)
                  return (
                    <li key={l.href} className="flex odd:last:col-span-2">
                      <a
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className={`flex min-h-24 w-full flex-col justify-between rounded-2xl border p-4 transition-colors ${
                          isActive
                            ? 'border-accent/60 bg-accent/10 text-accent'
                            : 'border-line bg-surface/60 text-ink active:bg-accent/10'
                        }`}
                      >
                        <span className="font-mono text-xs text-muted">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="font-display text-xl font-bold">{l.label}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>

              <div className="flex items-center justify-between px-4 pb-3 pt-1">
                <ul className="flex gap-2">
                  {socials.map(({ label: name, href, Icon }) => (
                    <li key={name}>
                      <a
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer"
                        aria-label={name}
                        className="flex size-10 items-center justify-center rounded-full border border-line text-muted transition-colors active:border-accent active:text-accent"
                      >
                        <Icon size={16} />
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="flex items-center gap-2 text-xs text-muted">
                  <span className="pulse-soft size-2 rounded-full bg-emerald-400" />
                  Open to work
                </p>
              </div>
            </div>
          </div>

         
          <button
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav-panel"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            className={`flex w-full items-center gap-3 border-t px-3 py-2.5 text-left transition-colors ${
              open ? 'border-line' : 'border-transparent'
            }`}
          >
            <span
              ref={ringRef}
              className="grid size-10 shrink-0 place-items-center rounded-full"
              style={{
                background:
                  'conic-gradient(var(--color-accent) calc(var(--p, 0) * 1%), var(--color-line) 0)',
              }}
            >
              <span className="grid size-8 place-items-center rounded-full bg-canvas font-mono text-[11px]">
                {number}
              </span>
            </span>

            <span className="min-w-0 flex-1">
              <span className="block font-mono text-[10px] text-muted">
                {open ? 'jump to' : 'now viewing'}
              </span>
              <span key={label} className="rise block truncate font-display text-lg font-bold leading-tight">
                {label}
              </span>
            </span>

            <span className="grid size-10 place-items-center rounded-full border border-line text-ink">
              {open ? <FiX size={18} /> : <FiGrid size={18} />}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}