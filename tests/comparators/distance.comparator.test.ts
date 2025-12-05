import { RectangleEntity } from '../../src/entities/rectangle.entity';
import { PointEntity } from '../../src/entities/point.entity';
import { SphereEntity } from '../../src/entities/sphere.entity';
import { Point3DEntity } from '../../src/entities/point3d.entity';
import { DistanceComparator } from '../../src/comparators/distance.comparator';

describe('DistanceComparator', () => {
  test('sorts shapes by distance from origin', () => {
    const nearRect = new RectangleEntity('r1', [
      new PointEntity(1, 1),
      new PointEntity(2, 1),
      new PointEntity(2, 2),
      new PointEntity(1, 2),
    ]);

    const sphere = new SphereEntity('s1', new Point3DEntity(3, 4, 0), 5);

    const farRect = new RectangleEntity('r2', [
      new PointEntity(10, 10),
      new PointEntity(11, 10),
      new PointEntity(11, 11),
      new PointEntity(10, 11),
    ]);

    const items = [sphere, farRect, nearRect];

    const comparator = new DistanceComparator();

    const sorted = items.sort((a, b) => comparator.compare(a, b));

    expect(sorted.map(x => x.id)).toEqual(['r1', 's1', 'r2']);
  });
});
