import { PointService } from '../src/services/point.service';
import { PointEntity } from '../src/entities/point.entity';

describe('PointService', () => {
  const service = new PointService();

  test('calculates distance between two points', () => {
    const p1 = new PointEntity(0, 0);
    const p2 = new PointEntity(3, 4);

    const distance = service.distance(p1, p2);

    expect(distance).toBe(5);
    expect(distance).not.toBe(0);
  });

  test('detects collinear points correctly', () => {
    const p1 = new PointEntity(0, 0);
    const p2 = new PointEntity(1, 1);
    const p3 = new PointEntity(2, 2);

    expect(service.areCollinear(p1, p2, p3)).toBe(true);

    const p4 = new PointEntity(0, 1);
    expect(service.areCollinear(p1, p2, p4)).toBe(false);
  });
});
