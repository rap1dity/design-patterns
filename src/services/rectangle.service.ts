import { RectangleEntity } from '../entities/rectangle.entity';
import { PointEntity } from '../entities/point.entity';
import { PointService } from './point.service';
import { RectangleResultValidator } from '../validators/rectangle/rectangle-result.validator';

export class RectangleService {
  constructor(
    private readonly pointService: PointService,
    private readonly resultValidator: RectangleResultValidator
  ) {}

  isValid(rectangle: RectangleEntity): boolean {
    const { points } = rectangle;

    if (points.length !== 4) {
      return false;
    }

    return this.isConvex(rectangle) && this.hasRightAngles(rectangle);
  }

  getArea(rectangle: RectangleEntity): number {
    if (!this.isValid(rectangle)) {
      return 0;
    }

    const [A, B, C] = rectangle.points;
    const area = this.pointService.distance(A, B) * this.pointService.distance(B, C);

    this.resultValidator.validateArea(area);

    return area;
  }

  getPerimeter(rectangle: RectangleEntity): number {
    if (!this.isValid(rectangle)) {
      return 0;
    }

    const [A, B, C] = rectangle.points;
    const perimeter = 2 * (this.pointService.distance(A, B) + this.pointService.distance(B, C));

    this.resultValidator.validatePerimeter(perimeter);

    return perimeter;
  }

  isSquare(rectangle: RectangleEntity): boolean {
    if (!this.isValid(rectangle)) {
      return false;
    }

    const [A, B, C] = rectangle.points;
    return Math.abs(this.pointService.distance(A, B) - this.pointService.distance(B, C)) < 1e-9;
  }

  isRhombus(rectangle: RectangleEntity): boolean {
    if (!this.isValid(rectangle)) {
      return false;
    }

    const [A, B, C, D] = rectangle.points;
    const ab = this.pointService.distance(A, B);
    const bc = this.pointService.distance(B, C);
    const cd = this.pointService.distance(C, D);
    const da = this.pointService.distance(D, A);

    return (
      Math.abs(ab - bc) < 1e-9 &&
      Math.abs(bc - cd) < 1e-9 &&
      Math.abs(cd - da) < 1e-9
    );
  }

  isTrapezoid(rectangle: RectangleEntity): boolean {
    const { points } = rectangle;

    const vectors = [
      { x: points[1].x - points[0].x, y: points[1].y - points[0].y },
      { x: points[2].x - points[1].x, y: points[2].y - points[1].y },
      { x: points[3].x - points[2].x, y: points[3].y - points[2].y },
      { x: points[0].x - points[3].x, y: points[0].y - points[3].y },
    ];

    const isParallel = (v1: { x: number; y: number }, v2: { x: number; y: number }): boolean =>
      Math.abs(v1.x * v2.y - v1.y * v2.x) < 1e-9;

    const pair1 = isParallel(vectors[0], vectors[2]);
    const pair2 = isParallel(vectors[1], vectors[3]);

    return (pair1 && !pair2) || (!pair1 && pair2);
  }

  isConvex(rectangle: RectangleEntity): boolean {
    const { points } = rectangle;

    const cross = (a: PointEntity, b: PointEntity, c: PointEntity): number =>
      (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);

    const signs = points.map((p, i) => {
      const next = points[(i + 1) % 4];
      const nextNext = points[(i + 2) % 4];
      return Math.sign(cross(p, next, nextNext));
    });

    return signs.every((s) => s === signs[0]);
  }

  hasRightAngles(rectangle: RectangleEntity): boolean {
    const { points } = rectangle;

    const dot = (p1: PointEntity, p2: PointEntity, p3: PointEntity): number => {
      const v1x = p2.x - p1.x;
      const v1y = p2.y - p1.y;
      const v2x = p3.x - p2.x;
      const v2y = p3.y - p2.y;
      return v1x * v2x + v1y * v2y;
    };

    return Math.abs(dot(points[0], points[1], points[2])) < 1e-9;
  }

  intersectsOnlyOneAxis(rectangle: RectangleEntity, distance: number): boolean {
    const { points } = rectangle;

    const intersectsX = points.some((p) => Math.abs(p.y) <= distance);
    const intersectsY = points.some((p) => Math.abs(p.x) <= distance);

    return (intersectsX && !intersectsY) || (!intersectsX && intersectsY);
  }
}
