import z from 'zod'
export const createEmployeeSchema=z.object({
name:z.string(),
email:z.string(),
password:z.string(),
 profile: z.string().url().optional(),
})
export type CreateInput = z.infer<typeof createEmployeeSchema>;

export const EmployeeFilterInput = z.object({
  searchQuery: z.string().optional(),
});
export const deleteEmployeeSchema=z.object({
  id: z.number()
})
export type deleteInput=z.infer<typeof deleteEmployeeSchema>
export const Metadata = z.object({
  page: z.number().default(1),
  size: z.number().default(10),
  sortBy: z.string().default('createdAt'),
  sortOrder: z.enum(['ASC', 'DESC']).default('DESC'),
});


export const getEmployeeListInput = z.object({
  filter: EmployeeFilterInput,
  metadata: Metadata,
});
export const updateInput=z.object({
name:z.string().optional(),
email:z.string().optional(),
password:z.string().optional(),
id: z.number()
})
export type updateInputType =z.infer<typeof updateInput>

export type GetEmployeeListInputType = z.infer<typeof getEmployeeListInput>;

