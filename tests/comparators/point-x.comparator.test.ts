import { RectangleEntity } from '../../src/entities/rectangle.entity';
import { PointEntity } from '../../src/entities/point.entity';
import { SphereEntity } from '../../src/entities/sphere.entity';
import { Point3DEntity } from '../../src/entities/point3d.entity';
import { PointXComparator } from '../../src/comparators/point-x.comparator';

describe('PointXComparator', () => {
  test('compares Rectangle and Sphere based on X coordinate', () => {
    const rect = new RectangleEntity('r', [
      new PointEntity(5, 0),
      new PointEntity(6, 0),
      new PointEntity(6, 1),
      new PointEntity(5, 1),
    ]);

    const sphere = new SphereEntity('s', new Point3DEntity(1, 0, 0), 10);

    const anotherRect = new RectangleEntity('r2', [
      new PointEntity(-3, 2),
      new PointEntity(-3, 3),
      new PointEntity(-2, 3),
      new PointEntity(-2, 2),
    ]);

    const items = [rect, sphere, anotherRect];

    const comparator = new PointXComparator();

    const sorted = items.sort((a, b) => comparator.compare(a, b));

    expect(sorted.map(s => s.id)).toEqual(['r2', 's', 'r']);
  });
});
