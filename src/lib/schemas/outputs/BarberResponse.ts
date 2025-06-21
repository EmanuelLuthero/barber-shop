import { z } from 'zod';

export const BarberResponse = z.object({
  id: z.string(),
  name: z.string(),
});
export type BarberResponse = z.infer<typeof BarberResponse>;

export const BarbersResponse = z.array(BarberResponse);
export type BarbersResponse = z.infer<typeof BarbersResponse>;
