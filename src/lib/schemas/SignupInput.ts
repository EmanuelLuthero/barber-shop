import { z } from 'zod';

const Password = z
  .string()
  .min(8, 'A senha deve ter pelo menos 8 caracteres')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caracter especial'
  );

export const SignupInput = z
  .object({
    name: z.string().min(1, 'Informe seu nome completo'),
    email: z.string().email('Informe um e-mail válido'),
    password: Password,
    confirmPassword: Password,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
  });
export type SignupInput = z.infer<typeof SignupInput>;
