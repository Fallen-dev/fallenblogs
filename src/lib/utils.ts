import type { MarkdownHeading } from 'astro'
import type {CollectionEntry} from 'astro:content'
import { getCollection } from 'astro:content'

export async function getBlogs(fn?: (p: CollectionEntry<'blog'>) => boolean | CollectionEntry<'blog'>) {
  const data = await getCollection('blog', fn)
  
  const blogs = data.map(
    post =>
      process.env.NODE_ENV == 'production' ? post.data.date : post
  ) as CollectionEntry<'blog'>[]

  //@ts-ignore
  return blogs.sort((a, b) => {
    if (!a.data.date || !b.data.date) return
    return b.data.date.valueOf() - a.data.date.valueOf()
  })
}

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