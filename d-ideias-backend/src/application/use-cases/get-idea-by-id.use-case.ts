import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { Idea } from '../../domain/entities';
import type { IIdeaRepository } from '../../domain/repositories';

@Injectable()
export class GetIdeaByIdUseCase {
  constructor(
    @Inject('IIdeaRepository')
    private readonly ideaRepository: IIdeaRepository,
  ) {}

  public async execute(id: number): Promise<Idea> {
    const idea: Idea | null = await this.ideaRepository.findById(id);

    if (!idea) {
      throw new NotFoundException('Idea not found');
    }

    return idea;
  }
}
