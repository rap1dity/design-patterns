import { ShapeEntity } from '../entities/shape.entity';
import { Comparator } from '../interfaces/comparator.interface';
import { RectangleEntity } from '../entities/rectangle.entity';
import { SphereEntity } from '../entities/sphere.entity';

export class PointXComparator<T extends ShapeEntity> implements Comparator<T> {
  compare(a: T, b: T): number {
    const ax = this.extractX(a);
    const bx = this.extractX(b);

    return ax - bx;
  }

  private extractX(entity: ShapeEntity): number {
    if (entity instanceof RectangleEntity) {
      return entity.points[0].x;
    }

    if (entity instanceof SphereEntity) {
      return entity.center.x;
    }

    throw new Error(`Unsupported entity type: ${entity.name}`);
  }
}
