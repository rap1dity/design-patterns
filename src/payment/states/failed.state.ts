import type { PaymentState } from '../interfaces/payment-state.interface';

export class FailedState implements PaymentState {
  public async create(): Promise<void> {
    throw new Error('Failed payment cannot be recreated');
  }

  public async confirm(): Promise<void> {
    throw new Error('Failed payment cannot be confirmed');
  }

  public async fail(): Promise<void> {
    throw new Error('Payment already failed');
  }

  public async refund(): Promise<void> {
    throw new Error('Failed payment cannot be refunded');
  }
}
