import { z } from 'zod';

export const petSchema = z.object({
  nome: z.string().min(2),
  especie: z.string().min(2),
  clienteId: z.number().positive()
});

export const idSchema = z.object({
  id: z.string().regex(/^\d+$/).transform(Number)
});

export type PetInput = z.infer<typeof petSchema>;
export type IdInput = z.infer<typeof idSchema>;
