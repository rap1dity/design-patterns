import { PaypalFactory } from './factory/paypal.factory';
import { StripeFactory } from './factory/stripe.factory';
import { BankFactory } from './factory/bank.factory';
import type { PaymentFactory } from './factory/interfaces/payment-factory.interface';
import { PaymentContext } from './payment/contexts/payment.context';
import { PaymentStatus } from './payment/enums/payment-status.enum';

type ProviderType = 'paypal' | 'stripe' | 'bank';

function resolveFactory(type: ProviderType): PaymentFactory {
  if (type === 'paypal') {
    return new PaypalFactory();
  }

  if (type === 'stripe') {
    return new StripeFactory();
  }

  return new BankFactory();
}

async function run(): Promise<void> {
  const providerType: ProviderType = 'stripe';

  console.log('Selected provider:', providerType);

  const factory = resolveFactory(providerType);
  const provider = factory.createProvider();
  const initialState = factory.createInitialState();

  const context = new PaymentContext({
    provider,
    state: initialState,
    paymentId: crypto.randomUUID(),
  });

  console.log('Initial payment status:', context.getPayment().status);

  await context.create({
    amount: 100,
    currency: 'USD',
    description: 'Course payment',
  });

  console.log('Status after create:', context.getPayment().status);

  await context.confirm();

  console.log('Status after confirm:', context.getPayment().status);

  if (context.getPayment().status === PaymentStatus.COMPLETED) {
    await context.refund();

    console.log('Status after refund:', context.getPayment().status);
  }
}

run().catch((error: unknown) => {
  if (error instanceof Error) {
    console.error('Payment flow failed:', error.message);
    return;
  }

  console.error('Payment flow failed with unknown error');
});
