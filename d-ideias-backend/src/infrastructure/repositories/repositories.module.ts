import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Idea } from '../../domain/entities';
import { IdeaRepository } from './idea.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Idea])],
  providers: [
    IdeaRepository,
    {
      provide: 'IIdeaRepository',
      useExisting: IdeaRepository,
    },
  ],
  exports: ['IIdeaRepository'],
})
export class RepositoriesModule {}
