import { ShapeEntity } from '../entities/shape.entity';
import { Comparator } from '../interfaces/comparator.interface';
import { RectangleEntity } from '../entities/rectangle.entity';
import { SphereEntity } from '../entities/sphere.entity';

export class DistanceComparator<T extends ShapeEntity> implements Comparator<T> {
  compare(a: T, b: T): number {
    const da = this.distance(a);
    const db = this.distance(b);

    return da - db;
  }

  private distance(entity: ShapeEntity): number {
    if (entity instanceof RectangleEntity) {
      const p = entity.points[0];

      return Math.sqrt(p.x * p.x + p.y * p.y);
    }

    if (entity instanceof SphereEntity) {
      const c = entity.center;

      return Math.sqrt(c.x * c.x + c.y * c.y + c.z * c.z);
    }

    throw new Error(`Unsupported entity type: ${entity.name}`);
  }
}
