import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.css',
})
export class ConfirmModalComponent {
  public readonly message = input.required<string>();

  public readonly confirmed = output<void>();
  public readonly cancelled = output<void>();

  protected handleConfirm(): void {
    this.confirmed.emit();
  }

  protected handleCancel(): void {
    this.cancelled.emit();
  }
}
