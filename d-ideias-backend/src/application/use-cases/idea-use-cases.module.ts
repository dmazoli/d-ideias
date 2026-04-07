import { Module } from '@nestjs/common';
import { RepositoriesModule } from '../../infrastructure/repositories';
import { CreateIdeaUseCase } from './create-idea.use-case';
import { DeleteIdeaUseCase } from './delete-idea.use-case';
import { GetIdeaByIdUseCase } from './get-idea-by-id.use-case';
import { ListIdeasUseCase } from './list-ideas.use-case';
import { UpdateIdeaUseCase } from './update-idea.use-case';

@Module({
  imports: [RepositoriesModule],
  providers: [
    CreateIdeaUseCase,
    ListIdeasUseCase,
    GetIdeaByIdUseCase,
    UpdateIdeaUseCase,
    DeleteIdeaUseCase,
  ],
  exports: [
    CreateIdeaUseCase,
    ListIdeasUseCase,
    GetIdeaByIdUseCase,
    UpdateIdeaUseCase,
    DeleteIdeaUseCase,
  ],
})
export class IdeaUseCasesModule {}
