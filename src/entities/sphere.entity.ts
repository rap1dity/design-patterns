import { Point3DEntity } from './point3d.entity';

export class SphereEntity {
  constructor(
    readonly id: string,
    readonly center: Point3DEntity,
    readonly radius: number,
  ) {}
}
