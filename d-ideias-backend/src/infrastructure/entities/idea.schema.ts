import { EntitySchema } from 'typeorm';
import { Idea } from '../../domain/entities';

export const IdeaSchema = new EntitySchema<Idea>({
  name: 'Idea',
  target: Idea,
  tableName: 'ideas',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    authorRegister: {
      type: 'smallint',
    },
    improvementSuggestion: {
      type: 'text',
    },
    currentProcess: {
      type: 'text',
    },
    howToImplement: {
      type: 'text',
    },
    expectedBenefits: {
      type: 'text',
    },
    createdAt: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
    },
    updatedAt: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP',
    },
  },
});
