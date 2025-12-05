import { ShapeEntity } from './shape.entity';
import { PointEntity } from './point.entity';

export class RectangleEntity extends ShapeEntity {
  constructor(
    id: string,
    public points: PointEntity[]
  ) {
    super(id, 'rectangle');
  }
}
