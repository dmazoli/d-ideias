import { Test, TestingModule } from '@nestjs/testing';
import { ListIdeasUseCase } from './list-ideas.use-case';
import type { Idea } from '../../domain/entities';
import type { IIdeaRepository } from '../../domain/repositories';

describe('ListIdeasUseCase', () => {
  let useCase: ListIdeasUseCase;
  let repositoryMock: jest.Mocked<IIdeaRepository>;

  beforeEach(async () => {
    repositoryMock = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      deleteById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListIdeasUseCase,
        {
          provide: 'IIdeaRepository',
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<ListIdeasUseCase>(ListIdeasUseCase);
  });

  describe('execute', () => {
    it('should return all ideas', async () => {
      const ideas: Idea[] = [
        {
          id: 1,
          authorRegister: 123,
          improvementSuggestion: 'Improve process',
          currentProcess: 'Manual steps',
          howToImplement: 'Automation',
          expectedBenefits: 'Faster delivery',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          authorRegister: 456,
          improvementSuggestion: 'Another idea',
          currentProcess: 'Current flow',
          howToImplement: 'New flow',
          expectedBenefits: 'Better UX',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      repositoryMock.findAll.mockResolvedValue(ideas);

      const result = await useCase.execute();

      expect(result).toEqual(ideas);
      expect(result).toHaveLength(2);
      expect(repositoryMock.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no ideas exist', async () => {
      repositoryMock.findAll.mockResolvedValue([]);

      const result = await useCase.execute();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
      expect(repositoryMock.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
