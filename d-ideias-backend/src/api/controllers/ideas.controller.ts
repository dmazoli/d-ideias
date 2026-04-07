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
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import type { Idea } from '../../domain/entities';
import {
  CreateIdeaUseCase,
  DeleteIdeaUseCase,
  GetIdeaByIdUseCase,
  ListIdeasUseCase,
  UpdateIdeaUseCase,
} from '../../application/use-cases';

@ApiTags('Ideas')
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
  @ApiOkResponse({
    description: 'Lista de ideias',
    isArray: true,
  })
  public async list(): Promise<Idea[]> {
    return this.listIdeasUseCase.execute();
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
}
