export class StripeSdk {
  public async createIntent(params: {
    amountCents: number
    metadata: string
  }): Promise<{ id: string; status: 'requires_confirmation' | 'failed' }> {
    return {
      id: crypto.randomUUID(),
      status: 'requires_confirmation',
    };
  }

  public async confirmIntent(id: string): Promise<{ status: 'succeeded' | 'failed' }> {
    void id;

    return {
      status: 'succeeded',
    };
  }

  public async cancelIntent(id: string): Promise<{ canceled: boolean }> {
    void id;

    return {
      canceled: true,
    };
  }
}
