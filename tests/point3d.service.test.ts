import { Point3DEntity } from '../src/entities/point3d.entity';
import { Point3DService } from '../src/services/point3d.service';

describe('Point3DService', () => {
  const service = new Point3DService();

  test('calculates distance between two 3D points', () => {
    const p1 = new Point3DEntity(0, 0, 0);
    const p2 = new Point3DEntity(1, 2, 2);

    const distance = service.distance(p1, p2);

    expect(distance).toBeCloseTo(3);
    expect(distance).not.toBe(0);
  });

  test('detects point on XY plane', () => {
    const point = new Point3DEntity(5, -3, 0);

    expect(service.isOnPlaneXY(point)).toBe(true);
    expect(service.isOnPlaneXZ(point)).toBe(false);
  });

  test('detects point on XZ plane', () => {
    const point = new Point3DEntity(1, 0, 5);

    expect(service.isOnPlaneXZ(point)).toBe(true);
    expect(service.isOnPlaneYZ(point)).toBe(false);
  });

  test('detects point on YZ plane', () => {
    const point = new Point3DEntity(0, 3, 7);

    expect(service.isOnPlaneYZ(point)).toBe(true);
    expect(service.isOnPlaneXY(point)).toBe(false);
  });

  test('detects point not on any coordinate plane', () => {
    const point = new Point3DEntity(1, 2, 3);

    expect(service.isOnPlaneXY(point)).toBe(false);
    expect(service.isOnPlaneXZ(point)).toBe(false);
    expect(service.isOnPlaneYZ(point)).toBe(false);
  });
});
