import { Warehouse } from '../../../src/warehouse';
import { SphereEntity } from '../../../src/entities/sphere.entity';
import { Point3DEntity } from '../../../src/entities/point3d.entity';
import { SphereSurfaceRangeSpecification } from '../../../src/specifications/sphere/sphere-surface-range.specification';

describe('SphereSurfaceRangeSpecification', () => {
  let warehouse: Warehouse;

  beforeEach(() => {
    warehouse = Warehouse.getInstance();
    (warehouse as any).spheres.clear();
  });

  test('returns true when surfaceArea is inside range', () => {
    const sphere = new SphereEntity('s1', new Point3DEntity(0, 0, 0), 5);

    warehouse.updateSphere('s1', { volume: 100, surfaceArea: 300 });

    const spec = new SphereSurfaceRangeSpecification(100, 400, warehouse);

    expect(spec.isSatisfiedBy(sphere)).toBe(true);
  });

  test('returns false when surfaceArea is outside range', () => {
    const sphere = new SphereEntity('s1', new Point3DEntity(0, 0, 0), 5);

    warehouse.updateSphere('s1', { volume: 100, surfaceArea: 300 });

    const spec = new SphereSurfaceRangeSpecification(0, 200, warehouse);

    expect(spec.isSatisfiedBy(sphere)).toBe(false);
  });
});
