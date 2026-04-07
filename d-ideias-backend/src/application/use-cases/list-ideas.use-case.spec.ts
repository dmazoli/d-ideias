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
      findAllWithSort: jest.fn(),
      count: jest.fn(),
      update: jest.fn(),
      deleteById: jest.fn(),
      incrementUpvotes: jest.fn(),
      incrementDownvotes: jest.fn(),
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
    it('should return paginated ideas ordered by recent by default', async () => {
      const ideas: Idea[] = [
        {
          id: 1,
          authorRegister: 123,
          improvementSuggestion: 'Improve process',
          currentProcess: 'Manual steps',
          howToImplement: 'Automation',
          expectedBenefits: 'Faster delivery',
          upvotes: 10,
          downvotes: 1,
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
          upvotes: 3,
          downvotes: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      repositoryMock.findAllWithSort.mockResolvedValue(ideas);
      repositoryMock.count.mockResolvedValue(2);

      const result = await useCase.execute();

      expect(result).toEqual({
        data: ideas,
        meta: {
          count: 2,
          page: 1,
          pageSize: 10,
        },
      });
      expect(repositoryMock.findAllWithSort.mock.calls).toEqual([
        [1, 10, 'recent'],
      ]);
      expect(repositoryMock.count.mock.calls).toHaveLength(1);
    });

    it('should apply explicit sorting and pagination params', async () => {
      repositoryMock.findAllWithSort.mockResolvedValue([]);
      repositoryMock.count.mockResolvedValue(0);

      const result = await useCase.execute(2, 5, 'votes');

      expect(result).toEqual({
        data: [],
        meta: {
          count: 0,
          page: 2,
          pageSize: 5,
        },
      });
      expect(repositoryMock.findAllWithSort.mock.calls).toEqual([
        [2, 5, 'votes'],
      ]);
      expect(repositoryMock.count.mock.calls).toHaveLength(1);
    });
  });
});
