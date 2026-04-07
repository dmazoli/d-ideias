import { Component } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-github-link',
  templateUrl: './github-link.component.html',
  styleUrl: './github-link.component.css',
  imports: [FaIconComponent],
})
export class GithubLinkComponent {
  public readonly faGithub = faGithub;
}
