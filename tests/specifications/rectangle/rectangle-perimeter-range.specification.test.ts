import { Warehouse } from '../../../src/warehouse';
import { RectangleEntity } from '../../../src/entities/rectangle.entity';
import { PointEntity } from '../../../src/entities/point.entity';
import {
  RectanglePerimeterRangeSpecification
} from '../../../src/specifications/rectangle/rectangle-perimeter-range.specification';

describe('RectanglePerimeterRangeSpecification', () => {
  let warehouse: Warehouse;

  beforeEach(() => {
    warehouse = Warehouse.getInstance();
    (warehouse as any).rectangles.clear();
  });

  test('returns true when perimeter is inside range', () => {
    const rect = new RectangleEntity('r1', [
      new PointEntity(0, 0),
      new PointEntity(4, 0),
      new PointEntity(4, 3),
      new PointEntity(0, 3),
    ]);

    warehouse.updateRectangle('r1', { area: 12, perimeter: 14 });

    const spec = new RectanglePerimeterRangeSpecification(10, 20, warehouse);

    expect(spec.isSatisfiedBy(rect)).toBe(true);
  });

  test('returns false when perimeter is outside range', () => {
    const rect = new RectangleEntity('r1', [
      new PointEntity(0, 0),
      new PointEntity(4, 0),
      new PointEntity(4, 3),
      new PointEntity(0, 3),
    ]);

    warehouse.updateRectangle('r1', { area: 12, perimeter: 14 });

    const spec = new RectanglePerimeterRangeSpecification(0, 10, warehouse);

    expect(spec.isSatisfiedBy(rect)).toBe(false);
  });
});
