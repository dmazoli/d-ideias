import { HttpClient } from '@angular/common/http';
import { Injectable, signal, type Signal, inject } from '@angular/core';
import { Idea } from '@models/idea.model';
import { firstValueFrom } from 'rxjs';
import { AlertService } from './alert.service';

interface IdeaPayload {
  authorRegister: number;
  improvementSuggestion: string;
  currentProcess: string;
  howToImplement: string;
  expectedBenefits: string;
}

@Injectable({
  providedIn: 'root',
})
export class IdeasService {
  private readonly http = inject(HttpClient);
  private readonly alertService = inject(AlertService);

  private readonly endpoint = `/api/ideas`;

  private readonly ideasState = signal<Idea[]>([]);
  private readonly paginationMeta = signal<PaginationMeta | null>(null);

  private readonly loadingState = signal<boolean>(false);
  private readonly errorState = signal<string | null>(null);

  public ideas(): Signal<Idea[]> {
    return this.ideasState.asReadonly();
  }

  public loading(): Signal<boolean> {
    return this.loadingState.asReadonly();
  }

  public error(): Signal<string | null> {
    return this.errorState.asReadonly();
  }

  public pagination(): Signal<PaginationMeta | null> {
    return this.paginationMeta.asReadonly();
  }

  public async loadIdeas(page: number = 1, pageSize: number = 9): Promise<void> {
    this.loadingState.set(true);
    this.errorState.set(null);

    try {
      const response = await firstValueFrom(this.http.get<PaginatedResponse<Idea>>(this.endpoint, { params: { page, pageSize } }));
      this.ideasState.set(response.data.map((idea: Idea) => this.toIdea(idea)));
      this.paginationMeta.set(response.meta);
    } catch (error: unknown) {
      const message = this.getApiErrorMessage(error, 'Nao foi possivel carregar ideias da API.');
      this.ideasState.set([]);
      this.errorState.set(message);
      this.alertService.error('Erro ao carregar ideias', message);
    } finally {
      this.loadingState.set(false);
    }
  }

  public async getIdeaById(id: number): Promise<Idea | undefined> {
    this.errorState.set(null);

    try {
      const response = await firstValueFrom(this.http.get<Idea>(`${this.endpoint}/${id}`));
      return this.toIdea(response);
    } catch {
      return this.ideasState().find((idea: Idea) => idea.id === id);
    }
  }

  public async createIdea(payload: IdeaPayload): Promise<Idea | null> {
    this.loadingState.set(true);
    this.errorState.set(null);

    try {
      const response = await firstValueFrom(this.http.post<Idea>(this.endpoint, payload));
      const idea = this.toIdea(response);
      this.ideasState.update((ideas: Idea[]) => [idea, ...ideas]);
      this.alertService.success('Ideia criada', 'A ideia foi criada com sucesso.');
      return idea;
    } catch (error: unknown) {
      const message = this.getApiErrorMessage(error, 'Nao foi possivel criar a ideia.');
      this.errorState.set(message);
      this.alertService.error('Erro ao criar ideia', message);
      return null;
    } finally {
      this.loadingState.set(false);
    }
  }

  public async updateIdea(id: number, payload: IdeaPayload): Promise<Idea | null> {
    this.loadingState.set(true);
    this.errorState.set(null);

    try {
      const response = await firstValueFrom(
        this.http.patch<Idea>(`${this.endpoint}/${id}`, payload),
      );
      const updatedIdea = this.toIdea(response);
      this.ideasState.update((ideas: Idea[]) => {
        return ideas.map((idea: Idea) => (idea.id === id ? updatedIdea : idea));
      });
      this.alertService.success('Ideia atualizada', 'A ideia foi atualizada com sucesso.');
      return updatedIdea;
    } catch (error: unknown) {
      const message = this.getApiErrorMessage(error, 'Nao foi possivel atualizar a ideia.');
      this.errorState.set(message);
      this.alertService.error('Erro ao atualizar ideia', message);
      return null;
    } finally {
      this.loadingState.set(false);
    }
  }

  public async deleteIdea(id: number): Promise<boolean> {
    this.loadingState.set(true);
    this.errorState.set(null);

    try {
      await firstValueFrom(this.http.delete(`${this.endpoint}/${id}`));
      this.ideasState.update((ideas: Idea[]) => {
        return ideas.filter((idea: Idea) => idea.id !== id);
      });
      this.alertService.success('Ideia removida', 'A ideia foi removida com sucesso.');
      return true;
    } catch (error: unknown) {
      const message = this.getApiErrorMessage(error, 'Nao foi possivel deletar a ideia.');
      this.errorState.set(message);
      this.alertService.error('Erro ao remover ideia', message);
      return false;
    } finally {
      this.loadingState.set(false);
    }
  }

  private getApiErrorMessage(error: unknown, fallback: string): string {
    if (typeof error !== 'object' || error === null) {
      return fallback;
    }

    const httpError = error as { error?: unknown; message?: unknown };

    if (typeof httpError.error === 'string' && httpError.error.trim().length > 0) {
      return httpError.error;
    }

    if (typeof httpError.error === 'object' && httpError.error !== null) {
      const apiError = httpError.error as { message?: unknown };

      if (typeof apiError.message === 'string' && apiError.message.trim().length > 0) {
        return apiError.message;
      }

      if (Array.isArray(apiError.message)) {
        const messages = apiError.message.filter((value: unknown) => {
          return typeof value === 'string' && value.trim().length > 0;
        }) as string[];

        if (messages.length > 0) {
          return messages.join(' | ');
        }
      }
    }

    if (typeof httpError.message === 'string' && httpError.message.trim().length > 0) {
      return httpError.message;
    }

    return fallback;
  }

  private toIdea(idea: Idea): Idea {
    return new Idea(
      idea.id,
      idea.authorRegister,
      idea.improvementSuggestion,
      idea.currentProcess,
      idea.howToImplement,
      idea.expectedBenefits,
      idea.createdAt,
      idea.updatedAt,
    );
  }
}
