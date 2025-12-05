import { SphereEntity } from '../../../src/entities/sphere.entity';
import { Point3DEntity } from '../../../src/entities/point3d.entity';
import {
  SphereDistanceRangeSpecification
} from '../../../src/specifications/sphere/sphere-distance-range.specification';

describe('SphereDistanceRangeSpecification', () => {
  test('returns true when center distance from origin is inside range', () => {
    const sphere = new SphereEntity('s1', new Point3DEntity(3, 4, 0), 5);

    const spec = new SphereDistanceRangeSpecification(4, 6);

    expect(spec.isSatisfiedBy(sphere)).toBe(true);
  });

  test('returns false when distance is outside range', () => {
    const sphere = new SphereEntity('s1', new Point3DEntity(10, 10, 0), 5);

    const spec = new SphereDistanceRangeSpecification(0, 5);

    expect(spec.isSatisfiedBy(sphere)).toBe(false);
  });
});
