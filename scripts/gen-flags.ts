#!/usr/bin/env node
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { generateFlags } from './gen-flags/generate'

const entryPoint = process.argv[1] ? pathToFileURL(resolve(process.argv[1])).href : ''
if (import.meta.url === entryPoint) {
  generateFlags().catch(console.error)
}

export { generateFlags }
