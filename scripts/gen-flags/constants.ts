import { Config as SvgoConfig } from 'svgo'

export const CIRCLE_FLAGS_REPO = 'https://github.com/HatScripts/circle-flags.git'
export const FLAGS_DIR = 'circle-flags/flags'
export const OUTPUT_DIR = 'generated/flags'

export const SVGO_CONFIG: SvgoConfig = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
        },
      },
      fn: () => {},
    },
  ],
}
