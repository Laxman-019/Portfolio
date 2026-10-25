import { useEffect, useRef, useState } from 'react'
import {
  FiMessageCircle,
  FiX,
  FiSend,
  FiArrowUpRight,
  FiRotateCcw,
  FiUser,
  FiCode,
  FiZap,
  FiBriefcase,
  FiBookOpen,
  FiMail,
} from 'react-icons/fi'
import { answerFor, welcome, suggestions } from '../data/chatbot'

let nextId = 1
const makeMsg = (role, text, links = []) => ({ id: nextId++, role, text, links })

// Picks an icon for a suggestion from its wording, so it works with whatever is in data/chatbot.js
const iconFor = text => {
  const t = text.toLowerCase()
  if (t.includes('who') || t.includes('about')) return FiUser
  if (t.includes('project')) return FiCode
  if (t.includes('skill') || t.includes('tech')) return FiZap
  if (t.includes('experience') || t.includes('intern') || t.includes('work')) return FiBriefcase
  if (t.includes('education') || t.includes('study') || t.includes('college')) return FiBookOpen
  if (t.includes('contact') || t.includes('hire') || t.includes('email') || t.includes('reach')) return FiMail
  return FiMessageCircle
}

function BotAvatar({ className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-full bg-linear-to-br from-accent-deep to-accent font-display font-extrabold text-white ${className}`}
    >
      L
    </span>
  )
}

function LinkChips({ links, onNavigate }) {
  if (!links?.length) return null
  return (
    <div className="flex flex-wrap gap-2">
      {links.map(l => (
        <a
          key={l.label}
          href={l.href}
          target={l.href.startsWith('http') ? '_blank' : undefined}
          rel="noreferrer"
          onClick={() => l.href.startsWith('#') && onNavigate()}
          className="inline-flex items-center gap-1 rounded-full border border-accent/40 bg-accent/5 px-3 py-1.5 text-xs text-accent transition-colors hover:bg-accent/15"
        >
          {l.label}
          <FiArrowUpRight size={12} />
        </a>
      ))}
    </div>
  )
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState(() => [makeMsg('bot', welcome.text, welcome.links)])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const listRef = useRef(null)
  const inputRef = useRef(null)
  const replyTimer = useRef(null)

  // Only the welcome message so far: show the hero welcome with suggestion cards
  const fresh = messages.length === 1 && !typing

  // Keep the newest message in view
  useEffect(() => {
    const el = listRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, typing, open])

  // Esc closes; on phones the page behind stays still; on desktop focus the input
  useEffect(() => {
    if (!open) return
    const onKey = e => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)

    const isPhone = window.matchMedia('(max-width: 767px)').matches
    let timer
    if (isPhone) document.body.style.overflow = 'hidden'
    else timer = setTimeout(() => inputRef.current?.focus(), 150)

    return () => {
      window.removeEventListener('keydown', onKey)
      clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [open])

  const send = text => {
    const q = text.trim()
    if (!q || typing) return
    setMessages(m => [...m, makeMsg('user', q)])
    setInput('')
    setTyping(true)
    replyTimer.current = setTimeout(() => {
      const reply = answerFor(q)
      if (reply) setMessages(m => [...m, makeMsg('bot', reply.text, reply.links)])
      setTyping(false)
    }, 600)
  }

  const reset = () => {
    clearTimeout(replyTimer.current)
    setTyping(false)
    setInput('')
    setMessages([makeMsg('bot', welcome.text, welcome.links)])
  }

  const closeChat = () => setOpen(false)

  return (
    <>
      {/* Phones: dim and blur the page behind the chat sheet */}
      {open && (
        <button
          aria-label="Close chat"
          onClick={closeChat}
          className="fixed inset-0 z-55 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Launcher: icon only, the label slides out on hover or keyboard focus (desktop).
          A soft ring pings a few times to draw the eye. Sits above the bottom island on phones. */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls="chat-panel"
        aria-label={open ? 'Close chat' : 'Ask about Laxman'}
        className="group fixed bottom-24 right-4 z-40 flex size-14 items-center justify-center rounded-full bg-accent-deep text-white shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] transition-transform hover:scale-105 md:bottom-6 md:right-6 md:w-auto md:min-w-14 md:px-4"
      >
        {!open && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 animate-ping rounded-full bg-accent/40 [animation-iteration-count:3] motion-reduce:animate-none"
          />
        )}
        {open ? <FiX size={22} /> : <FiMessageCircle size={22} />}
        <span className="hidden overflow-hidden whitespace-nowrap font-medium opacity-0 transition-all duration-300 md:block md:max-w-0 md:group-hover:ml-2 md:group-hover:max-w-44 md:group-hover:opacity-100 md:group-focus-visible:ml-2 md:group-focus-visible:max-w-44 md:group-focus-visible:opacity-100">
          {open ? 'Close' : 'Ask about Laxman'}
        </span>
      </button>

      {/* Panel: bottom sheet on phones, floating window on desktop */}
      <div
        id="chat-panel"
        role="dialog"
        aria-label="Chat about Laxman"
        className={`fixed inset-x-0 bottom-0 z-60 flex h-[88dvh] flex-col overflow-hidden rounded-t-[28px] border border-line bg-canvas shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.7)] transition-all duration-300 md:inset-x-auto md:bottom-24 md:right-6 md:h-[36rem] md:max-h-[calc(100dvh-8rem)] md:w-[27rem] md:origin-bottom-right md:rounded-3xl md:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] ${
          open
            ? 'visible translate-y-0 opacity-100 md:scale-100'
            : 'invisible translate-y-6 opacity-0 md:scale-95'
        }`}
      >
        {/* Colour wash behind the top of the panel */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-linear-to-b from-accent-deep/30 to-transparent"
        />

        {/* Drag handle look on phones */}
        <div aria-hidden="true" className="relative mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-line md:hidden" />

        {/* Header */}
        <div className="relative flex items-center gap-3 px-4 py-3.5">
          <div className="relative">
            <BotAvatar className="size-10 text-base" />
            <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-canvas bg-emerald-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-display text-lg font-bold leading-tight">Laxman&rsquo;s assistant</p>
          </div>
          <button
            onClick={reset}
            aria-label="Start a new chat"
            title="New chat"
            className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-ink"
          >
            <FiRotateCcw size={16} />
          </button>
          <button
            onClick={closeChat}
            aria-label="Close chat"
            className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-ink"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Messages */}
        <div
          ref={listRef}
          role="log"
          aria-live="polite"
          className="relative flex-1 overflow-y-auto overscroll-contain px-4 pb-4 pt-2"
        >
          {fresh ? (
            <>
              {/* Welcome hero */}
              <div className="rise flex flex-col items-center pt-4 text-center">
                <div className="relative">
                  <div aria-hidden="true" className="absolute inset-0 rounded-full bg-accent/40 blur-2xl" />
                  <BotAvatar className="relative size-16 text-3xl ring-4 ring-accent/20" />
                </div>
                <h2 className="mt-5 font-display text-2xl font-extrabold leading-tight">How can I help?</h2>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">{welcome.text}</p>
                {welcome.links?.length > 0 && (
                  <div className="mt-3">
                    <LinkChips links={welcome.links} onNavigate={closeChat} />
                  </div>
                )}
              </div>

              {/* Suggestion cards */}
              <div className="rise mt-6 grid grid-cols-2 gap-2.5" style={{ '--i': 2 }}>
                {suggestions.map((s, i) => {
                  const Icon = iconFor(s)
                  const lastOdd = suggestions.length % 2 === 1 && i === suggestions.length - 1
                  return (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className={`group/chip flex items-center gap-2.5 rounded-2xl border border-line bg-surface/70 p-3 text-left text-sm transition-colors hover:border-accent hover:bg-accent/10 ${
                        lastOdd ? 'col-span-2' : ''
                      }`}
                    >
                      <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent transition-colors group-hover/chip:bg-accent-deep group-hover/chip:text-white">
                        <Icon size={15} />
                      </span>
                      <span className="leading-tight">{s}</span>
                    </button>
                  )
                })}
              </div>
            </>
          ) : (
            <div className="space-y-4 pt-2">
              {messages.map(m =>
                m.role === 'user' ? (
                  <div key={m.id} className="rise flex justify-end">
                    <div className="max-w-[82%] whitespace-pre-line wrap-break-word rounded-2xl rounded-br-md bg-accent-deep px-4 py-2.5 text-sm leading-relaxed text-white">
                      {m.text}
                    </div>
                  </div>
                ) : (
                  <div key={m.id} className="rise flex items-end gap-2">
                    <BotAvatar className="size-7 text-xs" />
                    <div className="max-w-[82%] space-y-2">
                      <div className="w-fit whitespace-pre-line wrap-break-word rounded-2xl rounded-bl-md border border-line bg-surface px-4 py-2.5 text-sm leading-relaxed">
                        {m.text}
                      </div>
                      <LinkChips links={m.links} onNavigate={closeChat} />
                    </div>
                  </div>
                )
              )}

              {typing && (
                <div className="flex items-end gap-2">
                  <BotAvatar className="size-7 text-xs" />
                  <div
                    role="status"
                    aria-label="Assistant is typing"
                    className="flex w-fit items-center gap-1 rounded-2xl rounded-bl-md border border-line bg-surface px-4 py-3.5"
                  >
                    {[0, 1, 2].map(i => (
                      <span
                        key={i}
                        className="size-1.5 animate-bounce rounded-full bg-muted motion-reduce:animate-none"
                        style={{ animationDelay: `${i * 120}ms` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* After the first question: one swipeable row of quick questions */}
        {!fresh && (
          <div className="relative flex gap-2 overflow-x-auto px-4 pb-2 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {suggestions.map(s => (
              <button
                key={s}
                onClick={() => send(s)}
                disabled={typing}
                className="shrink-0 rounded-full border border-line bg-surface/70 px-3.5 py-2 text-sm text-muted transition-colors hover:border-accent hover:bg-accent/10 hover:text-ink disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Composer */}
        <form
          onSubmit={e => {
            e.preventDefault()
            send(input)
          }}
          className="relative p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
        >
          <div className="flex items-center gap-2 rounded-full border border-line bg-surface py-1.5 pl-4 pr-1.5 shadow-lg shadow-black/20 transition-colors focus-within:border-accent">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              maxLength={200}
              placeholder="Ask about Laxman…"
              aria-label="Your question"
              enterKeyHint="send"
              autoComplete="off"
              style={{ outline: 'none' }}
              className="min-w-0 flex-1 bg-transparent py-2 text-base placeholder:text-muted/60"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              aria-label="Send question"
              className="grid size-10 shrink-0 place-items-center rounded-full bg-accent-deep text-white transition-colors hover:bg-accent disabled:opacity-40"
            >
              <FiSend size={17} />
            </button>
          </div>
          <p className="mt-2 text-center text-[11px] text-muted">Answers come from Laxman&rsquo;s portfolio only</p>
        </form>
      </div>
    </>
  )
}