import { HttpClient } from '@angular/common/http';
import { Injectable, signal, type Signal, inject } from '@angular/core';
import { Idea } from '@models/idea.model';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';

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

  private readonly endpoint = `/api/ideas`;

  private readonly ideasState = signal<Idea[]>([]);
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

  public async loadIdeas(): Promise<void> {
    this.loadingState.set(true);
    this.errorState.set(null);

    try {
      const response = await firstValueFrom(this.http.get<Idea[]>(this.endpoint));
      this.ideasState.set(response.map((idea: Idea) => this.toIdea(idea)));
    } catch {
      this.ideasState.set([]);
      this.errorState.set('Nao foi possivel carregar ideias da API.');
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
      return idea;
    } catch {
      this.errorState.set('Nao foi possivel criar a ideia.');
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
      return updatedIdea;
    } catch {
      this.errorState.set('Nao foi possivel atualizar a ideia.');
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
      return true;
    } catch {
      this.errorState.set('Nao foi possivel deletar a ideia.');
      return false;
    } finally {
      this.loadingState.set(false);
    }
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
