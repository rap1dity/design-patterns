export class BankSdk {
  public async issueInvoice(sum: number, currency: string): Promise<{ invoiceId: string }> {
    void currency;

    return {
      invoiceId: crypto.randomUUID(),
    };
  }

  public async markPaid(invoiceId: string): Promise<'PAID' | 'REJECTED'> {
    void invoiceId;

    return 'PAID';
  }

  public async rollback(invoiceId: string): Promise<'ROLLED_BACK' | 'FAILED'> {
    void invoiceId;

    return 'ROLLED_BACK';
  }
}
