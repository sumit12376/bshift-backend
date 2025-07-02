import z from 'zod';

export const RestaurantFilterInput = z.object({
  searchQuery: z.string().optional(),
});

export const Metadata = z.object({
  page: z.number().default(1),
  size: z.number().default(10),
  sortBy: z.string().default('createdAt'),
  sortOrder: z.enum(['ASC', 'DESC']).default('DESC'),
});


export const getRestaurantListInput = z.object({
  filter: RestaurantFilterInput,
  metadata: Metadata,
});

export type GetRestaurantListInputType = z.infer<typeof getRestaurantListInput>;

export const createRestaurantInput = z.object({
  restaurantName: z.string(),
  description: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('Invalid email').transform(val => val.toLowerCase()),
  openingHours: z.string(),
  rating: z.number().min(0).max(5).optional(),
  isActive: z.boolean().default(true),
});

export type CreateRestaurantInputType = z.infer<typeof createRestaurantInput>;

export const updateRestaurantInput = createRestaurantInput.partial();

export type UpdateRestaurantInputType = z.infer<typeof updateRestaurantInput>;

export interface RestaurantNode {
  id: number;
  restaurantName: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  phone?: string;
  email: string;
  openingHours: string;
  rating?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
