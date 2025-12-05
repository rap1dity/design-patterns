import { RangeSpecification } from '../common/range.specification';
import { RectangleEntity } from '../../entities/rectangle.entity';

export class RectangleDistanceRangeSpecification extends RangeSpecification<RectangleEntity> {
  constructor(min: number, max: number) {
    super(
      (rect) => {
        const point = rect.points[0];

        if (!point) {
          return undefined;
        }

        return Math.sqrt(point.x * point.x + point.y * point.y);
      },
      min,
      max,
    );
  }
}
