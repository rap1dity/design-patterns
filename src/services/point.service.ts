import { PointEntity } from '../entities/point.entity';

export class PointService {
  distance(p1: PointEntity, p2: PointEntity): number {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;

    return Math.sqrt(dx * dx + dy * dy);
  }

  areCollinear(p1: PointEntity, p2: PointEntity, p3: PointEntity): boolean {
    const determinant =
      p1.x * (p2.y - p3.y) +
      p2.x * (p3.y - p1.y) +
      p3.x * (p1.y - p2.y);

    return Math.abs(determinant) < 1e-9;
  }
}
