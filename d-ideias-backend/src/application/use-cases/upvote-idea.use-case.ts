import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { Idea } from '../../domain/entities';
import type { IIdeaRepository } from '../../domain/repositories';

@Injectable()
export class UpvoteIdeaUseCase {
  constructor(
    @Inject('IIdeaRepository')
    private readonly ideaRepository: IIdeaRepository,
  ) {}

  public async execute(id: number): Promise<Idea> {
    const idea = await this.ideaRepository.incrementUpvotes(id);

    if (!idea) {
      throw new NotFoundException(`Ideia com ID ${id} não encontrada.`);
    }

    return idea;
  }
}
