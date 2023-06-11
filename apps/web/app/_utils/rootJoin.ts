import path from 'path'

import { env } from './constants'

export const rootJoin = (...args: string[]) => path.join(env.PNPM_SCRIPT_SRC_DIR, ...args)
