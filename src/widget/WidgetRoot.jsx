import React, { useEffect, useState } from 'react'

export function WidgetRoot({ apiBase, storeId, onEvent }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [sessionToken, setSessionToken] = useState(null)

  useEffect(() => {
    async function init() {
      try {
        const resp = await fetch(`${apiBase}/api/widget/session`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ storeId })
        })
        const data = await resp.json()
        setSessionToken(data.sessionToken)
        onEvent?.('widget_init', { storeId })
      } catch (e) {
        console.warn('Widget init failed', e)
      }
    }
    init()
  }, [apiBase, storeId])

  async function runSearch(e) {
    e?.preventDefault?.()
    if (!query) return
    onEvent?.('search', { query })
    try {
      const resp = await fetch(`${apiBase}/api/search/ai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, storeId, profileHints: {} })
      })
      const data = await resp.json()
      setResults(data.products || [])
    } catch (e) {
      console.warn('search failed', e)
    }
  }

  async function handleClick(p) {
    onEvent?.('click', { productId: p.id })
    try {
      const r = await fetch(`${apiBase}/api/affiliate/click`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ storeId, productId: p.id, sessionId: null, userId: null })
      })
      const j = await r.json()
      const url = p.external_url || '#'
      const redirectUrl = url.includes('?') ? `${url}&gref=${j.refToken}` : `${url}?gref=${j.refToken}`
      window.open(redirectUrl, '_blank')
    } catch (e) {
      console.warn('click failed', e)
    }
  }

  return (
    <div style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 99999 }}>
      {!open && (
        <button onClick={() => setOpen(true)} style={btnStyle}>
          GIMMIE
        </button>
      )}
      {open && (
        <div style={panelStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong>GIMMIE Gift Search</strong>
            <button onClick={() => setOpen(false)} style={btnSm}>×</button>
          </div>
          <form onSubmit={runSearch} style={{ marginTop: 8, display: 'flex', gap: 8 }}>
            <input
              value={query} onChange={e => setQuery(e.target.value)}
              placeholder="e.g. gifts for a 10-year-old who likes LEGO"
              style={inputStyle}
            />
            <button type="submit" style={btnStyle}>Search</button>
          </form>
          <div style={{ marginTop: 12, maxHeight: 320, overflow: 'auto' }}>
            {results.map(p => (
              <div key={p.id} style={cardStyle} onClick={() => handleClick(p)}>
                <div style={{ fontWeight: 600 }}>{p.title}</div>
                {p.price_cents != null && <div>${(p.price_cents/100).toFixed(2)}</div>}
                <div style={{ fontSize: 12, opacity: 0.8 }}>{p.tags?.join(', ')}</div>
              </div>
            ))}
            {!results.length && <div style={{ opacity: 0.7 }}>No results yet. Try a query above.</div>}
          </div>
        </div>
      )}
    </div>
  )
}

const btnStyle = { padding: '8px 12px', background: '#2563eb', color: 'white', border: 0, borderRadius: 8, cursor: 'pointer' }
const btnSm = { ...btnStyle, padding: '2px 8px', background: '#111827' }
const panelStyle = { width: 360, background: 'white', color: '#111827', borderRadius: 12, boxShadow: '0 10px 30px rgba(0,0,0,0.2)', padding: 12 }
const inputStyle = { flex: 1, padding: '8px 10px', border: '1px solid #e5e7eb', borderRadius: 8 }
const cardStyle = { padding: 8, border: '1px solid #e5e7eb', borderRadius: 8, marginBottom: 8, cursor: 'pointer' }
