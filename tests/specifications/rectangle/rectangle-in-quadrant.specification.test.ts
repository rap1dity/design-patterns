import { RectangleEntity } from '../../../src/entities/rectangle.entity';
import { PointEntity } from '../../../src/entities/point.entity';
import {
  RectangleInQuadrantSpecification
} from '../../../src/specifications/rectangle/rectangle-in-quadrant.specification';
import { Quadrant2D } from '../../../src/specifications/enums/quadrant-2d.enum';

describe('RectangleInQuadrantSpecification', () => {
  test('returns true when all points are in Quadrant I', () => {
    const rect = new RectangleEntity('r1', [
      new PointEntity(1, 1),
      new PointEntity(4, 1),
      new PointEntity(4, 3),
      new PointEntity(1, 3),
    ]);

    const spec = new RectangleInQuadrantSpecification(Quadrant2D.I);

    expect(spec.isSatisfiedBy(rect)).toBe(true);
  });

  test('returns false when at least one point is outside quadrant', () => {
    const rect = new RectangleEntity('r1', [
      new PointEntity(1, 1),
      new PointEntity(-4, 1),
      new PointEntity(4, 3),
      new PointEntity(1, 3),
    ]);

    const spec = new RectangleInQuadrantSpecification(Quadrant2D.I);

    expect(spec.isSatisfiedBy(rect)).toBe(false);
  });

  test('correctly validates Quadrant II', () => {
    const rect = new RectangleEntity('r1', [
      new PointEntity(-2, 3),
      new PointEntity(-5, 3),
      new PointEntity(-5, 7),
      new PointEntity(-2, 7),
    ]);

    const spec = new RectangleInQuadrantSpecification(Quadrant2D.II);

    expect(spec.isSatisfiedBy(rect)).toBe(true);
  });
});
