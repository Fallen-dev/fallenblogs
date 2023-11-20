import { getCollection } from 'astro:content'

const _blogs = await getCollection('blog', (post) =>
  process.env.NODE_ENV == 'production' ? post.data.date : post)

//@ts-expect-error
export const blogs = _blogs.sort((a, b) => {
  if (!a.data.date || !b.data.date) return

  return b.data.date.valueOf() - a.data.date.valueOf()
})