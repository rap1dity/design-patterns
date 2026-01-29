import type { PaymentFactory } from './interfaces/payment-factory.interface';
import type { PaymentProvider } from '../provider/interfaces/payment-provider.interface';
import type { PaymentState } from '../payment/interfaces/payment-state.interface';
import { PaypalSdk } from '../provider/sdk/paypal.sdk';
import { PaypalAdapter } from '../provider/adapters/paypal.adapter';
import { NewState } from '../payment/states/new.state';

export class PaypalFactory implements PaymentFactory {
  public createProvider(): PaymentProvider {
    const sdk = new PaypalSdk();

    return new PaypalAdapter(sdk);
  }

  public createInitialState(): PaymentState {
    return new NewState();
  }
}
