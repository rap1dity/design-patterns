import { RectangleEntity } from '../../src/entities/rectangle.entity';
import { SphereEntity } from '../../src/entities/sphere.entity';
import { PointEntity } from '../../src/entities/point.entity';
import { Point3DEntity } from '../../src/entities/point3d.entity';
import { PointService } from '../../src/services/point.service';
import { Point3DService } from '../../src/services/point3d.service';
import { RectangleService } from '../../src/services/rectangle.service';
import { SphereService } from '../../src/services/sphere.service';
import { RectangleObserver } from '../../src/warehouse/observers/rectangle.observer';
import { SphereObserver } from '../../src/warehouse/observers/sphere.observer';
import { RectangleResultValidator } from '../../src/validators/rectangle/rectangle-result.validator';
import { SphereResultValidator } from '../../src/validators/sphere/sphere-result.validator';
import { Warehouse } from '../../src/warehouse';

describe('Warehouse Observer Integration', () => {
  let warehouse: Warehouse;

  beforeEach(() => {
    warehouse = Warehouse.getInstance();
    (warehouse as any).rectangles.clear();
    (warehouse as any).spheres.clear();
  });

  test('rectangle updates trigger warehouse recalculation', () => {
    const rect = new RectangleEntity('r1', [
      new PointEntity(0, 0),
      new PointEntity(2, 0),
      new PointEntity(2, 1),
      new PointEntity(0, 1),
    ]);

    const pointService = new PointService();
    const validator = new RectangleResultValidator();

    const rectService = new RectangleService(pointService, validator);

    rectService.attach(
      new RectangleObserver(rectService, warehouse)
    );

    rectService.updatePoints(rect, [
      new PointEntity(0, 0),
      new PointEntity(3, 0),
      new PointEntity(3, 2),
      new PointEntity(0, 2),
    ]);

    expect(warehouse.getArea('r1')).toBeCloseTo(6);
    expect(warehouse.getPerimeter('r1')).toBeCloseTo(10);
  });

  test('sphere updates trigger warehouse recalculation', () => {
    const sphere = new SphereEntity(
      's1',
      new Point3DEntity(1, 1, 1),
      2
    );

    const point3d = new Point3DService();
    const validator = new SphereResultValidator();

    const sphereService = new SphereService(point3d, validator);

    sphereService.attach(
      new SphereObserver(sphereService, warehouse)
    );

    sphereService.updateRadius(sphere, 3);

    const expectedVolume = (4 / 3) * Math.PI * 27;
    const expectedArea = 4 * Math.PI * 9;

    expect(warehouse.getVolume('s1')).toBeCloseTo(expectedVolume);
    expect(warehouse.getSurfaceArea('s1')).toBeCloseTo(expectedArea);
  });
});
