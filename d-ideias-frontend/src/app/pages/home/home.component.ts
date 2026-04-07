import { Component, OnInit, inject } from '@angular/core';
import { IdeaCardListComponent } from '../../components/idea-card-list/idea-card-list.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { IdeasService } from '@services/ideas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [IdeaCardListComponent, PaginationComponent],
})
export class HomeComponent implements OnInit {
  private readonly ideasService = inject(IdeasService);

  protected readonly ideas = this.ideasService.ideas();
  protected readonly loading = this.ideasService.loading();
  protected readonly pagination = this.ideasService.pagination();

  public ngOnInit(): void {
    void this.ideasService.loadIdeas();
  }

  protected async onPageChange(page: number): Promise<void> {
    void this.ideasService.loadIdeas(page);
  }
}
