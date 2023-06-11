import { createElement } from 'react'
import rehypeReact from 'rehype-react'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

export const processor = unified().use(remarkParse).use(remarkRehype).use(rehypeReact, {
  createElement,
})
