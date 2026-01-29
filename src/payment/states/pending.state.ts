import type { PaymentState } from '../interfaces/payment-state.interface';
import type { PaymentContext } from '../contexts/payment.context';
import { PaymentStatus } from '../enums/payment-status.enum';
import { CompletedState } from './completed.state';
import { FailedState } from './failed.state';

export class PendingState implements PaymentState {
  private readonly providerPaymentId: string;

  public constructor(providerPaymentId: string) {
    this.providerPaymentId = providerPaymentId;
  }

  public async create(): Promise<void> {
    throw new Error('Payment already created');
  }

  public async confirm(context: PaymentContext): Promise<void> {
    const provider = context.getProvider();
    const payment = context.getPayment();

    await provider.confirmPayment(this.providerPaymentId);

    payment.status = PaymentStatus.COMPLETED;
    payment.failureReason = null;

    context.setState(new CompletedState(this.providerPaymentId));
  }

  public async fail(context: PaymentContext, reason: string): Promise<void> {
    const payment = context.getPayment();

    payment.status = PaymentStatus.FAILED;
    payment.failureReason = reason;

    context.setState(new FailedState());
  }

  public async refund(): Promise<void> {
    throw new Error('Cannot refund pending payment');
  }
}
