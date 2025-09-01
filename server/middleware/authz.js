export function requireAuthenticated(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated' })
  next()
}

export function makeRoleChecker(supabase) {
  async function hasPlatformRole(userId, role) {
    if (!supabase || !userId) return false
    const { data } = await supabase.from('user_roles').select('role').eq('user_id', userId).maybeSingle()
    return data?.role === role
  }
  async function isStoreMember(userId, storeId) {
    if (!supabase || !userId || !storeId) return false
    const { data } = await supabase.from('store_memberships').select('user_id').eq('store_id', storeId).eq('user_id', userId).maybeSingle()
    return !!data
  }
  return { hasPlatformRole, isStoreMember }
}
