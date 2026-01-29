import type { PaymentProvider } from '../../provider/interfaces/payment-provider.interface';
import type { PaymentData } from '../types/payment-data.type';
import type { PaymentState } from '../interfaces/payment-state.interface';
import { Payment } from '../entities/payment.entity';

export class PaymentContext {
  private state: PaymentState
  private readonly provider: PaymentProvider;
  private readonly payment: Payment;

  public constructor(params: {
    provider: PaymentProvider,
    state: PaymentState,
    paymentId: string,
  }) {
    this.provider = params.provider;
    this.state = params.state;
    this.payment = new Payment({
      id: params.paymentId,
      data: {
        amount: 0,
        currency: '',
        description: '',
      },
    })
  }

  public async create(data: PaymentData): Promise<void> {
    this.payment.data.amount = data.amount;
    this.payment.data.currency = data.currency;
    this.payment.data.description = data.description;

    await this.state.create(this, data);
  }

  public async confirm(): Promise<void> {
    await this.state.confirm(this);
  }

  public async fail(reason: string): Promise<void> {
    await this.state.fail(this, reason);
  }

  public async refund(): Promise<void> {
    await this.state.refund(this);
  }

  public setState(state: PaymentState): void {
    this.state = state;
  }

  public getProvider(): PaymentProvider {
    return this.provider;
  }

  public getPayment(): Payment {
    return this.payment;
  }
}
