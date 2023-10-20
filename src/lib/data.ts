import { getCollection } from 'astro:content'

const blogs = await getCollection('blogs')
const _tags = blogs.map(blog => blog.data.tags).flat()

const map = new Map()

_tags.forEach(tag => {
  const lowercaseTag = tag.toLowerCase()
  if (!map.has(lowercaseTag) || tag === tag.toUpperCase()) map.set(lowercaseTag, tag)
})

export const tags = Array.from(map.values())