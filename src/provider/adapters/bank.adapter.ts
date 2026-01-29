import type { PaymentProvider } from '../interfaces/payment-provider.interface';
import type { PaymentData } from '../../payment/types/payment-data.type';
import { BankSdk } from '../sdk/bank.sdk';

export class BankAdapter implements PaymentProvider {
  private readonly sdk: BankSdk;

  public constructor(sdk: BankSdk) {
    this.sdk = sdk;
  }

  public async createPayment(data: PaymentData): Promise<string> {
    const result = await this.sdk.issueInvoice(data.amount, data.currency);

    return result.invoiceId;
  }

  public async confirmPayment(paymentId: string): Promise<void> {
    const status = await this.sdk.markPaid(paymentId);

    if (status !== 'PAID') {
      throw new Error('Bank payment was rejected');
    }
  }

  public async refundPayment(paymentId: string): Promise<void> {
    const status = await this.sdk.rollback(paymentId);

    if (status !== 'ROLLED_BACK') {
      throw new Error('Bank rollback failed');
    }
  }
}
