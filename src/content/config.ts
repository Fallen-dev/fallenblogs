import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH } from '$config';
import { z, defineCollection, reference } from 'astro:content';

const message = (str: string, length: number) => `For the best SEO, keep ${str} length around ${length} characters`

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string().max(MAX_TITLE_LENGTH, { message: message('title', MAX_TITLE_LENGTH) }),
    description: z.string().max(MAX_DESCRIPTION_LENGTH, { message: message('description', MAX_DESCRIPTION_LENGTH) }),
    tags: z.array(z.string()),
    //@ts-ignore
    image: image().default('$assets/placeholder.jpg'),
    publishedOn: z.coerce.date().optional(), // PublishedOn: YYYY-MM-DD
    //* If not found then post is not published
    followUp: reference('blog').optional()
  })
})

export const collections = {
  blog
}