import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UpvoteIdeaUseCase } from './upvote-idea.use-case';
import type { Idea } from '../../domain/entities';
import type { IIdeaRepository } from '../../domain/repositories';

describe('UpvoteIdeaUseCase', () => {
  let useCase: UpvoteIdeaUseCase;
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
        UpvoteIdeaUseCase,
        {
          provide: 'IIdeaRepository',
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<UpvoteIdeaUseCase>(UpvoteIdeaUseCase);
  });

  it('should increment upvotes and return updated idea', async () => {
    const updatedIdea: Idea = {
      id: 1,
      authorRegister: 123,
      improvementSuggestion: 'Improve onboarding',
      currentProcess: 'Manual onboarding steps',
      howToImplement: 'Automate with forms',
      expectedBenefits: 'Faster setup',
      upvotes: 5,
      downvotes: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    repositoryMock.incrementUpvotes.mockResolvedValue(updatedIdea);

    const result = await useCase.execute(1);

    expect(result).toEqual(updatedIdea);
    expect(repositoryMock.incrementUpvotes).toHaveBeenCalledTimes(1);
    expect(repositoryMock.incrementUpvotes).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException when idea does not exist', async () => {
    repositoryMock.incrementUpvotes.mockResolvedValue(null);

    await expect(useCase.execute(999)).rejects.toThrow(NotFoundException);
    expect(repositoryMock.incrementUpvotes).toHaveBeenCalledTimes(1);
    expect(repositoryMock.incrementUpvotes).toHaveBeenCalledWith(999);
  });
});
