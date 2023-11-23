import type { MarkdownHeading } from 'astro'
import { getCollection } from 'astro:content'

const _blogs = await getCollection('blog', (post) =>
  process.env.NODE_ENV == 'production' ? post.data.date : post)

// @ts-expect-error
export const blogs = _blogs.sort((a, b) => {
  if (!a.data.date || !b.data.date) return

  return b.data.date.valueOf() - a.data.date.valueOf()
})

export function createTOC(headings: MarkdownHeading[]) {
  const toc = [] as any[]

  headings.forEach(item => {
    switch (item.depth) {
      default: toc.push(item); break
      case 3: toc.push([item]); break
      case 4: toc.push([[item]]); break
      case 5: toc.push([[[item]]]); break
      case 6: toc.push([[[[item]]]]); break
    }
  })
  return toc
}