import { useState, useEffect } from 'react'
import { navLinks, profile } from '../data/content'
import ThemeToggle from './ThemeToggle'
import MobileNav from './MobileNav'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      let current = ''
      document.querySelectorAll('main section[id]').forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 140) current = sec.id
      })
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur-xl transition-all duration-300 ${
          scrolled ? 'border-b border-line bg-canvas/85 py-3' : 'py-5'
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8">
          <a href="#home" className="font-display text-xl font-extrabold tracking-tight">
            {profile.firstName}<span className="text-accent">.</span>
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map(l => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`text-sm transition-colors ${
                    active === l.href.slice(1) ? 'text-accent' : 'text-muted hover:text-ink'
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <ThemeToggle />
        </nav>
      </header>

      <MobileNav active={active} />
    </>
  )
}