import { useEffect, useState } from 'react'
import { FaLastfm } from 'react-icons/fa'
import { FiMusic, FiArrowUpRight } from 'react-icons/fi'

const ago = uts => {
  const s = Math.max(0, Math.floor(Date.now() / 1000 - uts))
  if (s < 60) return 'just now'
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

function Equalizer() {
  return (
    <span aria-hidden="true" className="flex h-3 items-end gap-0.5">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="lp-bar w-0.5 rounded-full bg-accent"
          style={{ animationDelay: `${i * 0.18}s` }}
        />
      ))}
    </span>
  )
}

export default function LastPlayed() {
  const [track, setTrack] = useState(null)
  const [broken, setBroken] = useState(false)

  useEffect(() => {
    let alive = true
    const load = async () => {
      try {
        const r = await fetch('/api/lastfm')
        if (!r.ok) return
        const d = await r.json()
        if (alive) {
          setTrack(d.track)
          setBroken(false)
        }
      } catch {
        /* keep whatever we had */
      }
    }
    load()
    const id = setInterval(load, 30000)
    return () => {
      alive = false
      clearInterval(id)
    }
  }, [])

  if (!track) return null

  const label = track.nowPlaying
    ? 'Now playing'
    : track.playedAt
      ? `Last played \u00b7 ${ago(track.playedAt)}`
      : 'Last played'

  return (
    <>
      <style>{`
        @keyframes lp-eq { 0%, 100% { height: 30%; } 50% { height: 100%; } }
        .lp-bar { height: 30%; animation: lp-eq 0.9s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .lp-bar { animation: none; height: 60%; } }
      `}</style>

      <a
        href={track.url}
        target="_blank"
        rel="noreferrer"
        className="group inline-flex min-w-0 max-w-full items-center gap-3 rounded-2xl border border-line bg-surface/70 p-2 pr-4 backdrop-blur-sm transition-colors hover:border-accent/60"
      >
        {/* Cover art, or a music icon when Last.fm has none */}
        <span
          className={`relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-xl bg-accent/10 text-accent ${
            track.nowPlaying ? 'ring-2 ring-accent/60' : ''
          }`}
        >
          {track.cover && !broken ? (
            <img
              src={track.cover}
              alt=""
              loading="lazy"
              onError={() => setBroken(true)}
              className="size-full object-cover"
            />
          ) : (
            <FiMusic size={18} />
          )}
        </span>

        <span className="min-w-0 text-left">
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-accent">
            {track.nowPlaying ? <Equalizer /> : <FaLastfm aria-hidden="true" size={11} />}
            {label}
          </span>
          <span className="block truncate text-sm font-semibold text-ink">{track.name}</span>
          <span className="block truncate text-xs text-muted">{track.artist}</span>
        </span>

        <FiArrowUpRight
          aria-hidden="true"
          size={16}
          className="shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
        />
      </a>
    </>
  )
}