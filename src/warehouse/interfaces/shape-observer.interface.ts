import { ShapeEntity } from '../../entities/shape.entity';

export interface ShapeObserver<T extends ShapeEntity> {
  onShapeChanged(shape: T): void;
}
