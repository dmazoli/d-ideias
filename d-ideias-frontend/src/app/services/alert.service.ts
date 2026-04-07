import { Injectable, Signal, inject, signal } from '@angular/core';
import { AlertInput, AlertItem } from '../types/alert.type';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private readonly queueState = signal<AlertItem[]>([]);
  private readonly timeoutById = new Map<number, ReturnType<typeof setTimeout>>();

  private nextId = 1;

  public alerts(): Signal<AlertItem[]> {
    return this.queueState.asReadonly();
  }

  public success(title: string, message: string): number {
    return this.push({ type: 'success', title, message });
  }

  public error(title: string, message: string): number {
    return this.push({ type: 'error', title, message });
  }

  public push(input: AlertInput): number {
    const id = this.nextId++;
    const alert: AlertItem = {
      id,
      createdAt: Date.now(),
      ...input,
    };

    this.queueState.update((alerts: AlertItem[]) => {
      return [...alerts, alert];
    });

    const timeoutId = setTimeout(() => {
      this.dismiss(id);
    }, 5000);

    this.timeoutById.set(id, timeoutId);
    return id;
  }

  public dismiss(id: number): void {
    const timeoutId = this.timeoutById.get(id);

    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
      this.timeoutById.delete(id);
    }

    this.queueState.update((alerts: AlertItem[]) => {
      return alerts.filter((alert: AlertItem) => alert.id !== id);
    });
  }

  public clear(): void {
    this.timeoutById.forEach((timeoutId: ReturnType<typeof setTimeout>) => {
      clearTimeout(timeoutId);
    });

    this.timeoutById.clear();
    this.queueState.set([]);
  }
}
