import { z } from 'zod';

export const clienteSchema = z.object({
  nome: z.string().min(2),
  email: z.string().email(),
  telefone: z.string().min(10)
});

export const idSchema = z.object({
  id: z.string().regex(/^\d+$/).transform(Number)
});

export type ClienteInput = z.infer<typeof clienteSchema>;
export type IdInput = z.infer<typeof idSchema>;
