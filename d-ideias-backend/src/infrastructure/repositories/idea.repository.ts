import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Idea } from '../../domain/entities';
import type { IIdeaRepository } from '../../domain/repositories';
import { IdeaSchema } from '../entities';
import { BaseRepository } from './base.repository';

@Injectable()
export class IdeaRepository
  extends BaseRepository<Idea, number>
  implements IIdeaRepository
{
  constructor(
    @InjectRepository(IdeaSchema)
    repository: Repository<Idea>,
  ) {
    super(repository);
  }
}
