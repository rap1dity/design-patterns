export class CalculationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CalculationException';
  }
}
