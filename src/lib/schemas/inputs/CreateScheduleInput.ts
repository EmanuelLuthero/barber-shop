import { z } from 'zod';

export const CreateScheduleInput = z.object({
  id: z.string().uuid(),
  barberId: z.string().uuid(),
  userId: z.string().uuid(),
  menuId: z.string().uuid(),
  date: z.date(),
});
export type CreateScheduleInput = z.infer<typeof CreateScheduleInput>;
