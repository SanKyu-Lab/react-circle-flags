#!/usr/bin/env tsx
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const FLAGS_SRC = join(process.cwd(), 'generated/flags')
const FLAGS_OUT = join(process.cwd(), 'dist/flags')

function extractComponentName(source: string, fileName: string) {
  const match = source.match(/export const (\w+)/)
  if (!match) {
    throw new Error(`Cannot find exported component in ${fileName}`)
  }
  return match[1]
}

function extractJsDoc(source: string) {
  const jsdocMatch = source.match(/\/\*\*[\s\S]*?\*\//)
  return jsdocMatch ? `${jsdocMatch[0]}\n` : ''
}

/**
 * Generate lightweight .d.ts files for flag components
 */
export async function generateFlagsDts() {
  await mkdir(FLAGS_OUT, { recursive: true })

  const files = await readdir(FLAGS_SRC)
  const tsxFiles = files.filter(f => f.endsWith('.tsx'))

  console.log(`📝 Generating ${tsxFiles.length} flag .d.ts files...`)

  let successCount = 0
  const errors: string[] = []

  for (const file of tsxFiles) {
    const sourcePath = join(FLAGS_SRC, file)
    const outPath = join(FLAGS_OUT, file.replace('.tsx', '.d.ts'))

    try {
      const source = await readFile(sourcePath, 'utf-8')
      const componentName = extractComponentName(source, file)
      const jsdoc = extractJsDoc(source)

      const dts = `import type { ReactElement } from 'react'\nimport type { FlagComponentProps } from '../index'\n\n${jsdoc}declare const ${componentName}: (props: FlagComponentProps) => ReactElement\n\nexport { ${componentName} }\n`

      await writeFile(outPath, dts, 'utf-8')
      successCount += 1
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      errors.push(`${file}: ${message}`)
    }
  }

  if (errors.length) {
    console.error(`❌ ${errors.length} errors while generating flag d.ts:\n${errors.join('\n')}`)
    throw new Error('Flag d.ts generation failed')
  }

  console.log(`✅ Generated ${successCount} flag .d.ts files`)
}

const isDirectRun = import.meta.url === pathToFileURL(process.argv[1]).href

if (isDirectRun) {
  generateFlagsDts().catch(error => {
    console.error(error)
    process.exit(1)
  })
}
