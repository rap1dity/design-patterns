import type { PaymentData } from '../../payment/types/payment-data.type';

export interface PaymentProvider {
  createPayment(data: PaymentData): Promise<string>;

  confirmPayment(paymentId: string): Promise<void>;

  refundPayment(paymentId: string): Promise<void>;
}
