/**
 * Fix isolatedDeclarations type issues in generated flag components
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const flagsDir = join(process.cwd(), 'generated/flags')
const files = readdirSync(flagsDir).filter(f => f.endsWith('.tsx'))

function fixFile(filePath: string) {
  let content = readFileSync(filePath, 'utf-8')

  // Fix arrow function return type:
  // find "}) => (" and replace with "}): React.ReactElement => ("
  // But only replace the first occurrence (function signature position)
  const arrowIndex = content.indexOf('}) => (')
  if (arrowIndex !== -1) {
    content =
      content.slice(0, arrowIndex) + '}): React.ReactElement => (' + content.slice(arrowIndex + 7)
  }

  // Fix displayName - use defineProperty
  content = content.replace(
    /(Flag\w+)\.displayName = '(Flag\w+)'/g,
    `Object.defineProperty($1, 'displayName', { value: '$2' })`
  )

  // Ensure React import
  if (!content.includes('import React')) {
    content = content.replace(
      "import type { SVGProps } from 'react'",
      "import React from 'react'\nimport type { SVGProps } from 'react'"
    )
  }

  writeFileSync(filePath, content, 'utf-8')
  console.log(`Fixed: ${filePath}`)
}

let fixed = 0
for (const file of files) {
  const filePath = join(flagsDir, file)
  fixFile(filePath)
  fixed++
}

console.log(`\nFixed ${fixed} files`)
