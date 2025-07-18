import { z } from "zod";

export const cartItemSchema = z.object({
  menuItemId: z.number(),
  quantity: z.number().min(1),
  price: z.number().nonnegative()
});

export const createCartSchema = z.object({
  userId: z.number(),
  items: z.array(cartItemSchema).min(1)
});

export type CreateCartInput = z.infer<typeof createCartSchema>;



export const cartschema=z.object({
id: z.number()
})
export type cartListInputType = z.infer<typeof cartschema>;
