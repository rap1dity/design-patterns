import { RectangleService } from '../src/services/rectangle.service';
import { RectangleEntity } from '../src/entities/rectangle.entity';
import { PointEntity } from '../src/entities/point.entity';
import { PointService } from '../src/services/point.service';
import { RectangleResultValidator } from '../src/validators/rectangle/rectangle-result.validator';

describe('RectangleService', () => {
  const pointService = new PointService();
  const rectangleResultValidator = new RectangleResultValidator();
  const service = new RectangleService(pointService, rectangleResultValidator);

  const rectangle = new RectangleEntity('R1', [
    new PointEntity(0, 0),
    new PointEntity(5, 0),
    new PointEntity(5, 3),
    new PointEntity(0, 3),
  ]);

  test('calculates area and perimeter correctly', () => {
    const area = service.getArea(rectangle);
    const perimeter = service.getPerimeter(rectangle);

    expect(area).toBe(15);
    expect(perimeter).toBe(16);
  });

  test('determines square and rhombus correctly for square', () => {
    const square = new RectangleEntity('S1', [
      new PointEntity(0, 0),
      new PointEntity(3, 0),
      new PointEntity(3, 3),
      new PointEntity(0, 3),
    ]);

    expect(service.isSquare(square)).toBe(true);
    expect(service.isRhombus(square)).toBe(true);
  });

  test('rectangle is not a strict trapezoid', () => {
    expect(service.isTrapezoid(rectangle)).toBe(false);
    expect(service.isTrapezoid(rectangle)).not.toBe(true);
  });

  test('validates convex property for normal rectangle', () => {
    expect(service.isConvex(rectangle)).toBe(true);
    expect(service.isValid(rectangle)).toBe(true);
  });

  test('checks axis intersection correctly', () => {
    const axisRect = new RectangleEntity('AX0', [
      new PointEntity(-1, 0),
      new PointEntity(1, 0),
      new PointEntity(1, 2),
      new PointEntity(-1, 2),
    ]);

    expect(service.intersectsOnlyOneAxis(axisRect, 0)).toBe(true);
    expect(service.intersectsOnlyOneAxis(rectangle, 0)).toBe(false);
  });

  test('detects invalid rectangle with collinear points', () => {
    const invalidRectangle = new RectangleEntity('INV', [
      new PointEntity(0, 0),
      new PointEntity(1, 1),
      new PointEntity(2, 2),
      new PointEntity(0, 2),
    ]);

    expect(service.isValid(invalidRectangle)).toBe(false);
    expect(service.isConvex(invalidRectangle)).toBe(false);
  });

  test('detects non-rhombus and non-square correctly', () => {
    const nonRhombus = new RectangleEntity('NR', [
      new PointEntity(0, 0),
      new PointEntity(4, 0),
      new PointEntity(4, 2),
      new PointEntity(0, 2),
    ]);

    expect(service.isRhombus(nonRhombus)).toBe(false);
    expect(service.isSquare(nonRhombus)).toBe(false);
  });

  test('intersects only one axis returns false for offset rectangle', () => {
    const offsetRectangle = new RectangleEntity('OFF', [
      new PointEntity(2, 2),
      new PointEntity(5, 2),
      new PointEntity(5, 5),
      new PointEntity(2, 5),
    ]);

    expect(service.intersectsOnlyOneAxis(offsetRectangle, 0)).toBe(false);
    expect(service.intersectsOnlyOneAxis(offsetRectangle, 1)).toBe(false);
  });

  test('handles degenerate quadrilateral as non-convex and invalid', () => {
    const degenerate = new RectangleEntity('D1', [
      new PointEntity(0, 0),
      new PointEntity(2, 0),
      new PointEntity(1, 0),
      new PointEntity(0, 2),
    ]);

    expect(service.isConvex(degenerate)).toBe(false);
    expect(service.isValid(degenerate)).toBe(false);
  });

  test('handles rectangle with incorrect number of points', () => {
    const badRectangle = new RectangleEntity('BAD', [
      new PointEntity(0, 0),
      new PointEntity(1, 1),
      new PointEntity(2, 2),
    ]);

    expect(service.isValid(badRectangle)).toBe(false);
  });

  test('handles rectangle with NaN coordinates', () => {
    const nanRectangle = new RectangleEntity('NAN', [
      new PointEntity(NaN, 0),
      new PointEntity(1, 0),
      new PointEntity(1, 1),
      new PointEntity(0, 1),
    ]);

    expect(service.isValid(nanRectangle)).toBe(false);
  });

  test('returns false for square and rhombus if rectangle is invalid', () => {
    const invalidRectangle = new RectangleEntity('BAD2', [
      new PointEntity(0, 0),
      new PointEntity(1, 1),
      new PointEntity(2, 2),
      new PointEntity(3, 3),
    ]);

    expect(service.isSquare(invalidRectangle)).toBe(false);
    expect(service.isRhombus(invalidRectangle)).toBe(false);
  });

  test('isTrapezoid handles invalid rectangle safely', () => {
    const invalidRectangle = new RectangleEntity('T1', [
      new PointEntity(0, 0),
      new PointEntity(0, 0),
      new PointEntity(0, 0),
      new PointEntity(0, 0),
    ]);

    expect(service.isTrapezoid(invalidRectangle)).toBe(false);
  });

  test('returns 0 area and perimeter for invalid rectangle', () => {
    const invalidRectangle = new RectangleEntity('BAD3', [
      new PointEntity(0, 0),
      new PointEntity(1, 1),
      new PointEntity(2, 2),
      new PointEntity(3, 3),
    ]);

    expect(service.getArea(invalidRectangle)).toBe(0);
    expect(service.getPerimeter(invalidRectangle)).toBe(0);
  });
});
