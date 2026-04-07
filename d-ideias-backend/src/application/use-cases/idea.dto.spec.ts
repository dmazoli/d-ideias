import { createIdeaDtoSchema, type CreateIdeaDto } from './create-idea.dto';
import { updateIdeaDtoSchema, type UpdateIdeaDto } from './update-idea.dto';

describe('Idea DTOs validação com Zod', () => {
  describe('createIdeaDtoSchema', () => {
    it('should validate valid create payload', () => {
      const payload = {
        authorRegister: 123,
        improvementSuggestion: 'Improve process',
        currentProcess: 'Manual steps',
        howToImplement: 'Automation',
        expectedBenefits: 'Faster delivery',
      };

      const result = createIdeaDtoSchema.safeParse(payload);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.authorRegister).toBe(123);
      }
    });

    it('should reject zero authorRegister', () => {
      const payload = {
        authorRegister: 0,
        improvementSuggestion: 'Improve process',
        currentProcess: 'Manual steps',
        howToImplement: 'Automation',
        expectedBenefits: 'Faster delivery',
      };

      const result = createIdeaDtoSchema.safeParse(payload);

      expect(result.success).toBe(false);
    });

    it('should reject negative authorRegister', () => {
      const payload = {
        authorRegister: -1,
        improvementSuggestion: 'Improve process',
        currentProcess: 'Manual steps',
        howToImplement: 'Automation',
        expectedBenefits: 'Faster delivery',
      };

      const result = createIdeaDtoSchema.safeParse(payload);

      expect(result.success).toBe(false);
    });

    it('should reject authorRegister greater than 99999', () => {
      const payload = {
        authorRegister: 100000,
        improvementSuggestion: 'Improve process',
        currentProcess: 'Manual steps',
        howToImplement: 'Automation',
        expectedBenefits: 'Faster delivery',
      };

      const result = createIdeaDtoSchema.safeParse(payload);

      expect(result.success).toBe(false);
    });

    it('should trim and validate improvementSuggestion', () => {
      const payload = {
        authorRegister: 123,
        improvementSuggestion: '   Improve process   ',
        currentProcess: 'Manual steps',
        howToImplement: 'Automation',
        expectedBenefits: 'Faster delivery',
      };

      const result = createIdeaDtoSchema.safeParse(payload);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.improvementSuggestion).toBe('Improve process');
      }
    });

    it('should reject empty improvementSuggestion after trim', () => {
      const payload = {
        authorRegister: 123,
        improvementSuggestion: '   ',
        currentProcess: 'Manual steps',
        howToImplement: 'Automation',
        expectedBenefits: 'Faster delivery',
      };

      const result = createIdeaDtoSchema.safeParse(payload);

      expect(result.success).toBe(false);
    });

    it('should reject missing fields', () => {
      const payload = {
        authorRegister: 123,
        improvementSuggestion: 'Improve process',
      };

      const result = createIdeaDtoSchema.safeParse(payload);

      expect(result.success).toBe(false);
    });
  });

  describe('updateIdeaDtoSchema', () => {
    it('should validate partial update with single field', () => {
      const payload = {
        improvementSuggestion: 'Updated suggestion',
      };

      const result = updateIdeaDtoSchema.safeParse(payload);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.improvementSuggestion).toBe('Updated suggestion');
      }
    });

    it('should validate partial update with multiple fields', () => {
      const payload = {
        improvementSuggestion: 'Updated',
        currentProcess: 'New process',
      };

      const result = updateIdeaDtoSchema.safeParse(payload);

      expect(result.success).toBe(true);
    });

    it('should reject empty payload', () => {
      const payload = {};

      const result = updateIdeaDtoSchema.safeParse(payload);

      expect(result.success).toBe(false);
    });

    it('should trim whitespace in optional fields', () => {
      const payload = {
        improvementSuggestion: '   Updated   ',
      };

      const result = updateIdeaDtoSchema.safeParse(payload);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.improvementSuggestion).toBe('Updated');
      }
    });

    it('should reject invalid authorRegister in partial update', () => {
      const payload = {
        authorRegister: -1,
      };

      const result = updateIdeaDtoSchema.safeParse(payload);

      expect(result.success).toBe(false);
    });

    it('should accept zero fields removal behavior (strict fields)', () => {
      const payload = {
        improvementSuggestion: 'Valid',
      };

      const result = updateIdeaDtoSchema.safeParse(payload);

      expect(result.success).toBe(true);
    });
  });

  describe('Type inference', () => {
    it('should infer CreateIdeaDto type correctly', () => {
      const data: CreateIdeaDto = {
        authorRegister: 123,
        improvementSuggestion: 'Improve process',
        currentProcess: 'Manual steps',
        howToImplement: 'Automation',
        expectedBenefits: 'Faster delivery',
      };

      expect(data.authorRegister).toBe(123);
      expect(typeof data.improvementSuggestion).toBe('string');
    });

    it('should infer UpdateIdeaDto type as partial', () => {
      const data: UpdateIdeaDto = {
        improvementSuggestion: 'Updated',
      };

      expect(data.improvementSuggestion).toBe('Updated');
    });
  });
});
