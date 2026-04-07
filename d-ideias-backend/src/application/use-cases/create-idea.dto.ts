import { z } from 'zod';

export const createIdeaDtoSchema = z.object({
  authorRegister: z.number().int().positive(),
  improvementSuggestion: z.string().trim().min(1),
  currentProcess: z.string().trim().min(1),
  howToImplement: z.string().trim().min(1),
  expectedBenefits: z.string().trim().min(1),
});

export type CreateIdeaDto = z.infer<typeof createIdeaDtoSchema>;
