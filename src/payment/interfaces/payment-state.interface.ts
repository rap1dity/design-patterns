import type { PaymentContext } from '../contexts/payment.context';
import type { PaymentData } from '../types/payment-data.type';

export interface PaymentState {
  create(context: PaymentContext, data: PaymentData): Promise<void>;

  confirm(context: PaymentContext): Promise<void>;

  fail(context: PaymentContext, reason: string): Promise<void>;

  refund(context: PaymentContext): Promise<void>;
}
