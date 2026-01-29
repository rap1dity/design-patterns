import type { PaymentProvider } from '../../provider/interfaces/payment-provider.interface';
import type { PaymentState } from '../../payment/interfaces/payment-state.interface';

export interface PaymentFactory {
  createProvider(): PaymentProvider;

  createInitialState(): PaymentState;
}
