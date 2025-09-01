import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

function arg(name, fallback = undefined) {
  const i = process.argv.indexOf(name)
  if (i !== -1 && process.argv[i+1]) return process.argv[i+1]
  return fallback
}

const email = arg('--email', 'demo@gimmie.ai')
const password = arg('--password', 'DemoPass!123')
const storeDomain = arg('--storeDomain', 'demo.gimmie.ai')
const role = arg('--role', 'admin') // default role

const url = process.env.SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !serviceKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY'); process.exit(1)
}
const supabase = createClient(url, serviceKey)

async function main() {
  // 1) Create or fetch user
  let userId
  const { data: existingUser, error: getErr } = await supabase.auth.admin.listUsers({ page: 1, perPage: 200 })
  if (getErr) throw getErr
  const found = existingUser.users.find(u => u.email?.toLowerCase() === email.toLowerCase())
  if (found) {
    userId = found.id
    console.log('User exists:', email, userId)
  } else {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name: 'Demo User' },
      app_metadata: { role }
    })
    if (error) throw error
    userId = data.user.id
    console.log('Created user:', email, userId)
  }

  // 2) Upsert profile
  const { error: profErr } = await supabase
    .from('profiles')
    .upsert({ id: userId, full_name: 'Demo User', avatar_url: null })
  if (profErr) throw profErr

  // 3) Assign role in user_roles (table-based)
  const { error: roleErr } = await supabase
    .from('user_roles')
    .upsert({ user_id: userId, role })
  if (roleErr) throw roleErr
  console.log('Assigned role:', role)

  // 4) Attach store ownership by domain
  const { data: store, error: storeErr } = await supabase
    .from('stores')
    .select('id, owner_id, domain')
    .eq('domain', storeDomain)
    .single()
  if (storeErr) throw storeErr
  if (!store.owner_id) {
    const { error: updErr } = await supabase
      .from('stores')
      .update({ owner_id: userId })
      .eq('id', store.id)
    if (updErr) throw updErr
    console.log('Assigned store owner:', store.domain)
  } else {
    console.log('Store already has owner:', store.domain)
  }

  console.log('✅ Admin seed complete')
}

main().catch(e => { console.error(e); process.exit(1) })
