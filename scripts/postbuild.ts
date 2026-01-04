import { readdirSync, readFileSync, writeFileSync, unlinkSync, existsSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Post-processing script: Replace var with const in dist/flags
 *
 * This is because esbuild uses var in minify mode to optimize byte size,
 * but we prefer to use modern const/let syntax
 */
function postProcessFlags() {
  const flagsDir = join(process.cwd(), 'dist/flags')

  try {
    const files = readdirSync(flagsDir)
    let processedCount = 0

    for (const file of files) {
      if (!file.endsWith('.cjs') && !file.endsWith('.mjs')) {
        continue
      }

      const filePath = join(flagsDir, file)
      let content = readFileSync(filePath, 'utf-8')

      // Replace var with const
      const newContent = content.replace(/\bvar\s+/g, 'const ')

      if (content !== newContent) {
        writeFileSync(filePath, newContent, 'utf-8')
        processedCount++
      }
    }

    console.log(`✅ Post-process: Replaced 'var' with 'const' in ${processedCount} files`)
  } catch (error) {
    console.error('❌ Post-process failed:', error)
    process.exit(1)
  }
}

/**
 * Cleanup redundant type files
 * Remove all .d.ts files in dist/flags/ (types unified to dist/index.d.ts)
 */
function cleanupRedundantFiles() {
  const flagsDir = join(process.cwd(), 'dist/flags')

  try {
    const files = readdirSync(flagsDir)
    let removedCount = 0

    for (const file of files) {
      if (file.endsWith('.d.ts')) {
        const filePath = join(flagsDir, file)
        unlinkSync(filePath)
        removedCount++
      }
    }

    console.log(`✅ Removed ${removedCount} redundant .d.ts files in dist/flags/`)
  } catch (error) {
    console.error('⚠️  Failed to cleanup dist/flags/*.d.ts:', error)
  }

  // Remove redundant .d.cts file (same as .d.ts)
  const dctsPath = join(process.cwd(), 'dist/index.d.cts')
  if (existsSync(dctsPath)) {
    unlinkSync(dctsPath)
    console.log('✅ Removed redundant index.d.cts')
  }
}

function run() {
  postProcessFlags()
  cleanupRedundantFiles()
}

run()
