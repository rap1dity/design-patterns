import { ShapeEntity } from '../entities/shape.entity';
import { Comparator } from '../interfaces/comparator.interface';
import { RectangleEntity } from '../entities/rectangle.entity';
import { SphereEntity } from '../entities/sphere.entity';

export class PointYComparator<T extends ShapeEntity> implements Comparator<T> {
  compare(a: T, b: T): number {
    const ay = this.extractY(a);
    const by = this.extractY(b);

    return ay - by;
  }

  private extractY(entity: ShapeEntity): number {
    if (entity instanceof RectangleEntity) {
      return entity.points[0].y;
    }

    if (entity instanceof SphereEntity) {
      return entity.center.y;
    }

    throw new Error(`Unsupported entity type: ${entity.name}`);
  }
}
