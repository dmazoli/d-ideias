import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Idea } from '../../domain/entities';
import type { IdeaSortBy, IIdeaRepository } from '../../domain/repositories';
import { BaseRepository } from './base.repository';

@Injectable()
export class IdeaRepository
  extends BaseRepository<Idea, number>
  implements IIdeaRepository
{
  constructor(
    @InjectRepository(Idea)
    repository: Repository<Idea>,
  ) {
    super(repository);
  }

  public async findAllWithSort(
    page: number,
    pageSize: number,
    sortBy: IdeaSortBy,
  ): Promise<Idea[]> {
    const skip = (page - 1) * pageSize;

    const query = this.repository.createQueryBuilder('idea');

    switch (sortBy) {
      case 'id':
        query.orderBy('idea.id', 'DESC');
        break;
      case 'date':
        query.orderBy('idea.createdAt', 'DESC');
        break;
      case 'updated':
        query.orderBy('idea.updatedAt', 'DESC');
        break;
      case 'votes':
        query.orderBy('idea.upvotes', 'DESC');
        break;
      case 'dislike':
        query.orderBy('idea.downvotes', 'DESC');
        break;
      case 'recent':
      default:
        query.orderBy('idea.updatedAt', 'DESC');
        break;
    }

    return query.skip(skip).take(pageSize).getMany();
  }

  public async incrementUpvotes(id: number): Promise<Idea | null> {
    const result = await this.repository.increment({ id }, 'upvotes', 1);
    if ((result.affected ?? 0) === 0) {
      return null;
    }
    return this.findById(id);
  }

  public async incrementDownvotes(id: number): Promise<Idea | null> {
    const result = await this.repository.increment({ id }, 'downvotes', 1);
    if ((result.affected ?? 0) === 0) {
      return null;
    }
    return this.findById(id);
  }
}
