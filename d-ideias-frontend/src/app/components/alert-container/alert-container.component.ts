import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { AlertService } from '@services/alert.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alert-container.component.html',
  styleUrl: './alert-container.component.css',
  imports: [NgClass],
})
export class AlertContainerComponent {
  private readonly alertService = inject(AlertService);

  protected readonly alerts = this.alertService.alerts();

  protected dismiss(id: number): void {
    this.alertService.dismiss(id);
  }
}
