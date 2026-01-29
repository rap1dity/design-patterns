# Design patters

## Project Overview

A TypeScript console application demonstrating payment processing with Abstract Factory, Adapter, and State patterns.

## Project Structure

```
src/
  factory/
    interfaces/
      payment-factory.interface.ts
    bank.factory.ts
    paypal.factory.ts
    stripe.factory.ts
  payment/
    contexts/
      payment.context.ts
    entities/
      payment.entity.ts
    enums/
      payment-status.enum.ts
    interfaces/
      payment-state.interface.ts
    states/
      completed.state.ts
      failed.state.ts
      new.state.ts
      pending.state.ts
      refunded.state.ts
    types/
      payment-data.type.ts
  provider/
    adapters/
      bank.adapter.ts
      paypal.adapter.ts
      stripe.adapter.ts
    interfaces/
      payment-provider.interface.ts
    sdk/
      bank.sdk.ts
      paypal.sdk.ts
      stripe.sdk.ts
  main.ts
```

## How to Run

Install dependencies:

```
npm ci
```

Build the project:

```
npm run build
```

Run the application:

```
npm run start
```
