import { createElement } from 'react'
import rehypeReact from 'rehype-react'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

import remarkGfm from 'remark-gfm'
import { Paragraph } from './elements'

export const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeReact, {
    createElement,
    components: {
      p: Paragraph,
    },
  })
