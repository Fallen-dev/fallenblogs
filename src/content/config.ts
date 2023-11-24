import { defineCollection, reference, z } from 'astro:content'

export const collections = {
  blog: defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
      title: z.string({ required_error: 'Title is required' })
        .max(70, {
          message: 'For the best SEO, kepp the length of title within 70 chars.'
        })
        .trim(),

      description: z.string({ required_error: 'Description is required' })
        .max(170, {
          message: 'For the best SEO, kepp the length of description within 170 chars.'
        })
        .trim(),
      //@ts-ignore
      // image: image().default("$assets/placeholder.jpg"),
      image: z.object({
        src: image().optional(),
        credit: z.string().trim().optional(),
        link: z.string().trim().optional()
      }).optional(),

      date: z.date({ coerce: true }).optional(),

      category: z.string().toLowerCase().trim().optional(),

      nextPost: reference('blog').optional(),
    }),
  })
}