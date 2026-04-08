import { z } from 'zod';
import { createIdeaDtoSchema } from './create-idea.dto';

export const updateIdeaDtoSchema = createIdeaDtoSchema
  .pick({
    improvementSuggestion: true,
    currentProcess: true,
    howToImplement: true,
    expectedBenefits: true,
  })
  .partial()
  .refine(
    (value: Record<string, unknown>): boolean => Object.keys(value).length > 0,
    {
      message: 'At least one field must be provided',
    },
  );

export type UpdateIdeaDto = z.infer<typeof updateIdeaDtoSchema>;
