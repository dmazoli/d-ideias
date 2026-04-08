import { Component, computed, effect, inject, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCircleInfo, faTrash, faSave, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Idea } from '@models/idea.model';
import { IdeasService } from '@services/ideas.service';
import { ConfirmModalComponent } from '@components/confirm-modal/confirm-modal.component';

type IdeaFormControlName =
  | 'authorRegister'
  | 'improvementSuggestion'
  | 'currentProcess'
  | 'howToImplement'
  | 'expectedBenefits';

@Component({
  selector: 'app-idea-form',
  templateUrl: './idea-form.component.html',
  styleUrl: './idea-form.component.css',
  imports: [NgClass, ReactiveFormsModule, RouterLink, FaIconComponent, ConfirmModalComponent],
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

  protected readonly registrationDate = computed<string>(() => {
    const idea = this.selectedIdea();
    const date = idea?.createdAt ?? new Date();
    return new Intl.DateTimeFormat('pt-BR').format(date);
  });

  protected readonly faCircleInfo = faCircleInfo;
  protected readonly faTrash = faTrash;
  protected readonly faSave = faSave;
  protected readonly faSpinner = faSpinner;

  protected readonly loading = this.ideasService.loading();

  protected readonly showDeleteModal = signal<boolean>(false);

  protected readonly form = this.formBuilder.nonNullable.group({
    authorRegister: ['', [Validators.required, Validators.pattern(/^[1-9]\d{0,4}$/)]],
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
        authorRegister: idea?.authorRegister?.toString() ?? '',
        improvementSuggestion: idea?.improvementSuggestion ?? '',
        currentProcess: idea?.currentProcess ?? '',
        howToImplement: idea?.howToImplement ?? '',
        expectedBenefits: idea?.expectedBenefits ?? '',
      });

      Boolean(idea?.id)
        ? this.form.controls.authorRegister.disable({ emitEvent: false })
        : this.form.controls.authorRegister.enable({ emitEvent: false });

    });

    this.form.get('authorRegister')?.valueChanges.subscribe((value) => {
      if (typeof value === 'string') {
        const digitsOnly = value.replace(/\D/g, '').slice(0, 5);
        if (value !== digitsOnly) {
          this.form.controls.authorRegister.setValue(digitsOnly, { emitEvent: false });
        }
      }

      const authorRegister = Number(value);
      if (!Number.isInteger(authorRegister) || authorRegister <= 0 || authorRegister > 99999) {
        this.form.controls.authorRegister.setErrors({ pattern: true });
        return;
      }
    });
  }

  protected async handleSubmit(): Promise<void> {
    for (const controlName in this.form.controls) {
      this.form.get(controlName)?.markAsTouched();
    }

    if (this.form.invalid) {
      this.form.markAsTouched();
      return;
    }

    const payload = this.form.getRawValue();
    const authorRegister = Number(payload.authorRegister);

    const id = this.ideaId();

    const result =
      id === null
        ? await this.ideasService.createIdea({
          ...payload,
          authorRegister,
        })
        : await this.ideasService.updateIdea(id, {
          ...payload,
          authorRegister,
        });

    if (result !== null) {
      await this.router.navigate(['/']);
    }
  }

  protected handleAuthorRegisterInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const digitsOnly = input.value.replace(/\D/g, '').slice(0, 5);

    if (input.value !== digitsOnly) {
      input.value = digitsOnly;
    }

    this.form.controls.authorRegister.setValue(digitsOnly, { emitEvent: false });
  }

  protected showInvalidFormWarning(): boolean {
    return this.form.invalid && this.form.touched;
  }

  protected showControlError(controlName: IdeaFormControlName): boolean {
    const control = this.form.controls[controlName];
    return control.touched && control.invalid;
  }

  protected controlErrorMessage(controlName: IdeaFormControlName): string {
    const control = this.form.controls[controlName];

    if (control.hasError('required')) {
      return 'Este campo e obrigatorio.';
    }

    if (controlName === 'authorRegister' && control.hasError('pattern')) {
      return 'Informe apenas numeros, entre 1 e 99999.';
    }

    if (control.hasError('minlength')) {
      return 'Informe no minimo 10 caracteres.';
    }

    return 'Valor invalido.';
  }

  protected handleDelete(): void {
    this.showDeleteModal.set(true);
  }

  protected async confirmDelete(): Promise<void> {
    this.showDeleteModal.set(false);
    const id = this.ideaId();

    if (id === null) {
      return;
    }

    await this.ideasService.deleteIdea(id);
    await this.router.navigate(['/']);
  }
}
