import { AbstractSpecification } from '../base/abstract-specification.base';
import { RectangleEntity } from '../../entities/rectangle.entity';
import { Quadrant2D } from '../enums/quadrant-2d.enum';

export class RectangleInQuadrantSpecification extends AbstractSpecification<RectangleEntity> {
  constructor(private readonly quadrant: Quadrant2D) {
    super();
  }

  isSatisfiedBy(rect: RectangleEntity): boolean {
    return rect.points.every((p) => {
      switch (this.quadrant) {
        case Quadrant2D.I:
          return p.x > 0 && p.y > 0;
        case Quadrant2D.II:
          return p.x < 0 && p.y > 0;
        case Quadrant2D.III:
          return p.x < 0 && p.y < 0;
        case Quadrant2D.IV:
          return p.x > 0 && p.y < 0;
      }
    });
  }
}
