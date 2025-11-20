import { CalculationException } from '../src/exceptions/calculation.exception';

describe('CalculationException', () => {
  test('creates exception with correct name and message', () => {
    const error = new CalculationException('Test error');

    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('CalculationException');
    expect(error.message).toBe('Test error');
  });
});
