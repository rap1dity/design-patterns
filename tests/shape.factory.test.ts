import { ShapeFactory } from '../src/factories/shape.factory';
import { InvalidDataException } from '../src/exceptions/invalid-data.exception';

describe('ShapeFactory', () => {
  const factory = new ShapeFactory();

  test('creates valid RectangleEntity', () => {
    const rectangle = factory.createRectangleFromLine('R1 0 0 5 0 5 3 0 3');

    expect(rectangle.id).toBe('R1');
    expect(rectangle.points.length).toBe(4);
  });

  test('throws exception on invalid input', () => {
    expect(() =>
      factory.createRectangleFromLine('R1 0 0 5 a 5 3 0 3'),
    ).toThrow(InvalidDataException);

    expect(() =>
      factory.createRectangleFromLine('R1 0 0'),
    ).toThrow();
  });
});
