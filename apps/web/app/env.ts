import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    ARTICLES_PATH: z.string(),
    PNPM_SCRIPT_SRC_DIR: z.string(),
  },
  client: {},
  runtimeEnv: {
    ARTICLES_PATH: process.env['ARTICLES_PATH'],
    PNPM_SCRIPT_SRC_DIR: process.env['PNPM_SCRIPT_SRC_DIR'],
  },
})
