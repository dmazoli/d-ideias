import { TestBed } from '@angular/core/testing';
import { afterEach, vi } from 'vitest';
import { AlertService } from './alert.service';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertService],
    });

    service = TestBed.inject(AlertService);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should start with empty queue', () => {
    expect(service.alerts()()).toEqual([]);
  });

  it('should enqueue success alert', () => {
    service.success('Sucesso', 'Operacao concluida');

    const alerts = service.alerts()();
    expect(alerts).toHaveLength(1);
    expect(alerts[0].type).toBe('success');
    expect(alerts[0].title).toBe('Sucesso');
    expect(alerts[0].message).toBe('Operacao concluida');
  });

  it('should enqueue error alert', () => {
    service.error('Erro', 'Falha na operacao');

    const alerts = service.alerts()();
    expect(alerts).toHaveLength(1);
    expect(alerts[0].type).toBe('error');
    expect(alerts[0].title).toBe('Erro');
    expect(alerts[0].message).toBe('Falha na operacao');
  });

  it('should dismiss only selected alert by id', () => {
    const firstId = service.success('Primeiro', 'A');
    service.error('Segundo', 'B');

    service.dismiss(firstId);

    const alerts = service.alerts()();
    expect(alerts).toHaveLength(1);
    expect(alerts[0].title).toBe('Segundo');
  });

  it('should clear entire queue', () => {
    service.success('Um', 'A');
    service.error('Dois', 'B');

    service.clear();

    expect(service.alerts()()).toEqual([]);
  });

  it('should auto dismiss alert after 5 seconds', () => {
    vi.useFakeTimers();

    service.success('Auto', 'Fecha sozinho');

    expect(service.alerts()()).toHaveLength(1);

    vi.advanceTimersByTime(5000);

    expect(service.alerts()()).toHaveLength(0);
  });
});
