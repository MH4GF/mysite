import { promises as fs } from 'fs'
import path from 'path'

import { processor } from '@project/markdown-renderer'

import { env } from '../../env'

export const getArticle = async (id: string, handleNotFound: () => void) => {
  const filePath = path.join(env.ARTICLES_PATH, `/${id}.md`)
  const file = await fs.readFile(filePath, 'utf8').catch(() => {
    handleNotFound()
    return ''
  })

  const { result } = await processor.process(file)
  return result
}
