import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { IdeasService } from './ideas.service';
import { Idea } from '@models/idea.model';
import { AlertService } from './alert.service';
import { vi } from 'vitest';

const mockPayload = {
  authorRegister: 12345,
  improvementSuggestion: 'Sugestao de melhoria',
  currentProcess: 'Processo atual descrito com detalhes',
  howToImplement: 'Como a melhoria pode ser implementada',
  expectedBenefits: 'Beneficios esperados com a implementacao',
};

const mockIdeaData = {
  id: 1,
  ...mockPayload,
  upvotes: 0,
  downvotes: 0,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
};

describe('IdeasService', () => {
  let service: IdeasService;
  let httpController: HttpTestingController;
  let mockAlertService: {
    success: ReturnType<typeof vi.fn>;
    error: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    mockAlertService = {
      success: vi.fn(),
      error: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AlertService, useValue: mockAlertService },
      ],
    });

    service = TestBed.inject(IdeasService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
    vi.clearAllMocks();
  });

  describe('initial state', () => {
    it('should have empty ideas list', () => {
      expect(service.ideas()()).toEqual([]);
    });

    it('should have loading as false', () => {
      expect(service.loading()()).toBe(false);
    });

    it('should have null error', () => {
      expect(service.error()()).toBeNull();
    });
  });

  describe('loadIdeas', () => {
    it('should populate ideas and clear loading on success', async () => {
      const promise = service.loadIdeas();

      const req = httpController.expectOne((request) => request.url === '/api/ideas');
      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('page')).toBe('1');
      expect(req.request.params.get('pageSize')).toBe('9');
      expect(req.request.params.get('sortBy')).toBe('recent');
      req.flush({ data: [mockIdeaData], meta: { count: 1, page: 1, pageSize: 10 } });

      await promise;

      expect(service.ideas()()).toHaveLength(1);
      expect(service.ideas()()[0]).toBeInstanceOf(Idea);
      expect(service.ideas()()[0].id).toBe(1);
      expect(service.loading()()).toBe(false);
      expect(service.error()()).toBeNull();
      expect(mockAlertService.error).not.toHaveBeenCalled();
    });

    it('should set error and clear ideas on failure', async () => {
      const promise = service.loadIdeas();

      httpController
        .expectOne((request) => request.url === '/api/ideas')
        .flush(
          { message: 'Falha ao carregar ideias da API' },
          { status: 500, statusText: 'Server Error' },
        );

      await promise;

      expect(service.ideas()()).toEqual([]);
      expect(service.error()()).toBe('Falha ao carregar ideias da API');
      expect(service.loading()()).toBe(false);
      expect(mockAlertService.error).toHaveBeenCalledWith(
        'Erro ao carregar ideias',
        'Falha ao carregar ideias da API',
      );
    });
  });

  describe('getIdeaById', () => {
    it('should return an Idea from the API', async () => {
      const promise = service.getIdeaById(1);

      httpController.expectOne('/api/ideas/1').flush(mockIdeaData);

      const result = await promise;

      expect(result).toBeInstanceOf(Idea);
      expect(result?.id).toBe(1);
    });

    it('should fall back to cached ideas when API fails', async () => {
      const loadPromise = service.loadIdeas();
      httpController
        .expectOne((request) => request.url === '/api/ideas')
        .flush({ data: [mockIdeaData], meta: { count: 1, page: 1, pageSize: 10 } });
      await loadPromise;

      const promise = service.getIdeaById(1);
      httpController
        .expectOne('/api/ideas/1')
        .flush('Not Found', { status: 404, statusText: 'Not Found' });

      const result = await promise;

      expect(result?.id).toBe(1);
    });

    it('should return undefined when not in cache and API fails', async () => {
      const promise = service.getIdeaById(999);
      httpController
        .expectOne('/api/ideas/999')
        .flush('Not Found', { status: 404, statusText: 'Not Found' });

      const result = await promise;

      expect(result).toBeUndefined();
    });
  });

  describe('createIdea', () => {
    it('should prepend created idea to the list', async () => {
      const promise = service.createIdea(mockPayload);

      const req = httpController.expectOne('/api/ideas');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockPayload);
      req.flush(mockIdeaData);

      const result = await promise;

      expect(result).toBeInstanceOf(Idea);
      expect(service.ideas()()).toHaveLength(1);
      expect(service.loading()()).toBe(false);
      expect(mockAlertService.success).toHaveBeenCalledWith(
        'Ideia criada',
        'A ideia foi criada com sucesso.',
      );
    });

    it('should return null and set error on failure', async () => {
      const promise = service.createIdea(mockPayload);

      httpController
        .expectOne('/api/ideas')
        .flush({ message: 'Falha ao criar ideia' }, { status: 500, statusText: 'Server Error' });

      const result = await promise;

      expect(result).toBeNull();
      expect(service.error()()).toBe('Falha ao criar ideia');
      expect(service.loading()()).toBe(false);
      expect(mockAlertService.error).toHaveBeenCalledWith(
        'Erro ao criar ideia',
        'Falha ao criar ideia',
      );
    });
  });

  describe('updateIdea', () => {
    it('should update the matching idea in the list', async () => {
      const loadPromise = service.loadIdeas();
      httpController
        .expectOne((request) => request.url === '/api/ideas')
        .flush({ data: [mockIdeaData], meta: { count: 1, page: 1, pageSize: 10 } });
      await loadPromise;

      const updatedData = { ...mockIdeaData, improvementSuggestion: 'Atualizado' };
      const promise = service.updateIdea(1, {
        ...mockPayload,
        improvementSuggestion: 'Atualizado',
      });

      const req = httpController.expectOne('/api/ideas/1');
      expect(req.request.method).toBe('PATCH');
      req.flush(updatedData);

      const result = await promise;

      expect(result?.improvementSuggestion).toBe('Atualizado');
      expect(service.ideas()()[0].improvementSuggestion).toBe('Atualizado');
      expect(service.loading()()).toBe(false);
      expect(mockAlertService.success).toHaveBeenCalledWith(
        'Ideia atualizada',
        'A ideia foi atualizada com sucesso.',
      );
    });

    it('should return null and set error on failure', async () => {
      const promise = service.updateIdea(1, mockPayload);

      httpController
        .expectOne('/api/ideas/1')
        .flush(
          { message: 'Falha ao atualizar ideia' },
          { status: 500, statusText: 'Server Error' },
        );

      const result = await promise;

      expect(result).toBeNull();
      expect(service.error()()).toBe('Falha ao atualizar ideia');
      expect(service.loading()()).toBe(false);
      expect(mockAlertService.error).toHaveBeenCalledWith(
        'Erro ao atualizar ideia',
        'Falha ao atualizar ideia',
      );
    });
  });

  describe('deleteIdea', () => {
    it('should remove the idea from the list and return true', async () => {
      const loadPromise = service.loadIdeas();
      httpController
        .expectOne((request) => request.url === '/api/ideas')
        .flush({ data: [mockIdeaData], meta: { count: 1, page: 1, pageSize: 10 } });
      await loadPromise;

      const promise = service.deleteIdea(1);

      const req = httpController.expectOne('/api/ideas/1');
      expect(req.request.method).toBe('DELETE');
      req.flush(null);

      const result = await promise;

      expect(result).toBe(true);
      expect(service.ideas()()).toHaveLength(0);
      expect(service.loading()()).toBe(false);
      expect(mockAlertService.success).toHaveBeenCalledWith(
        'Ideia removida',
        'A ideia foi removida com sucesso.',
      );
    });

    it('should return false and set error on failure', async () => {
      const promise = service.deleteIdea(1);

      httpController
        .expectOne('/api/ideas/1')
        .flush({ message: 'Falha ao remover ideia' }, { status: 500, statusText: 'Server Error' });

      const result = await promise;

      expect(result).toBe(false);
      expect(service.error()()).toBe('Falha ao remover ideia');
      expect(service.loading()()).toBe(false);
      expect(mockAlertService.error).toHaveBeenCalledWith(
        'Erro ao remover ideia',
        'Falha ao remover ideia',
      );
    });
  });

  describe('voteIdea', () => {
    it('should increment upvotes for matching idea', async () => {
      const loadPromise = service.loadIdeas();
      httpController
        .expectOne((request) => request.url === '/api/ideas')
        .flush({ data: [mockIdeaData], meta: { count: 1, page: 1, pageSize: 10 } });
      await loadPromise;

      const promise = service.upvoteIdea(1);

      const req = httpController.expectOne('/api/ideas/1/upvote');
      expect(req.request.method).toBe('PATCH');
      req.flush({});

      await promise;

      expect(service.ideas()()[0].upvotes).toBe(1);
      expect(service.ideas()()[0].downvotes).toBe(0);
    });

    it('should increment downvotes for matching idea', async () => {
      const loadPromise = service.loadIdeas();
      httpController
        .expectOne((request) => request.url === '/api/ideas')
        .flush({ data: [mockIdeaData], meta: { count: 1, page: 1, pageSize: 10 } });
      await loadPromise;

      const promise = service.downvoteIdea(1);

      const req = httpController.expectOne('/api/ideas/1/downvote');
      expect(req.request.method).toBe('PATCH');
      req.flush({});

      await promise;

      expect(service.ideas()()[0].upvotes).toBe(0);
      expect(service.ideas()()[0].downvotes).toBe(1);
    });
  });
});
