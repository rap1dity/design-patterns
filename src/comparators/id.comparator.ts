import { ShapeEntity } from '../entities/shape.entity';
import { Comparator } from '../interfaces/comparator.interface';

export class IdComparator<T extends ShapeEntity> implements Comparator<T> {
  compare(a: T, b: T): number {
    return a.id.localeCompare(b.id);
  }
}
