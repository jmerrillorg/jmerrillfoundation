import { cp, mkdir, rm, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const standalone = join(root, '.next', 'standalone')
const dist = join(root, 'dist')
const staging = join(dist, 'appservice')
const zipPath = join(dist, 'jmerrill-foundation-appservice.zip')

async function ensureBuilt() {
  try {
    await stat(join(standalone, 'server.js'))
  } catch {
    throw new Error('Standalone build not found. Run pnpm build before packaging.')
  }
}

async function copyIfExists(from, to) {
  if (existsSync(from)) {
    await mkdir(dirname(to), { recursive: true })
    await cp(from, to, { recursive: true, dereference: true })
  }
}

await ensureBuilt()
await rm(staging, { recursive: true, force: true })
await mkdir(staging, { recursive: true })
await cp(standalone, staging, { recursive: true, dereference: true })
await copyIfExists(join(root, '.next', 'static'), join(staging, '.next', 'static'))
await copyIfExists(join(root, 'public'), join(staging, 'public'))
await copyIfExists(join(root, 'node_modules', '.pnpm', 'node_modules'), join(staging, 'node_modules'))
await rm(zipPath, { force: true })

const result = spawnSync('zip', ['-qr', zipPath, '.'], { cwd: staging, stdio: 'inherit' })
if (result.status !== 0) {
  throw new Error(`zip failed with exit code ${result.status}`)
}

console.log(zipPath)
