import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    PNPM_SCRIPT_SRC_DIR: z.string(),
  },
  client: {},
  runtimeEnv: {
    PNPM_SCRIPT_SRC_DIR: process.env['PNPM_SCRIPT_SRC_DIR'],
  },
})

export const externalLinks = Object.freeze({
  avatar: 'https://avatars.githubusercontent.com/u/31152321?v=4',
})
