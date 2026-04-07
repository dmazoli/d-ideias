import { Component, OnInit, inject, signal } from '@angular/core';
import { IdeaCardListComponent } from '../../components/idea-card-list/idea-card-list.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { IdeasService, type IdeaSortBy } from '@services/ideas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [IdeaCardListComponent, PaginationComponent],
})
export class HomeComponent implements OnInit {
  private readonly ideasService = inject(IdeasService);
  private readonly pageSize = 9;

  protected readonly ideas = this.ideasService.ideas();
  protected readonly loading = this.ideasService.loading();
  protected readonly pagination = this.ideasService.pagination();
  protected readonly currentSort = signal<IdeaSortBy>('recent');

  public ngOnInit(): void {
    void this.ideasService.loadIdeas(1, this.pageSize, this.currentSort());
  }

  protected async onPageChange(page: number): Promise<void> {
    void this.ideasService.loadIdeas(page, this.pageSize, this.currentSort());
  }

  protected async onSortChange(sortBy: IdeaSortBy): Promise<void> {
    this.currentSort.set(sortBy);
    void this.ideasService.loadIdeas(1, this.pageSize, sortBy);
  }
}
