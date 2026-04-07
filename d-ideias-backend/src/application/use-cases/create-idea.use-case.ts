import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ZodError } from 'zod';
import type { Idea } from '../../domain/entities';
import type { IIdeaRepository } from '../../domain/repositories';
import { createIdeaDtoSchema } from './create-idea.dto';
import type { CreateIdeaDto } from './create-idea.dto';

@Injectable()
export class CreateIdeaUseCase {
  constructor(
    @Inject('IIdeaRepository')
    private readonly ideaRepository: IIdeaRepository,
  ) {}

  public async execute(input: unknown): Promise<Idea> {
    const payload: CreateIdeaDto = this.parseInput(input);
    const now: Date = new Date();

    const idea: Idea = {
      ...payload,
      upvotes: 0,
      downvotes: 0,
      createdAt: now,
      updatedAt: now,
    };

    return this.ideaRepository.save(idea);
  }

  private parseInput(input: unknown): CreateIdeaDto {
    try {
      return createIdeaDtoSchema.parse(input);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        throw new BadRequestException(error.issues);
      }

      throw error;
    }
  }
}
