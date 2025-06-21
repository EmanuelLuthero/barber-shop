import { z } from 'zod';

import { BarberResponse } from './BarberResponse';

const Schedule = z.object({
  barberId: z.string(),
  date: z.string(),
});

export const ScheduleResponse = z.object({
  barber: BarberResponse,
  schedule: Schedule,
});
export type ScheduleResponse = z.infer<typeof ScheduleResponse>;

export const SchedulesResponse = z.array(ScheduleResponse);
export type SchedulesResponse = z.infer<typeof SchedulesResponse>;
