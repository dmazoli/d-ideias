import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UpdateIdeaUseCase } from './update-idea.use-case';
import type { Idea } from '../../domain/entities';
import type { IIdeaRepository } from '../../domain/repositories';

describe('UpdateIdeaUseCase', () => {
  let useCase: UpdateIdeaUseCase;
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
        UpdateIdeaUseCase,
        {
          provide: 'IIdeaRepository',
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<UpdateIdeaUseCase>(UpdateIdeaUseCase);
  });

  describe('execute', () => {
    it('should update an idea with partial fields', async () => {
      const input = {
        improvementSuggestion: 'Updated suggestion',
      };

      const updatedIdea: Idea = {
        id: 1,
        authorRegister: 123,
        improvementSuggestion: 'Updated suggestion',
        currentProcess: 'Manual steps',
        howToImplement: 'Automation',
        expectedBenefits: 'Faster delivery',
        upvotes: 2,
        downvotes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      repositoryMock.update.mockResolvedValue(updatedIdea);

      const result = await useCase.execute(1, input);

      expect(result).toEqual(updatedIdea);
      expect(repositoryMock.update).toHaveBeenCalledTimes(1);
      expect(repositoryMock.update).toHaveBeenCalledWith(
        1,
        expect.objectContaining({
          improvementSuggestion: 'Updated suggestion',
        }),
      );
    });

    it('should throw BadRequestException for empty payload', async () => {
      await expect(useCase.execute(1, {})).rejects.toThrow(BadRequestException);
      expect(repositoryMock.update).not.toHaveBeenCalled();
    });

    it('should throw NotFoundException when idea does not exist', async () => {
      const input = {
        improvementSuggestion: 'Updated suggestion',
      };

      repositoryMock.update.mockResolvedValue(null);

      await expect(useCase.execute(999, input)).rejects.toThrow(
        NotFoundException,
      );
      expect(repositoryMock.update).toHaveBeenCalledTimes(1);
    });

    it('should throw BadRequestException for invalid field', async () => {
      const input = {
        authorRegister: -1,
      };

      await expect(useCase.execute(1, input)).rejects.toThrow(
        BadRequestException,
      );
      expect(repositoryMock.update).not.toHaveBeenCalled();
    });

    it('should allow updating multiple fields', async () => {
      const input = {
        improvementSuggestion: 'Updated',
        currentProcess: 'New process',
      };

      const updatedIdea: Idea = {
        id: 1,
        authorRegister: 123,
        improvementSuggestion: 'Updated',
        currentProcess: 'New process',
        howToImplement: 'Automation',
        expectedBenefits: 'Faster delivery',
        upvotes: 2,
        downvotes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      repositoryMock.update.mockResolvedValue(updatedIdea);

      const result = await useCase.execute(1, input);

      expect(result).toEqual(updatedIdea);
      expect(repositoryMock.update).toHaveBeenCalledWith(
        1,
        expect.objectContaining({
          improvementSuggestion: 'Updated',
          currentProcess: 'New process',
        }),
      );
    });
  });
});
