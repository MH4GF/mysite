import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    ARTICLES_PATH: z.string(),
  },
  client: {},
  runtimeEnv: {
    ARTICLES_PATH: process.env['ARTICLES_PATH'],
  },
})
