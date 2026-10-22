import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { FaEnvelope, FaPhoneAlt, FaGithub, FaLinkedinIn } from 'react-icons/fa'
import SectionHeader from './SectionHeader'
import { profile } from '../data/content'

const contactLinks = [
  { Icon: FaEnvelope, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { Icon: FaPhoneAlt, label: 'Mobile', value: profile.phone, href: profile.phoneHref },
  { Icon: FaGithub, label: 'GitHub', value: profile.githubLabel, href: profile.github },
  { Icon: FaLinkedinIn, label: 'LinkedIn', value: profile.linkedinLabel, href: profile.linkedin },
]

const fieldClass =
  'w-full rounded-lg border border-line bg-surface px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-accent'

export default function Contact() {
  const formRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = e => {
    e.preventDefault()

    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all fields.')
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
        () => {
          setSent(true)
          setForm({ name: '', email: '', message: '' })
          setTimeout(() => setSent(false), 3000)
        },
        () => {
          setError('The message did not send. Please try again, or email me directly.')
          setTimeout(() => setError(''), 4000)
        }
      )
      .finally(() => setIsSubmitting(false))
  }

  return (
    <section id="contact" className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title="Get in touch"
          intro="I'm open to internships, collaborations, or a good conversation about tech. Reach out through any channel below."
        />

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <ul className="flex flex-col gap-3">
            {contactLinks.map(({ Icon, label, value, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="flex items-center gap-4 rounded-xl border border-line bg-surface px-4 py-3.5 transition-colors hover:border-accent"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Icon size={16} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-muted">{label}</span>
                    <span className="block truncate">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <form ref={formRef} onSubmit={submit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm text-muted">Your name</label>
              <input id="name" name="name" autoComplete="name" value={form.name} onChange={handle} placeholder="Your full name" required className={fieldClass} />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm text-muted">Email address</label>
              <input id="email" name="email" type="email" autoComplete="email" value={form.email} onChange={handle} placeholder="you@example.com" required className={fieldClass} />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm text-muted">Message</label>
              <textarea id="message" name="message" rows={5} value={form.message} onChange={handle} placeholder="Tell me about your project or opportunity" required className={`${fieldClass} resize-none`} />
            </div>

            {error && (
              <p role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-700 dark:text-red-300">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-accent px-7 py-3.5 font-medium text-canvas transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Sending…' : sent ? 'Message sent' : 'Send message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}