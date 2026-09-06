import { defineConfig } from 'tsup'
import { outExtensionMjsCjs } from '../../scripts/tsup/shared.mjs'

export default defineConfig({
  entry: ['src/index.ts', 'src/generated/svgs/*.ts'],
  format: ['cjs', 'esm'],
  // Per-flag subpath entries must inline their SVG: shared chunks would make
  // `@sankyu/circle-flags-core/svg/<code>` pull in every flag at once.
  splitting: false,
  dts: true,
  minify: true,
  sourcemap: false,
  clean: true,
  treeshake: true,
  outExtension: outExtensionMjsCjs,
})
