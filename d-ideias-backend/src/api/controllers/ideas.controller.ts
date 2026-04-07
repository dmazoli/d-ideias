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
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import type { Idea } from '../../domain/entities';
import {
  CreateIdeaUseCase,
  DownvoteIdeaUseCase,
  DeleteIdeaUseCase,
  GetIdeaByIdUseCase,
  ListIdeasUseCase,
  UpvoteIdeaUseCase,
  UpdateIdeaUseCase,
} from '../../application/use-cases';
import type { IdeaSortBy } from '../../domain/repositories';

@ApiTags('Ideas')
@Controller('ideas')
export class IdeasController {
  constructor(
    private readonly createIdeaUseCase: CreateIdeaUseCase,
    private readonly listIdeasUseCase: ListIdeasUseCase,
    private readonly getIdeaByIdUseCase: GetIdeaByIdUseCase,
    private readonly updateIdeaUseCase: UpdateIdeaUseCase,
    private readonly deleteIdeaUseCase: DeleteIdeaUseCase,
    private readonly upvoteIdeaUseCase: UpvoteIdeaUseCase,
    private readonly downvoteIdeaUseCase: DownvoteIdeaUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova ideia' })
  @ApiBody({
    description: 'Dados para criação da ideia',
    schema: {
      type: 'object',
      properties: {
        authorRegister: { type: 'number', example: 123 },
        improvementSuggestion: {
          type: 'string',
          example: 'Melhorar onboarding',
        },
        currentProcess: { type: 'string', example: 'Passos manuais' },
        howToImplement: {
          type: 'string',
          example: 'Automatizar com formulários',
        },
        expectedBenefits: {
          type: 'string',
          example: 'Configuração mais rápida',
        },
      },
      required: [
        'authorRegister',
        'improvementSuggestion',
        'currentProcess',
        'howToImplement',
        'expectedBenefits',
      ],
    },
  })
  @ApiCreatedResponse({
    description: 'Ideia criada com sucesso',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        authorRegister: { type: 'number' },
        improvementSuggestion: { type: 'string' },
        currentProcess: { type: 'string' },
        howToImplement: { type: 'string' },
        expectedBenefits: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  public async create(@Body() input: unknown): Promise<Idea> {
    return this.createIdeaUseCase.execute(input);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as ideias' })
  @ApiQuery({
    name: 'page',
    type: 'number',
    description: 'Número da página (padrão: 1)',
    required: false,
    nullable: true,
  })
  @ApiQuery({
    name: 'pageSize',
    type: 'number',
    description: 'Número de itens por página (padrão: 10)',
    required: false,
    nullable: true,
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    enum: ['recent', 'id', 'date', 'updated', 'votes', 'dislike'],
    description:
      'Campo de ordenação: recent | id | date | updated | votes | dislike (padrão: recent)',
  })
  @ApiOkResponse({
    description: 'Lista de ideias',
    isArray: true,
  })
  public async list(
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
    @Query('sortBy') sortBy?: IdeaSortBy,
  ): Promise<PaginatedResponse<Idea>> {
    return this.listIdeasUseCase.execute(page, pageSize, sortBy);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter uma ideia por ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID da ideia' })
  @ApiOkResponse({ description: 'Ideia encontrada' })
  @ApiNotFoundResponse({ description: 'Ideia não encontrada' })
  public async getById(@Param('id', ParseIntPipe) id: number): Promise<Idea> {
    return this.getIdeaByIdUseCase.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma ideia (PATCH parcial)' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID da ideia' })
  @ApiBody({
    description: 'Campos para atualização (ao menos um obrigatório)',
    schema: {
      type: 'object',
      properties: {
        authorRegister: { type: 'number', example: 123 },
        improvementSuggestion: {
          type: 'string',
          example: 'Melhorar onboarding',
        },
        currentProcess: { type: 'string', example: 'Passos manuais' },
        howToImplement: {
          type: 'string',
          example: 'Automatizar com formulários',
        },
        expectedBenefits: {
          type: 'string',
          example: 'Configuração mais rápida',
        },
      },
    },
  })
  @ApiOkResponse({ description: 'Ideia atualizada com sucesso' })
  @ApiNotFoundResponse({ description: 'Ideia não encontrada' })
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() input: unknown,
  ): Promise<Idea> {
    return this.updateIdeaUseCase.execute(id, input);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar uma ideia' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID da ideia' })
  @ApiNoContentResponse({ description: 'Ideia deletada com sucesso' })
  @ApiNotFoundResponse({ description: 'Ideia não encontrada' })
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.deleteIdeaUseCase.execute(id);
  }

  @Patch(':id/upvote')
  @ApiOperation({ summary: 'Adicionar um upvote na ideia' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID da ideia' })
  @ApiOkResponse({ description: 'Upvote registrado com sucesso' })
  @ApiNotFoundResponse({ description: 'Ideia não encontrada' })
  public async upvote(@Param('id', ParseIntPipe) id: number): Promise<Idea> {
    return this.upvoteIdeaUseCase.execute(id);
  }

  @Patch(':id/downvote')
  @ApiOperation({ summary: 'Adicionar um downvote na ideia' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID da ideia' })
  @ApiOkResponse({ description: 'Downvote registrado com sucesso' })
  @ApiNotFoundResponse({ description: 'Ideia não encontrada' })
  public async downvote(@Param('id', ParseIntPipe) id: number): Promise<Idea> {
    return this.downvoteIdeaUseCase.execute(id);
  }
}
