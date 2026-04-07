import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdeaSchema } from '../entities';
import { IdeaRepository } from './idea.repository';

@Module({
  imports: [TypeOrmModule.forFeature([IdeaSchema])],
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
