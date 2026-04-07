import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { IdeasController } from '../src/api/controllers';
import {
  CreateIdeaUseCase,
  DeleteIdeaUseCase,
  GetIdeaByIdUseCase,
  ListIdeasUseCase,
  UpdateIdeaUseCase,
} from '../src/application/use-cases';
import type { Idea } from '../src/domain/entities';
import type { IIdeaRepository } from '../src/domain/repositories';

describe('Ideas API (integration)', () => {
  let app: INestApplication;

  const ideaRepositoryMock: jest.Mocked<IIdeaRepository> = {
    save: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    deleteById: jest.fn(),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [IdeasController],
      providers: [
        CreateIdeaUseCase,
        ListIdeasUseCase,
        GetIdeaByIdUseCase,
        UpdateIdeaUseCase,
        DeleteIdeaUseCase,
        {
          provide: 'IIdeaRepository',
          useValue: ideaRepositoryMock,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach((): void => {
    jest.clearAllMocks();
  });

  it('POST /ideas should create an idea', async () => {
    const payload: Record<string, unknown> = {
      authorRegister: 123,
      improvementSuggestion: 'Improve onboarding',
      currentProcess: 'Manual onboarding steps',
      howToImplement: 'Automate with forms',
      expectedBenefits: 'Faster setup',
    };

    const createdIdea: Idea = {
      id: 1,
      authorRegister: 123,
      improvementSuggestion: 'Improve onboarding',
      currentProcess: 'Manual onboarding steps',
      howToImplement: 'Automate with forms',
      expectedBenefits: 'Faster setup',
      createdAt: new Date('2026-04-07T00:00:00.000Z'),
      updatedAt: new Date('2026-04-07T00:00:00.000Z'),
    };

    ideaRepositoryMock.save.mockResolvedValue(createdIdea);

    await request(app.getHttpServer())
      .post('/ideas')
      .send(payload)
      .expect(201)
      .expect(({ body }: { body: Idea }): void => {
        expect(body.id).toBe(1);
        expect(body.authorRegister).toBe(123);
      });

    expect(ideaRepositoryMock.save).toHaveBeenCalledTimes(1);
  });

  it('POST /ideas should return 400 for invalid payload', async () => {
    await request(app.getHttpServer())
      .post('/ideas')
      .send({
        authorRegister: 123,
      })
      .expect(400);

    expect(ideaRepositoryMock.save).not.toHaveBeenCalled();
  });

  it('GET /ideas should return a list of ideas', async () => {
    const ideas: Idea[] = [
      {
        id: 1,
        authorRegister: 123,
        improvementSuggestion: 'Improve onboarding',
        currentProcess: 'Manual onboarding steps',
        howToImplement: 'Automate with forms',
        expectedBenefits: 'Faster setup',
        createdAt: new Date('2026-04-07T00:00:00.000Z'),
        updatedAt: new Date('2026-04-07T00:00:00.000Z'),
      },
    ];

    ideaRepositoryMock.findAll.mockResolvedValue(ideas);

    await request(app.getHttpServer())
      .get('/ideas')
      .expect(200)
      .expect(({ body }: { body: Idea[] }): void => {
        expect(body).toHaveLength(1);
        expect(body[0]?.id).toBe(1);
      });
  });

  it('GET /ideas/:id should return 404 when not found', async () => {
    ideaRepositoryMock.findById.mockResolvedValue(null);

    await request(app.getHttpServer()).get('/ideas/999').expect(404);
  });

  it('PATCH /ideas/:id should apply partial update', async () => {
    const updatedIdea: Idea = {
      id: 1,
      authorRegister: 123,
      improvementSuggestion: 'Updated suggestion',
      currentProcess: 'Manual onboarding steps',
      howToImplement: 'Automate with forms',
      expectedBenefits: 'Faster setup',
      createdAt: new Date('2026-04-07T00:00:00.000Z'),
      updatedAt: new Date('2026-04-07T00:00:01.000Z'),
    };

    ideaRepositoryMock.update.mockResolvedValue(updatedIdea);

    await request(app.getHttpServer())
      .patch('/ideas/1')
      .send({ improvementSuggestion: 'Updated suggestion' })
      .expect(200)
      .expect(({ body }: { body: Idea }): void => {
        expect(body.id).toBe(1);
        expect(body.improvementSuggestion).toBe('Updated suggestion');
      });

    expect(ideaRepositoryMock.update).toHaveBeenCalledTimes(1);
  });

  it('PATCH /ideas/:id should return 400 for empty payload', async () => {
    await request(app.getHttpServer()).patch('/ideas/1').send({}).expect(400);

    expect(ideaRepositoryMock.update).not.toHaveBeenCalled();
  });

  it('DELETE /ideas/:id should return 204 when deleted', async () => {
    ideaRepositoryMock.deleteById.mockResolvedValue(true);

    await request(app.getHttpServer()).delete('/ideas/1').expect(204);

    expect(ideaRepositoryMock.deleteById).toHaveBeenCalledWith(1);
  });

  it('DELETE /ideas/:id should return 404 when not found', async () => {
    ideaRepositoryMock.deleteById.mockResolvedValue(false);

    await request(app.getHttpServer()).delete('/ideas/999').expect(404);
  });

  afterAll(async (): Promise<void> => {
    await app.close();
  });

  it('GET /ideas/:id should validate id type', () => {
    return request(app.getHttpServer()).get('/ideas/not-a-number').expect(400);
  });
});
