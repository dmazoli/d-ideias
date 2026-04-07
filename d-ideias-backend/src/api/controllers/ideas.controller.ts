import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import type { Idea } from '../../domain/entities';
import {
  CreateIdeaUseCase,
  DeleteIdeaUseCase,
  GetIdeaByIdUseCase,
  ListIdeasUseCase,
  UpdateIdeaUseCase,
} from '../../application/use-cases';

@Controller('ideas')
export class IdeasController {
  constructor(
    private readonly createIdeaUseCase: CreateIdeaUseCase,
    private readonly listIdeasUseCase: ListIdeasUseCase,
    private readonly getIdeaByIdUseCase: GetIdeaByIdUseCase,
    private readonly updateIdeaUseCase: UpdateIdeaUseCase,
    private readonly deleteIdeaUseCase: DeleteIdeaUseCase,
  ) {}

  @Post()
  public async create(@Body() input: unknown): Promise<Idea> {
    return this.createIdeaUseCase.execute(input);
  }

  @Get()
  public async list(): Promise<Idea[]> {
    return this.listIdeasUseCase.execute();
  }

  @Get(':id')
  public async getById(@Param('id', ParseIntPipe) id: number): Promise<Idea> {
    return this.getIdeaByIdUseCase.execute(id);
  }

  @Patch(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() input: unknown,
  ): Promise<Idea> {
    return this.updateIdeaUseCase.execute(id, input);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.deleteIdeaUseCase.execute(id);
  }
}
