#!/usr/bin/env tsx
/**
 * Build wrapper script - Run tsup
 */

import { spawn } from 'node:child_process'

// Passing through all output
const tsup = spawn('npx', ['tsup'], {
  stdio: 'inherit',
  shell: true,
})

tsup.on('close', code => {
  process.exit(code ?? 0)
})
