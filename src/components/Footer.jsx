import { FaGithub, FaLinkedinIn, FaEnvelope } from 'react-icons/fa'
import { FiArrowUp } from 'react-icons/fi'
import { profile } from '../data/content'

const socials = [
  { label: 'GitHub', href: profile.github, Icon: FaGithub },
  { label: 'LinkedIn', href: profile.linkedin, Icon: FaLinkedinIn },
  { label: 'Email', href: `mailto:${profile.email}`, Icon: FaEnvelope },
]

const toTop = () => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
}

export default function Footer() {
  return (
    <footer className="border-t border-line px-5 pb-28 pt-10 sm:px-8 md:pb-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
      
        <div className="text-center md:text-left">
          <p className="font-display text-2xl font-extrabold tracking-tight">
            {profile.name.split(' ')[0]}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-1.5 text-sm text-muted">
            © {new Date().getFullYear()} <span className="text-ink">{profile.name}</span> · Made from scratch to show what I can build.
          </p>
        </div>

        
        <div className="flex items-center gap-3">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              aria-label={label}
              className="flex size-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <Icon size={18} />
            </a>
          ))}
          <button
            onClick={toTop}
            aria-label="Back to top"
            title="Back to top"
            className="grid size-11 shrink-0 place-items-center rounded-full bg-accent-deep text-white transition-all hover:-translate-y-0.5 hover:bg-accent"
          >
            <FiArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  )
}