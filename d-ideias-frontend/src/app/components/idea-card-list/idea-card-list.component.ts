import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IdeaCardComponent } from '@components/idea-card/idea-card.component';
import { Idea } from '@models/idea.model';

@Component({
  selector: 'app-idea-card-list',
  templateUrl: './idea-card-list.component.html',
  imports: [RouterLink, IdeaCardComponent],
})
export class IdeaCardListComponent {
  public readonly ideas = input.required<Idea[]>();
}
