import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-aside',
  templateUrl: './home-aside.component.html',
  imports: [RouterLink],
})
export class HomeAsideComponent {
  public readonly ideasCount = input.required<number>();
  public readonly status = input.required<string>();
}
