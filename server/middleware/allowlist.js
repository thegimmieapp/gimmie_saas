import CidrMatcher from 'cidr-matcher'

function parseList(listStr) {
  if (!listStr) return []
  return listStr.split(',').map(s => s.trim()).filter(Boolean)
}

export function makeAllowlistMiddleware() {
  const list = parseList(process.env.CF_IP_ALLOWLIST || '')
  const matcher = list.length ? new CidrMatcher(list) : null
  return function allowlist(req, res, next) {
    if (!matcher) return next()
    const ip = (req.headers['cf-connecting-ip'] || req.ip || '').toString()
    if (!ip) return res.status(403).send('Forbidden')
    if (!matcher.contains(ip)) return res.status(403).send('Forbidden')
    next()
  }
}
