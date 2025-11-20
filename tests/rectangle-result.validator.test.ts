import { RectangleResultValidator } from '../src/validators/rectangle/rectangle-result.validator';

describe('RectangleResultValidator', () => {
  const validator = new RectangleResultValidator();

  test('accepts valid area and perimeter', () => {
    expect(() => validator.validateArea(10)).not.toThrow();
    expect(() => validator.validatePerimeter(20)).not.toThrow();
  });

  test('throws exception for invalid area', () => {
    expect(() => validator.validateArea(0)).toThrow();
    expect(() => validator.validateArea(-5)).toThrow();
  });

  test('throws exception for invalid perimeter', () => {
    expect(() => validator.validatePerimeter(NaN)).toThrow();
    expect(() => validator.validatePerimeter(-10)).toThrow();
  });
});
