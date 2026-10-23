import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { FaEnvelope, FaPhoneAlt, FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { FiCopy, FiCheck, FiSend, FiArrowUpRight, FiCheckCircle } from 'react-icons/fi'
import SectionHeader from './SectionHeader'
import CursorGlow from './CursorGlow'
import { profile } from '../data/content'

const channels = [
  { Icon: FaEnvelope, label: 'Email', value: profile.email, href: `mailto:${profile.email}`, copy: true },
  { Icon: FaPhoneAlt, label: 'Mobile', value: profile.phone, href: profile.phoneHref, copy: true },
  { Icon: FaGithub, label: 'GitHub', value: profile.githubLabel, href: profile.github },
  { Icon: FaLinkedinIn, label: 'LinkedIn', value: profile.linkedinLabel, href: profile.linkedin },
]

const fieldClass =
  'w-full rounded-xl border border-line bg-canvas/60 px-4 py-3.5 text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-accent'

export default function Contact() {
  const formRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState('')

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const copyValue = async (label, value) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(label)
      setTimeout(() => setCopied(c => (c === label ? '' : c)), 1800)
    } catch {
    }
  }

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
          setTimeout(() => setSent(false), 5000)
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
          intro="Have an opportunity or an idea? Send a message, or reach me directly through any channel."
        />

        <CursorGlow
          size={520}
          strength={14}
          className="overflow-hidden rounded-[1.75rem] border border-line/70 bg-surface"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">
            {/* Left: direct channels */}
            <div className="min-w-0 border-b border-line p-6 sm:p-10 lg:border-b-0 lg:border-r">
              <h3 className="font-display text-2xl font-bold sm:text-3xl">Reach me directly</h3>
              <p className="mt-2 text-muted">
                Pick whatever is easiest. Use the copy button to save an address or number.
              </p>

              <ul className="mt-8 space-y-3">
                {channels.map(({ Icon, label, value, href, copy }) => (
                  <li key={label} className="flex items-stretch gap-2">
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="group flex min-w-0 flex-1 items-center gap-4 rounded-xl border border-line bg-canvas/60 px-4 py-3.5 transition-colors hover:border-accent"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                        <Icon size={16} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs text-muted">{label}</span>
                        <span className="block truncate">{value}</span>
                      </span>
                      {!copy && (
                        <FiArrowUpRight
                          size={18}
                          className="shrink-0 text-muted transition-colors group-hover:text-accent"
                        />
                      )}
                    </a>

                    {copy && (
                      <button
                        type="button"
                        onClick={() => copyValue(label, value)}
                        aria-label={`Copy ${label.toLowerCase()}`}
                        className="flex w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-canvas/60 text-muted transition-colors hover:border-accent hover:text-accent active:border-accent"
                      >
                        {copied === label ? (
                          <FiCheck size={18} className="text-accent" />
                        ) : (
                          <FiCopy size={18} />
                        )}
                      </button>
                    )}
                  </li>
                ))}
              </ul>

              <span className="sr-only" role="status">
                {copied ? `${copied} copied` : ''}
              </span>
            </div>

            {/* Right: message form */}
            <form ref={formRef} onSubmit={submit} className="flex min-w-0 flex-col gap-4 p-6 sm:p-10">
              <div className="mb-2">
                <h3 className="font-display text-2xl font-bold sm:text-3xl">Send a message</h3>
                <p className="mt-2 text-muted">Fill in the form and it lands in my inbox.</p>
              </div>

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
                <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300">
                  {error}
                </p>
              )}

              {sent && (
                <p role="status" className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300">
                  <FiCheckCircle size={18} className="shrink-0" />
                  Thanks! Your message is on its way.
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 font-medium text-canvas transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? 'Sending…' : 'Send message'}
                {!isSubmitting && <FiSend size={17} />}
              </button>
            </form>
          </div>
        </CursorGlow>
      </div>
    </section>
  )
}