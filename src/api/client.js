import { supabase } from '@/lib/supabaseClient'

const BASE = import.meta.env.VITE_API_URL || '' // e.g., http://localhost:8787

async function getAccessToken() {
  const { data } = await supabase.auth.getSession()
  return data?.session?.access_token || null
}

async function apiFetch(path, { method = 'GET', headers = {}, body } = {}) {
  const token = await getAccessToken()
  const res = await fetch(`${BASE}/api${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`API ${method} ${path} failed: ${res.status} ${res.statusText} ${text}`)
  }
  return res.json()
}

export const api = { fetch: apiFetch }
