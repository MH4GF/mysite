import { createElement } from 'react'
import rehypeParse from 'rehype-parse'
import rehypeReact from 'rehype-react'
import { unified } from 'unified'

export const processor = unified().use(rehypeParse, { fragment: true }).use(rehypeReact, {
  createElement,
})
