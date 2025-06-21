import { z } from 'zod';

export const CreateUserInput = z.object({
  id: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});
export type CreateUserInput = z.infer<typeof CreateUserInput>;
