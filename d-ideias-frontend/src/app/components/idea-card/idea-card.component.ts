import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Idea } from '@models/idea.model';

@Component({
  selector: 'app-idea-card',
  templateUrl: './idea-card.component.html',
  styleUrl: './idea-card.component.css',
  imports: [RouterLink, DatePipe],
})
export class IdeaCardComponent {
  public readonly idea = input.required<Idea>();

  protected readonly isUpdated = computed<boolean>(() => {
    return this.idea().createdAt.getTime() !== this.idea().updatedAt.getTime();
  });
}
