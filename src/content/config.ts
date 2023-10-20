import { z, defineCollection, reference } from 'astro:content';

const blogs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().max(80, { message: 'For best SEO, keep title length around 80 characters' }),
    tags: z.array(z.string()),
    image: z.string().optional(),
    publishedOn: z.coerce.date(),
    followUp: reference('blogs').optional()
  })
})

export const collections = {
  blogs
}