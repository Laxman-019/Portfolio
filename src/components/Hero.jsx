import { FaGithub, FaLinkedinIn, FaEnvelope } from 'react-icons/fa'
import { profile, stats } from '../data/content'

const socials = [
  { label: 'GitHub', href: profile.github, Icon: FaGithub },
  { label: 'LinkedIn', href: profile.linkedin, Icon: FaLinkedinIn },
  { label: 'Email', href: `mailto:${profile.email}`, Icon: FaEnvelope },
]

const title = `Hi, I\u2019m ${profile.name}`

export default function Hero() {
  return (
    <section id="home" className="flex min-h-svh items-center px-5 pb-16 pt-28 sm:px-8 sm:pt-32">
      <div className="mx-auto w-full max-w-6xl">
        <p
          className="rise inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-1.5 text-sm text-muted"
          style={{ '--i': 0 }}
        >
          <span className="pulse-soft size-2 rounded-full bg-emerald-400" />
          Available for new opportunities
        </p>

        <h1
          data-text={title}
          className="glitch rise mt-7 max-w-4xl font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-7xl lg:text-8xl"
          style={{ '--i': 1 }}
        >
          {title}
        </h1>

        <p
          className="rise mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          style={{ '--i': 2 }}
        >
          I build web apps, AI chatbots and full-stack platforms, and I&rsquo;m learning
          to turn data into models that predict things. Based in Cuttack, graduating in 2026.
        </p>

        <div className="rise mt-9 flex flex-wrap items-center gap-4" style={{ '--i': 3 }}>
          <a
            href="#projects"
            className="rounded-full bg-accent px-7 py-3 font-medium text-canvas transition-colors hover:bg-ink"
          >
            View projects
          </a>
          {profile.resume ? (
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-line px-7 py-3 font-medium transition-colors hover:border-accent hover:text-accent"
            >
              Resume
            </a>
          ) : (
            <a
              href="#contact"
              className="rounded-full border border-line px-7 py-3 font-medium transition-colors hover:border-accent hover:text-accent"
            >
              Get in touch
            </a>
          )}
          <ul className="ml-1 flex items-center gap-3">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={label}
                  className="flex size-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <dl
          className="rise mt-12 grid grid-cols-2 gap-x-4 gap-y-6 border-t border-line pt-8 sm:mt-14 sm:flex sm:flex-wrap sm:gap-x-14 sm:gap-y-6"
          style={{ '--i': 4 }}
        >
          {stats.map(s => (
            <div key={s.label}>
              <dd className="font-display text-3xl font-extrabold sm:text-4xl">{s.value}</dd>
              <dt className="mt-1 text-xs text-muted sm:text-sm">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}