import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { GetIdeaByIdUseCase } from './get-idea-by-id.use-case';
import type { Idea } from '../../domain/entities';
import type { IIdeaRepository } from '../../domain/repositories';

describe('GetIdeaByIdUseCase', () => {
  let useCase: GetIdeaByIdUseCase;
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
        GetIdeaByIdUseCase,
        {
          provide: 'IIdeaRepository',
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<GetIdeaByIdUseCase>(GetIdeaByIdUseCase);
  });

  describe('execute', () => {
    it('should return an idea when id exists', async () => {
      const idea: Idea = {
        id: 1,
        authorRegister: 123,
        improvementSuggestion: 'Improve process',
        currentProcess: 'Manual steps',
        howToImplement: 'Automation',
        expectedBenefits: 'Faster delivery',
        upvotes: 0,
        downvotes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      repositoryMock.findById.mockResolvedValue(idea);

      const result = await useCase.execute(1);

      expect(result).toEqual(idea);
      expect(repositoryMock.findById).toHaveBeenCalledWith(1);
      expect(repositoryMock.findById).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when id does not exist', async () => {
      repositoryMock.findById.mockResolvedValue(null);

      await expect(useCase.execute(999)).rejects.toThrow(NotFoundException);
      expect(repositoryMock.findById).toHaveBeenCalledWith(999);
    });
  });
});
