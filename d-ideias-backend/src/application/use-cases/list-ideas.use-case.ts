import { Inject, Injectable } from '@nestjs/common';
import type { Idea } from '../../domain/entities';
import type { IdeaSortBy, IIdeaRepository } from '../../domain/repositories';

@Injectable()
export class ListIdeasUseCase {
  constructor(
    @Inject('IIdeaRepository')
    private readonly ideaRepository: IIdeaRepository,
  ) {}

  public async execute(
    page: number = 1,
    pageSize: number = 10,
    sortBy: IdeaSortBy = 'recent',
  ): Promise<PaginatedResponse<Idea>> {
    page = Math.max(page, 1);
    pageSize = Math.max(pageSize, 1);

    const promises = [
      this.ideaRepository.findAllWithSort(page, pageSize, sortBy),
      this.ideaRepository.count(),
    ];
    const [data, count] = await Promise.all(promises);

    return {
      data,
      meta: {
        count,
        page,
        pageSize,
      },
    } as PaginatedResponse<Idea>;
  }
}
