import z from 'zod';

export const LoginInputSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});

export type LoginInput = z.infer<typeof LoginInputSchema>;

export const checkUser = z.object({
  identifier: z.string(),
});

export type CheckUserInput = z.infer<typeof checkUser>;