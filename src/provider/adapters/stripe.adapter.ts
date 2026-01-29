import type { PaymentProvider } from '../interfaces/payment-provider.interface';
import type { PaymentData } from '../../payment/types/payment-data.type';
import { StripeSdk } from '../sdk/stripe.sdk';

export class StripeAdapter implements PaymentProvider {
  private readonly sdk: StripeSdk;

  public constructor(sdk: StripeSdk) {
    this.sdk = sdk;
  }

  public async createPayment(data: PaymentData): Promise<string> {
    const result = await this.sdk.createIntent({
      amountCents: data.amount * 100,
      metadata: data.description,
    });

    if (result.status === 'failed') {
      throw new Error('Stripe intent creation failed');
    }

    return result.id;
  }

  public async confirmPayment(paymentId: string): Promise<void> {
    const result = await this.sdk.confirmIntent(paymentId);

    if (result.status !== 'succeeded') {
      throw new Error('Stripe payment confirmation failed');
    }
  }

  public async refundPayment(paymentId: string): Promise<void> {
    const result = await this.sdk.cancelIntent(paymentId);

    if (!result.canceled) {
      throw new Error('Stripe refund failed');
    }
  }
}
