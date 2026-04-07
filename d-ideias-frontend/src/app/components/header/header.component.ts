import { Component } from '@angular/core';
import { LogoComponent } from './logo/logo.component';
import { GithubLinkComponent } from './github-link/github-link.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [LogoComponent, GithubLinkComponent],
})
export class AppHeaderComponent {}
