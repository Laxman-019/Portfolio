import { useState, useRef } from 'react'
import { SectionHeader } from './Skills'
import emailjs from '@emailjs/browser'

const contactLinks = [
  { icon: 'fas fa-envelope', label: 'Email', value: 'lxmnchourasia@gmail.com', href: 'mailto:lxmnchourasia@gmail.com' },
  { icon: 'fas fa-phone', label: 'Mobile', value: '+91 8260853419', href: 'tel:+918260853419' },
  { icon: 'fa-brands fa-github',  label: 'GitHub',   value: 'github.com/Laxman-019', href: 'https://github.com/Laxman-019' },
  { icon: 'fa-brands fa-square-linkedin', label: 'LinkedIn', value: 'laxman-chourasia-8931a3308', href: 'https://www.linkedin.com/in/laxman-chourasia-8931a3308' },
]

export default function Contact() {
  const formRef = useRef()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  
  const submit = (e) => {
    e.preventDefault()
    
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all fields')
      setTimeout(() => setError(''), 3000)
      return
    }
    
    setIsSubmitting(true)
    setError('')

    
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,  
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, 
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY   
      )
      .then(
        (result) => {
          console.log('SUCCESS!', result.text)
          setSent(true)
          setForm({ name: '', email: '', message: '' })
          setTimeout(() => setSent(false), 3000)
        },
        (error) => {
          console.log('FAILED...', error.text)
          setError('Failed to send message. Please try again.')
          setTimeout(() => setError(''), 3000)
        }
      )
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <section id="contact" className="bg-[#080d1a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-20 py-24">
        <SectionHeader tag="Let's Connect" title="Get In Touch" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">


          <div className="reveal">
            <p className="text-muted text-base leading-relaxed mb-8">
              I'm always open to internship opportunities, collaborations, or just a
              great conversation about tech. Feel free to reach out through any channel below.
            </p>
            <div className="flex flex-col gap-3">
              {contactLinks.map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="flex items-center gap-4 bg-[#0c1428] border border-[rgba(0,210,255,0.12)]
                             px-4 py-3.5 text-[#e8eef8] text-sm transition-all duration-200
                             hover:border-[#00d2ff] hover:text-[#00d2ff] hover:translate-x-1.5"
                >
                  <div
                    className="w-9 h-9 flex items-center justify-center text-sm shrink-0
                               bg-[rgba(0,210,255,0.07)] border border-[rgba(0,210,255,0.2)]"
                  >
                    <i className={`${l.icon}`}></i>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-muted tracking-widest uppercase mb-0.5">{l.label}</p>
                    <p className="text-sm truncate">{l.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <form ref={formRef} onSubmit={submit} className="reveal flex flex-col gap-4">
            <FormField 
              label="Your Name" 
              name="name"           
              value={form.name} 
              onChange={handle} 
              placeholder="John Doe" 
            />
            <FormField 
              label="Email Address" 
              name="email"         
              type="email" 
              value={form.email} 
              onChange={handle} 
              placeholder="john@example.com" 
            />
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[11px] text-muted tracking-[0.15em] uppercase">Message</label>
              <textarea
                name="message"      
                value={form.message}
                onChange={handle}
                placeholder="Tell me about your project or opportunity..."
                rows={5}
                className="bg-[#0c1428] border border-[rgba(0,210,255,0.12)] text-[#e8eef8]
                           px-4 py-3.5 text-sm outline-none resize-none
                           focus:border-[#00d2ff] transition-colors duration-200
                           placeholder:text-muted/50 font-body"
                required
              />
            </div>

           
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-2 text-sm rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-clip bg-[#00d2ff] text-black font-mono font-bold text-xs
                         tracking-widest uppercase py-4 transition-all duration-200
                         hover:bg-white hover:-translate-y-0.5 mt-1
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isSubmitting ? 'Sending...' : sent ? '✓ Message Sent!' : 'Send Message →'}
            </button>

            <p className="font-mono text-[10px] text-muted tracking-wider text-center">
              ✓ Messages sent directly to my inbox
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

function FormField({ label, name, value, onChange, placeholder, type = 'text' }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-[11px] text-muted tracking-[0.15em] uppercase">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="bg-[#0c1428] border border-[rgba(0,210,255,0.12)] text-[#e8eef8]
                   px-4 py-3.5 text-sm outline-none
                   focus:border-[#00d2ff] transition-colors duration-200
                   placeholder:text-muted/50 font-body"
      />
    </div>
  )
}