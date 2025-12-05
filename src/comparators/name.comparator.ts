import { ShapeEntity } from '../entities/shape.entity';
import { Comparator } from '../interfaces/comparator.interface';

export class NameComparator<T extends ShapeEntity> implements Comparator<T> {
  compare(a: T, b: T): number {
    return a.name.localeCompare(b.name);
  }
}
