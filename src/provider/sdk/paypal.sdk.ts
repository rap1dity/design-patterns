export class PaypalSdk {
  public async makeOrder(params: {
    total: number,
    note: string,
  }): Promise<{ orderId: string; approved: boolean }> {
    return {
      orderId: crypto.randomUUID(),
      approved: true,
    }
  }

  public async captureOrder(orderId: string): Promise<{ captured: boolean }> {
    void orderId;

    return {
      captured: true,
    };
  }

  public async refundOrder(orderId: string): Promise<{ refunded: boolean }> {
    void orderId;

    return {
      refunded: true,
    };
  }
}
