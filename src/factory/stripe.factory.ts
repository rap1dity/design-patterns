import type { PaymentFactory } from './interfaces/payment-factory.interface';
import type { PaymentProvider } from '../provider/interfaces/payment-provider.interface';
import type { PaymentState } from '../payment/interfaces/payment-state.interface';
import { StripeSdk } from '../provider/sdk/stripe.sdk';
import { StripeAdapter } from '../provider/adapters/stripe.adapter';
import { NewState } from '../payment/states/new.state';

export class StripeFactory implements PaymentFactory {
  public createProvider(): PaymentProvider {
    const sdk = new StripeSdk();

    return new StripeAdapter(sdk);
  }

  public createInitialState(): PaymentState {
    return new NewState();
  }
}
