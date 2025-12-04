import { z } from 'zod';

export const servicoSchema = z.object({
  tipo: z.string().min(2),
  preco: z.number().positive(),
  clienteId: z.number().positive(),
  petId: z.number().positive().optional()
});

export const idSchema = z.object({
  id: z.string().regex(/^\d+$/).transform(Number)
});

export type ServicoInput = z.infer<typeof servicoSchema>;
export type IdInput = z.infer<typeof idSchema>;
