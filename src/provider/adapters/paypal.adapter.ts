import type { PaymentProvider } from '../interfaces/payment-provider.interface';
import type { PaymentData } from '../../payment/types/payment-data.type';
import { PaypalSdk } from '../sdk/paypal.sdk';

export class PaypalAdapter implements PaymentProvider {
  private readonly sdk: PaypalSdk;

  public constructor(sdk: PaypalSdk) {
    this.sdk = sdk;
  }

  public async createPayment(data: PaymentData): Promise<string> {
    const result = await this.sdk.makeOrder({
      total: data.amount,
      note: data.description,
    });

    if (!result.approved) {
      throw new Error('PayPal order was not approved');
    }

    return result.orderId;
  }

  public async confirmPayment(paymentId: string): Promise<void> {
    const result = await this.sdk.captureOrder(paymentId);

    if (!result.captured) {
      throw new Error('PayPal capture failed');
    }
  }

  public async refundPayment(paymentId: string): Promise<void> {
    const result = await this.sdk.refundOrder(paymentId);

    if (!result.refunded) {
      throw new Error('PayPal refund failed');
    }
  }
}
