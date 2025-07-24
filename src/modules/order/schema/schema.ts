import z from 'zod';

export const orderItem = z.object({
  totalAmount: z.number().refine(val => !isNaN(val), {
    message: "Total amount must be a number",
  }),
  // status: z.enum(['pending', 'confirmed', 'preparing', 'delivered', 'cancelled']),
  // paymentMethod: z.enum(['cod', 'online', 'upi', 'card']),
  //  address: z.string().min(1, "Address is required"),
     menuId: z.number(),
});

export const orderSchema = z.object({
  userId: z.number(),

  // totalAmount: z.number().refine(val => !isNaN(val), {
  //   message: "Total amount must be a number",
  // }),
  status: z.enum(['pending', 'confirmed', 'preparing', 'delivered', 'cancelled']),
  paymentMethod: z.enum(['cod', 'online', 'upi', 'card']),
   address: z.string().min(1, "Address is required"),
  items: z.array(orderItem)
});

export type orderSchemaType = z.infer<typeof orderSchema >;


export const getOrderSchema = z.object({
  id: z.number(),
})

export type getorderschematype = z.infer<typeof getOrderSchema>;
