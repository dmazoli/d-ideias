import { Module } from '@nestjs/common';
import { IdeaUseCasesModule } from '../../application/use-cases';
import { IdeasController } from './ideas.controller';

@Module({
  imports: [IdeaUseCasesModule],
  controllers: [IdeasController],
})
export class IdeasApiModule {}
