import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from '@components/header/header.component';
import { AlertContainerComponent } from '@components/alert-container/alert-container.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppHeaderComponent, AlertContainerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
