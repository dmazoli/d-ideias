import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { DeleteIdeaUseCase } from './delete-idea.use-case';
import type { IIdeaRepository } from '../../domain/repositories';

describe('DeleteIdeaUseCase', () => {
  let useCase: DeleteIdeaUseCase;
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
        DeleteIdeaUseCase,
        {
          provide: 'IIdeaRepository',
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<DeleteIdeaUseCase>(DeleteIdeaUseCase);
  });

  describe('execute', () => {
    it('should delete an idea when id exists', async () => {
      repositoryMock.deleteById.mockResolvedValue(true);

      await useCase.execute(1);

      expect(repositoryMock.deleteById).toHaveBeenCalledWith(1);
      expect(repositoryMock.deleteById).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when id does not exist', async () => {
      repositoryMock.deleteById.mockResolvedValue(false);

      await expect(useCase.execute(999)).rejects.toThrow(NotFoundException);
      expect(repositoryMock.deleteById).toHaveBeenCalledWith(999);
    });
  });
});
