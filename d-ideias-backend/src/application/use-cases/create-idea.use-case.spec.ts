import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { CreateIdeaUseCase } from './create-idea.use-case';
import type { Idea } from '../../domain/entities';
import type { IIdeaRepository } from '../../domain/repositories';

describe('CreateIdeaUseCase', () => {
  let useCase: CreateIdeaUseCase;
  let repositoryMock: jest.Mocked<IIdeaRepository>;

  beforeEach(async () => {
    repositoryMock = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      findAllWithSort: jest.fn(),
      count: jest.fn(),
      update: jest.fn(),
      deleteById: jest.fn(),
      incrementUpvotes: jest.fn(),
      incrementDownvotes: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateIdeaUseCase,
        {
          provide: 'IIdeaRepository',
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<CreateIdeaUseCase>(CreateIdeaUseCase);
  });

  describe('execute', () => {
    it('should create an idea with valid input', async () => {
      const input = {
        authorRegister: 123,
        improvementSuggestion: 'Improve process',
        currentProcess: 'Manual steps',
        howToImplement: 'Automation',
        expectedBenefits: 'Faster delivery',
      };

      const savedIdea: Idea = {
        id: 1,
        ...input,
        upvotes: 0,
        downvotes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      repositoryMock.save.mockResolvedValue(savedIdea);

      const result = await useCase.execute(input);

      expect(result).toEqual(savedIdea);
      expect(repositoryMock.save).toHaveBeenCalledTimes(1);
      expect(repositoryMock.save).toHaveBeenCalledWith(
        expect.objectContaining({
          authorRegister: 123,
          improvementSuggestion: 'Improve process',
        }),
      );
    });

    it('should throw BadRequestException for missing authorRegister', async () => {
      const input = {
        improvementSuggestion: 'Improve process',
        currentProcess: 'Manual steps',
        howToImplement: 'Automation',
        expectedBenefits: 'Faster delivery',
      };

      await expect(useCase.execute(input)).rejects.toThrow(BadRequestException);
      expect(repositoryMock.save).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException for non-positive authorRegister', async () => {
      const input = {
        authorRegister: -1,
        improvementSuggestion: 'Improve process',
        currentProcess: 'Manual steps',
        howToImplement: 'Automation',
        expectedBenefits: 'Faster delivery',
      };

      await expect(useCase.execute(input)).rejects.toThrow(BadRequestException);
      expect(repositoryMock.save).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException for empty improvement suggestion', async () => {
      const input = {
        authorRegister: 123,
        improvementSuggestion: '',
        currentProcess: 'Manual steps',
        howToImplement: 'Automation',
        expectedBenefits: 'Faster delivery',
      };

      await expect(useCase.execute(input)).rejects.toThrow(BadRequestException);
      expect(repositoryMock.save).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException for whitespace-only fields', async () => {
      const input = {
        authorRegister: 123,
        improvementSuggestion: '   ',
        currentProcess: 'Manual steps',
        howToImplement: 'Automation',
        expectedBenefits: 'Faster delivery',
      };

      await expect(useCase.execute(input)).rejects.toThrow(BadRequestException);
      expect(repositoryMock.save).not.toHaveBeenCalled();
    });
  });
});
