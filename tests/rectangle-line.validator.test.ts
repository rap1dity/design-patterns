import { RectangleLineValidator } from '../src/validators/rectangle/rectangle-line.validator';
import { InvalidDataException } from '../src/exceptions/invalid-data.exception';

describe('RectangleLineValidator', () => {
  const validator = new RectangleLineValidator();

  test('accepts correct line format', () => {
    expect(() =>
      validator.validate(['R1', '0', '0', '5', '0', '5', '3', '0', '3']),
    ).not.toThrow();

    expect(true).toBe(true);
  });

  test('rejects invalid coordinate', () => {
    expect(() =>
      validator.validate(['R1', '0', '0', '5', 'a', '5', '3', '0', '3']),
    ).toThrow(InvalidDataException);

    expect(() =>
      validator.validate(['R1']),
    ).toThrow();
  });
});
