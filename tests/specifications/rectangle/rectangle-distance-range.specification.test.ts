import { RectangleEntity } from '../../../src/entities/rectangle.entity';
import { PointEntity } from '../../../src/entities/point.entity';
import {
  RectangleDistanceRangeSpecification
} from '../../../src/specifications/rectangle/rectangle-distance-range.specification';

describe('RectangleDistanceRangeSpecification', () => {
  test('returns true when distance of the first point is inside range', () => {
    const rect = new RectangleEntity('r1', [
      new PointEntity(3, 4),
      new PointEntity(4, 4),
      new PointEntity(4, 6),
      new PointEntity(3, 6),
    ]);

    const spec = new RectangleDistanceRangeSpecification(4, 6);

    expect(spec.isSatisfiedBy(rect)).toBe(true);
  });

  test('returns false when distance is outside range', () => {
    const rect = new RectangleEntity('r1', [
      new PointEntity(10, 10),
      new PointEntity(11, 10),
      new PointEntity(11, 11),
      new PointEntity(10, 11),
    ]);

    const spec = new RectangleDistanceRangeSpecification(0, 5);

    expect(spec.isSatisfiedBy(rect)).toBe(false);
  });
});
