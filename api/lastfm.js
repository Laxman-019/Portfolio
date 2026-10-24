export default async function handler(req, res) {
  const { LASTFM_API_KEY, LASTFM_USER } = process.env
  if (!LASTFM_API_KEY || !LASTFM_USER) {
    return res.status(500).json({ error: 'Missing env vars' })
  }

  try {
    const url = new URL('https://ws.audioscrobbler.com/2.0/')
    url.search = new URLSearchParams({
      method: 'user.getrecenttracks',
      user: LASTFM_USER,
      api_key: LASTFM_API_KEY,
      format: 'json',
      limit: '1',
    })

    const r = await fetch(url)
    if (!r.ok) throw new Error('Last.fm request failed')
    const data = await r.json()
    const t = data.recenttracks?.track?.[0]

    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60')
    if (!t) return res.status(200).json({ track: null })

    res.status(200).json({
      track: {
        name: t.name,
        artist: t.artist['#text'],
        url: t.url,
        nowPlaying: t['@attr']?.nowplaying === 'true',
      },
    })
  } catch {
    res.status(502).json({ error: 'Could not reach Last.fm' })
  }
}