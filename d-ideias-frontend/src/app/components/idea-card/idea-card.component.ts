import { Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCircleInfo, faThumbsDown, faThumbsUp, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Idea } from '@models/idea.model';
import { IdeasService } from '@services/ideas.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-idea-card',
  templateUrl: './idea-card.component.html',
  styleUrl: './idea-card.component.css',
  imports: [RouterLink, DatePipe, FaIconComponent, ConfirmModalComponent],
})
export class IdeaCardComponent {
  private readonly ideasService = inject(IdeasService);

  public readonly idea = input.required<Idea>();

  protected readonly faCircleInfo = faCircleInfo;
  protected readonly faTrash = faTrash;
  protected readonly faThumbsUp = faThumbsUp;
  protected readonly faThumbsDown = faThumbsDown;

  protected readonly showDeleteModal = signal<boolean>(false);

  protected readonly isUpdated = computed<boolean>(() => {
    return this.idea().createdAt.getTime() !== this.idea().updatedAt.getTime();
  });

  protected handleDelete(): void {
    this.showDeleteModal.set(true);
  }

  protected async confirmDelete(): Promise<void> {
    this.showDeleteModal.set(false);
    await this.ideasService.deleteIdea(this.idea().id);
  }

  protected cancelDelete(): void {
    this.showDeleteModal.set(false);
  }

  protected async upvoteIdea(): Promise<void> {
    await this.ideasService.upvoteIdea(this.idea().id);
  }

  protected async downvoteIdea(): Promise<void> {
    await this.ideasService.downvoteIdea(this.idea().id);
  }
}
