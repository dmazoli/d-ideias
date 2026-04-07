import { Component, OnInit, inject } from '@angular/core';
import { IdeaCardListComponent } from '../../components/idea-card-list/idea-card-list.component';
import { IdeasService } from '@services/ideas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [IdeaCardListComponent],
})
export class HomeComponent implements OnInit {
  private readonly ideasService = inject(IdeasService);

  protected readonly ideas = this.ideasService.ideas();
  protected readonly status = this.ideasService.status();

  public ngOnInit(): void {
    void this.ideasService.loadIdeas();
  }
}
