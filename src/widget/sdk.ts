// src/widget/sdk.ts
import React from 'react'
import { createRoot } from 'react-dom/client'
import { WidgetRoot } from './WidgetRoot'

declare global {
  interface Window { GIMMIE?: any }
}

function bootstrapFromScriptTag() {
  const currentScript = (document.currentScript as HTMLScriptElement) || document.querySelector('script[data-store-id]')
  if (!currentScript) return
  const storeId = currentScript.getAttribute('data-store-id') || ''
  const apiBase = currentScript.getAttribute('data-api-base') || ''

  // Create mount node
  let node = document.getElementById('gimmie-widget-root')
  if (!node) {
    node = document.createElement('div')
    node.id = 'gimmie-widget-root'
    document.body.appendChild(node)
  }
  const root = createRoot(node)
  root.render(React.createElement(WidgetRoot, { storeId, apiBase, onEvent: (name: string, props: any) => {
    // Fire-and-forget event tracking; ignore errors
    fetch(`${apiBase}/api/track/event`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ storeId, name, props }) }).catch(()=>{})
  }}))
}

export function init(options: { storeId: string, apiBase: string, onEvent?: (name:string, props:any)=>void }) {
  const { storeId, apiBase, onEvent } = options
  let node = document.getElementById('gimmie-widget-root')
  if (!node) {
    node = document.createElement('div')
    node.id = 'gimmie-widget-root'
    document.body.appendChild(node)
  }
  const root = createRoot(node)
  root.render(React.createElement(WidgetRoot, { storeId, apiBase, onEvent }))
}

export function search(query: string) {
  console.warn('GIMMIE.search is deprecated; call init() and use the UI.')
}

// Auto-bootstrap if loaded via <script data-store-id ...>
if (typeof window !== 'undefined') {
  // Expose global
  window.GIMMIE = { init, search }
  bootstrapFromScriptTag()
}
