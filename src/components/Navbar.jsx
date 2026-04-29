import { useState, useEffect } from 'react'

const links = [
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active,  setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = document.querySelectorAll('section[id]')
      sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 140) setActive(sec.id)
      })
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled ? 'py-3 bg-[#050810]/90 border-b border-[rgba(0,210,255,0.12)]' : 'py-5'}
        backdrop-blur-xl`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">

       
        <a href="#hero" className="font-mono text-[#00d2ff] text-base tracking-widest">
          LC<span className="text-muted">.dev</span>
        </a>

      
        <ul className="hidden md:flex gap-8">
          {links.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`font-mono text-xs tracking-widest uppercase relative transition-colors duration-200
                  group ${active === l.href.slice(1) ? 'text-[#00d2ff]' : 'text-muted hover:text-[#00d2ff]'}`}
              >
                {l.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-[#00d2ff] transition-all duration-300
                  ${active === l.href.slice(1) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </a>
            </li>
          ))}
        </ul>

      
        <div className="hidden md:flex items-center gap-2 font-mono text-[11px] text-[#00ff88] tracking-widest">
          <span className="w-2 h-2 rounded-full bg-[#00ff88] shadow-[0_0_8px_#00ff88] dot-pulse" />
          Available
        </div>

       
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-[#00d2ff] transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-px bg-[#00d2ff] transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-[#00d2ff] transition-all duration-300 ${open ? '-rotate-45 -translate-y-2.5' : ''}`} />
        </button>
      </div>

    
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden
          ${open ? 'max-h-96 border-t border-[rgba(0,210,255,0.12)]' : 'max-h-0'}`}
      >
        <ul className="flex flex-col bg-[#080d1a] px-6 py-4 gap-4">
          {links.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-mono text-xs tracking-widest uppercase text-muted hover:text-[#00d2ff] transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="flex items-center gap-2 font-mono text-[11px] text-[#00ff88] tracking-widest pt-2 border-t border-[rgba(0,210,255,0.1)]">
            <span className="w-2 h-2 rounded-full bg-[#00ff88] shadow-[0_0_8px_#00ff88] dot-pulse" />
            Available for Opportunities
          </li>
        </ul>
      </div>
    </nav>
  )
}