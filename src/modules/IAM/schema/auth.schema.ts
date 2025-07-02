import z from 'zod';

export const LoginInputSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});

export type LoginInput = z.infer<typeof LoginInputSchema>;
