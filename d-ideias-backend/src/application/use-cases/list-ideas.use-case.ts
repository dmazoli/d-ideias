import { Inject, Injectable } from '@nestjs/common';
import type { Idea } from '../../domain/entities';
import type { IIdeaRepository } from '../../domain/repositories';

@Injectable()
export class ListIdeasUseCase {
  constructor(
    @Inject('IIdeaRepository')
    private readonly ideaRepository: IIdeaRepository,
  ) {}

  public async execute(): Promise<Idea[]> {
    return this.ideaRepository.findAll();
  }
}
