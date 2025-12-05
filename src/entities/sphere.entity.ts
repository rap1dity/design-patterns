import { Point3DEntity } from './point3d.entity';
import { ShapeEntity } from './shape.entity';

export class SphereEntity extends ShapeEntity {
  constructor(
    id: string,
    public center: Point3DEntity,
    public radius: number,
  ) {
    super(id, 'sphere');
  }
}
