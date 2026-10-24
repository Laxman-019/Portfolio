import { useEffect, useRef, useState } from 'react'
import { FiMessageCircle, FiX, FiSend, FiArrowUpRight } from 'react-icons/fi'
import { answerFor, welcome, suggestions } from '../data/chatbot'

let nextId = 1
const makeMsg = (role, text, links = []) => ({ id: nextId++, role, text, links })

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState(() => [makeMsg('bot', welcome.text, welcome.links)])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const listRef = useRef(null)
  const inputRef = useRef(null)

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
    setTimeout(() => {
      const reply = answerFor(q)
      if (reply) setMessages(m => [...m, makeMsg('bot', reply.text, reply.links)])
      setTyping(false)
    }, 600)
  }

  return (
    <>
      {/* Phones: dim the page behind the chat sheet */}
      {open && (
        <button
          aria-label="Close chat"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-55 bg-black/50 md:hidden"
        />
      )}

      {/* Launcher: sits above the bottom island on phones */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls="chat-panel"
        aria-label={open ? 'Close chat' : 'Ask about Laxman'}
        className="fixed bottom-24 right-4 z-40 flex size-14 items-center justify-center gap-2 rounded-full bg-accent text-canvas shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] transition-transform hover:scale-105 md:bottom-6 md:right-6 md:w-auto md:px-5"
      >
        {open ? <FiX size={22} /> : <FiMessageCircle size={22} />}
        <span className="hidden font-medium md:inline">{open ? 'Close' : 'Ask about Laxman'}</span>
      </button>

      {/* Panel: bottom sheet on phones, floating window on desktop */}
      <div
        id="chat-panel"
        role="dialog"
        aria-label="Chat about Laxman"
        className={`fixed inset-x-0 bottom-0 z-60 flex h-[82dvh] flex-col overflow-hidden rounded-t-3xl border border-line bg-canvas shadow-2xl transition-all duration-200 md:inset-x-auto md:bottom-24 md:right-6 md:h-136 md:max-h-[calc(100dvh-8rem)] md:w-96 md:rounded-3xl ${
          open ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-6 opacity-0'
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent font-display text-lg font-extrabold text-canvas">
            L
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-base font-bold leading-tight">Ask about Laxman</p>
            <p className="flex items-center gap-1.5 text-xs text-muted">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              Only answers questions about Laxman
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:text-ink"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Messages */}
        <div
          ref={listRef}
          role="log"
          aria-live="polite"
          className="flex-1 space-y-3 overflow-y-auto overscroll-contain p-4"
        >
          {messages.map(m =>
            m.role === 'user' ? (
              <div
                key={m.id}
                className="ml-auto w-fit max-w-[85%] whitespace-pre-line wrap-break-words rounded-2xl rounded-tr-md bg-accent px-3.5 py-2.5 text-sm leading-relaxed text-canvas"
              >
                {m.text}
              </div>
            ) : (
              <div key={m.id} className="max-w-[88%]">
                <div className="w-fit whitespace-pre-line wrap-break-words rounded-2xl rounded-tl-md border border-line bg-surface px-3.5 py-2.5 text-sm leading-relaxed">
                  {m.text}
                </div>
                {m.links?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {m.links.map(l => (
                      <a
                        key={l.label}
                        href={l.href}
                        target={l.href.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer"
                        onClick={() => l.href.startsWith('#') && setOpen(false)}
                        className="inline-flex items-center gap-1 rounded-full border border-accent/40 px-3 py-1.5 text-xs text-accent transition-colors hover:bg-accent/10"
                      >
                        {l.label}
                        <FiArrowUpRight size={12} />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )
          )}

          {typing && (
            <div
              role="status"
              aria-label="Assistant is typing"
              className="flex w-fit items-center gap-1 rounded-2xl rounded-tl-md border border-line bg-surface px-4 py-3"
            >
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className="size-1.5 animate-bounce rounded-full bg-muted motion-reduce:animate-none"
                  style={{ animationDelay: `${i * 120}ms` }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Quick questions: swipe sideways on phones */}
        <div className="flex gap-2 overflow-x-auto px-4 pb-2 pt-1 [scrollbar-none] [&::-webkit-scrollbar]:hidden">
          {suggestions.map(s => (
            <button
              key={s}
              onClick={() => send(s)}
              disabled={typing}
              className="shrink-0 rounded-full border border-line px-3.5 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-ink active:border-accent disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={e => {
            e.preventDefault()
            send(input)
          }}
          className="flex items-center gap-2 border-t border-line p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            maxLength={200}
            placeholder="Ask about Laxman…"
            aria-label="Your question"
            enterKeyHint="send"
            autoComplete="off"
            className="min-w-0 flex-1 rounded-full border border-line bg-surface px-4 py-3 text-base outline-none transition-colors placeholder:text-muted/60 focus:border-accent"
          />
          <button
            type="submit"
            disabled={!input.trim() || typing}
            aria-label="Send question"
            className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-canvas transition-colors hover:bg-ink disabled:opacity-40"
          >
            <FiSend size={18} />
          </button>
        </form>
      </div>
    </>
  )
}