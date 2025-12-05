import { Warehouse } from '../../../src/warehouse';
import { RectangleEntity } from '../../../src/entities/rectangle.entity';
import { PointEntity } from '../../../src/entities/point.entity';
import {
  RectangleAreaRangeSpecification
} from '../../../src/specifications/rectangle/rectangle-area-range.specification';

describe('RectangleAreaRangeSpecification', () => {
  let warehouse: Warehouse;

  beforeEach(() => {
    warehouse = Warehouse.getInstance();
    (warehouse as any).rectangles.clear();
  });

  test('returns true when area is inside range', () => {
    const rect = new RectangleEntity('r1', [
      new PointEntity(0, 0),
      new PointEntity(3, 0),
      new PointEntity(3, 2),
      new PointEntity(0, 2),
    ]);

    warehouse.updateRectangle('r1', { area: 6, perimeter: 10 });

    const spec = new RectangleAreaRangeSpecification(1, 10, warehouse);

    expect(spec.isSatisfiedBy(rect)).toBe(true);
  });

  test('returns false when area is outside range', () => {
    const rect = new RectangleEntity('r1', [
      new PointEntity(0, 0),
      new PointEntity(3, 0),
      new PointEntity(3, 2),
      new PointEntity(0, 2),
    ]);

    warehouse.updateRectangle('r1', { area: 6, perimeter: 10 });

    const spec = new RectangleAreaRangeSpecification(7, 20, warehouse);

    expect(spec.isSatisfiedBy(rect)).toBe(false);
  });
});
