import { Warehouse } from '../../../src/warehouse';
import { SphereEntity } from '../../../src/entities/sphere.entity';
import { Point3DEntity } from '../../../src/entities/point3d.entity';
import { SphereVolumeRangeSpecification } from '../../../src/specifications/sphere/sphere-volume-range.specification';

describe('SphereVolumeRangeSpecification', () => {
  let warehouse: Warehouse;

  beforeEach(() => {
    warehouse = Warehouse.getInstance();
    (warehouse as any).spheres.clear();
  });

  test('returns true when volume is inside range', () => {
    const sphere = new SphereEntity('s1', new Point3DEntity(0, 0, 0), 5);

    warehouse.updateSphere('s1', { volume: 100, surfaceArea: 200 });

    const spec = new SphereVolumeRangeSpecification(90, 150, warehouse);

    expect(spec.isSatisfiedBy(sphere)).toBe(true);
  });

  test('returns false when volume is outside range', () => {
    const sphere = new SphereEntity('s1', new Point3DEntity(0, 0, 0), 5);

    warehouse.updateSphere('s1', { volume: 100, surfaceArea: 200 });

    const spec = new SphereVolumeRangeSpecification(200, 300, warehouse);

    expect(spec.isSatisfiedBy(sphere)).toBe(false);
  });
});
