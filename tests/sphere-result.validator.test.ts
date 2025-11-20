import { SphereResultValidator } from '../src/validators/sphere/sphere-result.validator';

describe('SphereResultValidator', () => {
  const validator = new SphereResultValidator();

  test('accepts valid values', () => {
    expect(() => validator.validateSurfaceArea(50)).not.toThrow();
    expect(() => validator.validateVolume(100)).not.toThrow();
  });

  test('throws exception for invalid surface area', () => {
    expect(() => validator.validateSurfaceArea(0)).toThrow();
    expect(() => validator.validateSurfaceArea(-10)).toThrow();
  });

  test('throws exception for invalid volume', () => {
    expect(() => validator.validateVolume(NaN)).toThrow();
    expect(() => validator.validateVolume(-20)).toThrow();
  });
});
