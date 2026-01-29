import type { PaymentState } from '../interfaces/payment-state.interface';
import type { PaymentContext } from '../contexts/payment.context';
import { PaymentStatus } from '../enums/payment-status.enum';
import { RefundedState } from './refunded.state';

export class CompletedState implements PaymentState {
  private readonly providerPaymentId: string;

  public constructor(providerPaymentId: string) {
    this.providerPaymentId = providerPaymentId;
  }

  public async create(): Promise<void> {
    throw new Error('Payment already completed');
  }

  public async confirm(): Promise<void> {
    throw new Error('Payment already completed');
  }

  public async fail(): Promise<void> {
    throw new Error('Completed payment cannot fail');
  }

  public async refund(context: PaymentContext): Promise<void> {
    const provider = context.getProvider();
    const payment = context.getPayment();

    await provider.refundPayment(this.providerPaymentId);

    payment.status = PaymentStatus.REFUNDED;
    payment.failureReason = null;

    context.setState(new RefundedState());
  }
}
