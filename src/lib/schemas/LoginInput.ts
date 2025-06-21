import { z } from 'zod';

export const LoginInput = z.object({
  email: z.string().email('O email deve ter um formato válido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});
export type LoginInput = z.infer<typeof LoginInput>;
