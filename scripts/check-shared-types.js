// scripts/check-shared-types.js
/**
 * Fails CI if core types (Product, SearchRequest, SearchResponse, AffiliateClick, Profile)
 * are defined anywhere outside src/shared/types.ts.
 * Also suggests importing from shared types if local duplicates are detected.
 */
const fs = require('fs')
const path = require('path')

const ROOT = process.cwd()
const SHARED = path.join(ROOT, 'src', 'shared', 'types.ts')

const CORE_TYPES = [
  'Product',
  'SearchRequest',
  'SearchResponse',
  'AffiliateClick',
  'Profile'
]

function listFiles(dir, exts=['.ts','.tsx','.js','.jsx']) {
  let out = []
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const fp = path.join(dir, ent.name)
    if (ent.isDirectory()) {
      if (['node_modules', '.git', 'dist', 'build', '.expo', 'android', 'ios'].includes(ent.name)) continue
      out = out.concat(listFiles(fp, exts))
    } else {
      if (exts.includes(path.extname(ent.name))) out.push(fp)
    }
  }
  return out
}

function hasTypeDef(source, typeName) {
  const patterns = [
    new RegExp(`interface\\s+${typeName}\\b`),
    new RegExp(`type\\s+${typeName}\\b`),
    new RegExp(`export\\s+interface\\s+${typeName}\\b`),
    new RegExp(`export\\s+type\\s+${typeName}\\b`),
  ]
  return patterns.some(re => re.test(source))
}

function main() {
  if (!fs.existsSync(SHARED)) {
    console.error(`[check-shared-types] MISSING shared file: ${SHARED}`)
    process.exit(1)
  }
  const all = listFiles(ROOT)
  const offenders = []
  for (const fp of all) {
    // skip shared types file itself
    if (path.resolve(fp) === path.resolve(SHARED)) continue
    const rel = path.relative(ROOT, fp)
    const src = fs.readFileSync(fp, 'utf8')

    // look for forbidden type re-definitions
    for (const t of CORE_TYPES) {
      if (hasTypeDef(src, t)) {
        offenders.push({ file: rel, type: t })
      }
    }
  }

  if (offenders.length) {
    console.error('\n[check-shared-types] Found duplicate core type definitions outside src/shared/types.ts:')
    for (const o of offenders) {
      console.error(` - ${o.type} in ${o.file}`)
    }
    console.error('\nFix: remove duplicates and import from src/shared/types instead, e.g.:')
    console.error(`   import type { ${CORE_TYPES.join(', ')} } from '../../src/shared/types'`)
    process.exit(2)
  }

  console.log('[check-shared-types] OK — no duplicate core types found.')
}

main()
