import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IIdeaRepository } from '../../domain/repositories';

@Injectable()
export class DeleteIdeaUseCase {
  constructor(
    @Inject('IIdeaRepository')
    private readonly ideaRepository: IIdeaRepository,
  ) {}

  public async execute(id: number): Promise<void> {
    const deleted: boolean = await this.ideaRepository.deleteById(id);

    if (!deleted) {
      throw new NotFoundException('Idea not found');
    }
  }
}
