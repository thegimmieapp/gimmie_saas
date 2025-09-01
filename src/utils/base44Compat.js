// Base44 compatibility helpers to avoid refactors during migration.

/**
 * createPageUrl('/products', { q: 'shoes', page: 2 })
 * -> '/products?q=shoes&page=2'
 */
export function createPageUrl(path, params = {}) {
  const url = new URL(path, 'http://dummy.local') // base ignored for pathname+search
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === '') return
    if (Array.isArray(v)) v.forEach(val => url.searchParams.append(k, String(val)))
    else url.searchParams.set(k, String(v))
  })
  const q = url.searchParams.toString()
  return q ? `${path}?${q}` : path
}

/**
 * navigateTo(router, path, params) – convenience for React Router navigation
 */
export function navigateTo(navigate, path, params) {
  return navigate(createPageUrl(path, params))
}

/**
 * pick(obj, ['a','b']) – small utility used in some Base44 samples
 */
export const pick = (obj, keys) => Object.fromEntries(keys
  .filter(k => k in (obj || {}))
  .map(k => [k, obj[k]]))

/**
 * sleep(ms) – helper for async throttling
 */
export const sleep = (ms) => new Promise(r => setTimeout(r, ms))
