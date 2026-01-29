import type { PaymentState } from '../interfaces/payment-state.interface';
import type { PaymentContext } from '../contexts/payment.context';
import type { PaymentData } from '../types/payment-data.type';
import { PaymentStatus } from '../enums/payment-status.enum';
import { PendingState } from './pending.state';

export class NewState implements PaymentState {
  public async create(context: PaymentContext, data: PaymentData): Promise<void> {
    const provider = context.getProvider();
    const payment = context.getPayment();

    const paymentId = await provider.createPayment(data);

    payment.status = PaymentStatus.PENDING;
    payment.failureReason = null;

    context.setState(new PendingState(paymentId));
  }

  public async confirm(): Promise<void> {
    throw new Error('Payment is not created yet');
  }

  public async fail(): Promise<void> {
    throw new Error('Payment is not created yet');
  }

  public async refund(): Promise<void> {
    throw new Error('Payment is not created yet');
  }
}
