import type { MarkdownHeading } from 'astro'
import type {CollectionEntry} from 'astro:content'
import { getCollection } from 'astro:content'

export async function getBlogs(fn?: (p: CollectionEntry<'blog'>) => boolean | CollectionEntry<'blog'>) {
  const data = await getCollection('blog', function (post) {
    return process.env.NODE_ENV?.toLowerCase() == 'production'
    ? fn || post.data.date != undefined
    : fn || post
  })

  return data.sort((fst, snd) => {
    if (!fst.data.date || !snd.data.date) return 0

    return snd.data.date.valueOf() - fst.data.date.valueOf()
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