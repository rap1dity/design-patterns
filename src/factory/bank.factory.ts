import type { PaymentFactory } from './interfaces/payment-factory.interface';
import type { PaymentProvider } from '../provider/interfaces/payment-provider.interface';
import type { PaymentState } from '../payment/interfaces/payment-state.interface';
import { BankSdk } from '../provider/sdk/bank.sdk';
import { BankAdapter } from '../provider/adapters/bank.adapter';
import { NewState } from '../payment/states/new.state';

export class BankFactory implements PaymentFactory {
  public createProvider(): PaymentProvider {
    const sdk = new BankSdk();

    return new BankAdapter(sdk);
  }

  public createInitialState(): PaymentState {
    return new NewState();
  }
}
