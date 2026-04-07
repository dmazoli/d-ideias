import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IdeaCardComponent } from '@components/idea-card/idea-card.component';
import { SortDropdownComponent } from '@components/sort-dropdown/sort-dropdown.component';
import { Idea } from '@models/idea.model';
import type { IdeaSortBy } from '@services/ideas.service';

@Component({
  selector: 'app-idea-card-list',
  templateUrl: './idea-card-list.component.html',
  imports: [RouterLink, IdeaCardComponent, SortDropdownComponent],
})
export class IdeaCardListComponent {
  public readonly ideas = input.required<Idea[]>();
  public readonly currentSort = input.required<IdeaSortBy>();
  public readonly sortChanged = output<IdeaSortBy>();

  protected onSortChanged(sortBy: IdeaSortBy): void {
    this.sortChanged.emit(sortBy);
  }
}
