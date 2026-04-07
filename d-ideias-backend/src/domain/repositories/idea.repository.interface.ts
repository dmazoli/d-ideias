import type { Idea } from '../entities';
import type { IBaseRepository } from './base.repository.interface';

export type IdeaSortBy =
  | 'recent'
  | 'id'
  | 'date'
  | 'updated'
  | 'votes'
  | 'dislike';

export interface IIdeaRepository extends IBaseRepository<Idea, number> {
  findAllWithSort(
    page: number,
    pageSize: number,
    sortBy: IdeaSortBy,
  ): Promise<Idea[]>;
  incrementUpvotes(id: number): Promise<Idea | null>;
  incrementDownvotes(id: number): Promise<Idea | null>;
}
