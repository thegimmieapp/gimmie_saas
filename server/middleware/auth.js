export function makeAuthMiddleware(supabase) {
  return async function authMiddleware(req, res, next) {
    try {
      const auth = req.headers.authorization || ''
      const token = auth.startsWith('Bearer ') ? auth.slice(7) : null
      if (!token || !supabase) return next()
      const { data, error } = await supabase.auth.getUser(token)
      if (error) return next()
      req.user = data.user
      next()
    } catch (e) {
      next()
    }
  }
}
