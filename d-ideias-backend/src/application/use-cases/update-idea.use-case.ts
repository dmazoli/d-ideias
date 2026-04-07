import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ZodError } from 'zod';
import type { Idea } from '../../domain/entities';
import type { IIdeaRepository } from '../../domain/repositories';
import { updateIdeaDtoSchema } from './update-idea.dto';
import type { UpdateIdeaDto } from './update-idea.dto';

@Injectable()
export class UpdateIdeaUseCase {
  constructor(
    @Inject('IIdeaRepository')
    private readonly ideaRepository: IIdeaRepository,
  ) {}

  public async execute(id: number, input: unknown): Promise<Idea> {
    const payload: UpdateIdeaDto = this.parseInput(input);

    const updatedIdea: Idea | null = await this.ideaRepository.update(id, {
      ...payload,
      updatedAt: new Date(),
    });

    if (!updatedIdea) {
      throw new NotFoundException('Idea not found');
    }

    return updatedIdea;
  }

  private parseInput(input: unknown): UpdateIdeaDto {
    try {
      return updateIdeaDtoSchema.parse(input);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        throw new BadRequestException(error.issues);
      }

      throw error;
    }
  }
}
