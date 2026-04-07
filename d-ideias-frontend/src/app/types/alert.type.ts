export type AlertType = 'success' | 'error';

export interface AlertInput {
  title: string;
  message: string;
  type: AlertType;
}

export interface AlertItem extends AlertInput {
  id: number;
  createdAt: number;
}
