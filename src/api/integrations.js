import { api } from './client'
import { supabase } from '@/lib/supabaseClient'

export const Core = {}

// AI proxy to OpenAI on the server
export async function InvokeLLM(payload) {
  return api.fetch('/ai-search', { method: 'POST', body: payload })
}

// Email proxy (server will call provider; configure via env)
export async function SendEmail({ to, subject, html, text }) {
  return api.fetch('/send-email', { method: 'POST', body: { to, subject, html, text } })
}

// Upload file: prefer Supabase Storage from the client for speed
export async function UploadFile({ bucket = 'uploads', path, file, options = {} }) {
  const { data, error } = await supabase.storage.from(bucket).upload(path, file, options)
  if (error) throw error
  const { data: pub } = supabase.storage.from(bucket).getPublicUrl(path)
  return { path, url: pub.publicUrl }
}

// Server-side data extraction (e.g., parse CSV/PDF)
export async function ExtractDataFromUploadedFile({ url, type }) {
  return api.fetch('/extract-data', { method: 'POST', body: { url, type } })
}

// Placeholder image generation (optional; configure server provider)
export async function GenerateImage(params) {
  return api.fetch('/generate-image', { method: 'POST', body: params })
}
