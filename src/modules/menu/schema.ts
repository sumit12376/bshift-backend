import z from 'zod';

export const createMenuSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().nonnegative("Price must be positive"),
  description: z.string(),
  category: z.string(),
  restaurantId: z.number().int().positive("Invalid restaurant ID"),
  Image: z.array(z.string()).optional(), // optional if you pass in handler
});

export type CreateMenuInputType = z.infer<typeof createMenuSchema>;



export const GetMenuByRestaurant = z.object({
 restaurantId: z.string().min(1, 'restaurantId is required'),
});

export type GetMenuByRestaurantType = z.infer<typeof GetMenuByRestaurant>;


export const deleteMenu = z.object({
  menuId: z.string()
})

export type deleteMenuByType = z.infer<typeof deleteMenu>;

export const updateMenuSchema = z.object({
  menuId:z.string(),
  name: z.string(),
  price: z.number().int(),
  description: z.string(),
  category: z.string(),
  Image: z.array(z.string()).optional(),
  // restaurantId: z.preprocess((val) => String(val), z.string()),
})

export type updateMenuType = z.infer<typeof updateMenuSchema>