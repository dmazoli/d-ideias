import type { Idea } from '../entities';
import type { IBaseRepository } from './base.repository.interface';

export type IIdeaRepository = IBaseRepository<Idea, number>;
