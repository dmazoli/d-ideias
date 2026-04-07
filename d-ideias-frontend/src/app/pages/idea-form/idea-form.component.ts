import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Idea } from '@models/idea.model';
import { IdeasService } from '@services/ideas.service';

@Component({
  selector: 'app-idea-form',
  templateUrl: './idea-form.component.html',
  styleUrl: './idea-form.component.css',
  imports: [ReactiveFormsModule, RouterLink],
})
export class IdeaFormComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly ideasService = inject(IdeasService);

  private readonly ideaId = toSignal(
    this.route.paramMap.pipe(
      map((params) => {
        const id = params.get('id');
        return id ? Number(id) : null;
      }),
    ),
    { initialValue: null },
  );

  private readonly selectedIdea = signal<Idea | undefined>(undefined);

  protected readonly isEditMode = computed<boolean>(() => {
    return this.ideaId() !== null;
  });

  protected readonly pageTitle = computed<string>(() => {
    return this.isEditMode() ? 'Editar ideia' : 'Nova ideia';
  });

  protected readonly submitLabel = computed<string>(() => {
    return this.isEditMode() ? 'Salvar alteracoes' : 'Criar ideia';
  });

  protected readonly form = this.formBuilder.nonNullable.group({
    authorRegister: [0, [Validators.required, Validators.min(1)]],
    improvementSuggestion: ['', [Validators.required, Validators.minLength(10)]],
    currentProcess: ['', [Validators.required, Validators.minLength(10)]],
    howToImplement: ['', [Validators.required, Validators.minLength(10)]],
    expectedBenefits: ['', [Validators.required, Validators.minLength(10)]],
  });

  public constructor() {
    effect(() => {
      const id = this.ideaId();

      if (id === null) {
        this.selectedIdea.set(undefined);
        return;
      }

      void this.ideasService.getIdeaById(id).then((idea: Idea | undefined) => {
        this.selectedIdea.set(idea);
      });
    });

    effect(() => {
      const idea = this.selectedIdea();

      this.form.reset({
        authorRegister: idea?.authorRegister ?? 0,
        improvementSuggestion: idea?.improvementSuggestion ?? '',
        currentProcess: idea?.currentProcess ?? '',
        howToImplement: idea?.howToImplement ?? '',
        expectedBenefits: idea?.expectedBenefits ?? '',
      });
    });
  }

  protected async handleSubmit(): Promise<void> {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      console.warn('Formulário inválido. Verifique os campos e tente novamente.');
      return;
    }

    const payload = this.form.getRawValue();
    const id = this.ideaId();

    const result =
      id === null
        ? await this.ideasService.createIdea(payload)
        : await this.ideasService.updateIdea(id, payload);

    if (result !== null) {
      await this.router.navigate(['/']);
    }
  }
}
