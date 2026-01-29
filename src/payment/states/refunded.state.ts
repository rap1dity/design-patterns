import type { PaymentState } from '../interfaces/payment-state.interface'

export class RefundedState implements PaymentState {
  public async create(): Promise<void> {
    throw new Error('Refunded payment cannot be recreated');
  }

  public async confirm(): Promise<void> {
    throw new Error('Refunded payment cannot be confirmed');
  }

  public async fail(): Promise<void> {
    throw new Error('Refunded payment cannot fail');
  }

  public async refund(): Promise<void> {
    throw new Error('Payment already refunded');
  }
}
