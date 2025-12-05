import { RectangleEntity } from '../../src/entities/rectangle.entity';
import { PointEntity } from '../../src/entities/point.entity';
import { SphereEntity } from '../../src/entities/sphere.entity';
import { Point3DEntity } from '../../src/entities/point3d.entity';
import { PointYComparator } from '../../src/comparators/point-y.comparator';

describe('PointYComparator', () => {
  test('sorts by Y coordinate of rectangle first point or sphere center', () => {
    const r1 = new RectangleEntity('r1', [
      new PointEntity(0, 10),
      new PointEntity(1, 10),
      new PointEntity(1, 11),
      new PointEntity(0, 11),
    ]);

    const r2 = new RectangleEntity('r2', [
      new PointEntity(0, -5),
      new PointEntity(1, -5),
      new PointEntity(1, -4),
      new PointEntity(0, -4),
    ]);

    const s = new SphereEntity('s', new Point3DEntity(0, 3, 0), 5);

    const items = [r1, s, r2];

    const comparator = new PointYComparator();

    const sorted = items.sort((a, b) => comparator.compare(a, b));

    expect(sorted.map(x => x.id)).toEqual(['r2', 's', 'r1']);
  });
});
