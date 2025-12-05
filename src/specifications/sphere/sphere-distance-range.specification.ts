import { RangeSpecification } from '../common/range.specification';
import { SphereEntity } from '../../entities/sphere.entity';

export class SphereDistanceRangeSpecification extends RangeSpecification<SphereEntity> {
  constructor(min: number, max: number) {
    super(
      (sphere) => {
        const { x, y, z } = sphere.center;

        return Math.sqrt(x * x + y * y + z * z);
      },
      min,
      max,
    );
  }
}
