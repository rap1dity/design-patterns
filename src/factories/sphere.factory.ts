import { SphereEntity } from '../entities/sphere.entity';
import { Point3DEntity } from '../entities/point3d.entity';
import { SphereLineValidator } from '../validators/sphere/sphere-line.validator';

export class SphereFactory {
  private readonly validator = new SphereLineValidator();

  createFromLine(line: string): SphereEntity {
    this.validator.validate(line);

    const [id, x, y, z, r] = line.trim().split(/\s+/);

    return new SphereEntity(
      id,
      new Point3DEntity(+x, +y, +z),
      +r,
    );
  }
}
