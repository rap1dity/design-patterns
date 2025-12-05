import { AbstractSpecification } from '../base/abstract-specification.base';
import { SphereEntity } from '../../entities/sphere.entity';
import { Octant3D } from '../enums/octant-3d.enum';

export class SphereInOctantSpecification extends AbstractSpecification<SphereEntity> {
  constructor(private readonly octant: Octant3D) {
    super();
  }

  isSatisfiedBy(sphere: SphereEntity): boolean {
    const { x, y, z } = sphere.center;

    switch (this.octant) {
      case Octant3D.I:    return x > 0 && y > 0 && z > 0;
      case Octant3D.II:   return x < 0 && y > 0 && z > 0;
      case Octant3D.III:  return x < 0 && y < 0 && z > 0;
      case Octant3D.IV:   return x > 0 && y < 0 && z > 0;
      case Octant3D.V:    return x > 0 && y > 0 && z < 0;
      case Octant3D.VI:   return x < 0 && y > 0 && z < 0;
      case Octant3D.VII:  return x < 0 && y < 0 && z < 0;
      case Octant3D.VIII: return x > 0 && y < 0 && z < 0;
    }
  }
}
