import { PaymentStatus } from '../enums/payment-status.enum';
import type { PaymentData } from '../types/payment-data.type';

export class Payment {
  public readonly id: string;
  public readonly data: PaymentData;
  public status: PaymentStatus;
  public failureReason: string | null;

  public constructor(params: { id: string; data: PaymentData }) {
    this.id = params.id;
    this.data = params.data;

    this.status = PaymentStatus.NEW;
    this.failureReason = null;
  }
}
