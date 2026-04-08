import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { DownvoteIdeaUseCase } from './downvote-idea.use-case';
import type { Idea } from '../../domain/entities';
import type { IIdeaRepository } from '../../domain/repositories';

describe('DownvoteIdeaUseCase', () => {
  let useCase: DownvoteIdeaUseCase;
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
        DownvoteIdeaUseCase,
        {
          provide: 'IIdeaRepository',
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<DownvoteIdeaUseCase>(DownvoteIdeaUseCase);
  });

  it('should increment downvotes and return updated idea', async () => {
    const updatedIdea: Idea = {
      id: 1,
      authorRegister: 123,
      improvementSuggestion: 'Improve onboarding',
      currentProcess: 'Manual onboarding steps',
      howToImplement: 'Automate with forms',
      expectedBenefits: 'Faster setup',
      upvotes: 2,
      downvotes: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    repositoryMock.incrementDownvotes.mockResolvedValue(updatedIdea);

    const result = await useCase.execute(1);

    expect(result).toEqual(updatedIdea);
    expect(repositoryMock.incrementDownvotes).toHaveBeenCalledTimes(1);
    expect(repositoryMock.incrementDownvotes).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException when idea does not exist', async () => {
    repositoryMock.incrementDownvotes.mockResolvedValue(null);

    await expect(useCase.execute(999)).rejects.toThrow(NotFoundException);
    expect(repositoryMock.incrementDownvotes).toHaveBeenCalledTimes(1);
    expect(repositoryMock.incrementDownvotes).toHaveBeenCalledWith(999);
  });
});
