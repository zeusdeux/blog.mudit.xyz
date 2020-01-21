// @ts-nocheck
import prism from '@mapbox/rehype-prism'
import toc from '@zeusdeux/rehype-toc'
// import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis'
import link from 'rehype-autolink-headings'
import raw from 'rehype-raw'
import slug from 'rehype-slug'
import html from 'rehype-stringify'
import urls from 'rehype-urls'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import unified from 'unified'

export default function markdownToHtml(md) {
  return (
    unified()
      .use(markdown)
      .use(remark2rehype)
      .use(raw)
      .use(urls, function updateAnchorAndImgNode(url, node) {
        if (node.type === 'element' && node.tagName === 'a') {
          node.properties.target = '_blank'
          node.properties.rel = 'noopener noreferrer'
        }
        if (node.type === 'element' && node.tagName === 'img') {
          node.properties.loading = 'lazy'
        }
      })
      // .use(rehypeAccessibleEmojis)
      .use(slug)
      .use(toc, {
        headings: ['h2', 'h3'],
        position: 1,
        customizeTOC(node) {
          return {
            type: 'element',
            tagName: 'details',
            properties: {},
            children: [
              {
                type: 'element',
                tagName: 'summary',
                children: [{ type: 'text', value: 'Table of Contents' }]
              },
              node
            ]
          }
        }
      })
      .use(link, { behavior: 'wrap', properties: { className: 'permalink' } })
      .use(prism)
      .use(html)
      .process(md)
  )
}
