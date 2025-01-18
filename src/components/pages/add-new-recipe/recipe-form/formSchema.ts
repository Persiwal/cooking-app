import * as z from 'zod';

export const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().optional(),
  cuisine: z.string().optional(),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
  prepareTime: z
    .number()
    .min(1, { message: 'Prepare time must be at least 1 second' }),
  numberOfPortions: z
    .number()
    .min(1, { message: 'Number of portions must be at least 1' }),
  ingredients: z.array(
    z.object({
      name: z.string().min(1, { message: 'Ingredient name is required' }),
      quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
      unit: z.string(),
    })
  ),
  steps: z.array(
    z.object({
      order: z.number().min(1, { message: 'Order must be at least 1' }),
      content: z.string().min(1, { message: 'Content is required' }),
    })
  ),
});
