import { RangeSpecification } from '../common/range.specification';
import { RectangleEntity } from '../../entities/rectangle.entity';
import { Warehouse } from '../../warehouse';

export class RectanglePerimeterRangeSpecification extends RangeSpecification<RectangleEntity> {
  constructor(min: number, max: number, private readonly warehouse: Warehouse) {
    super((rect) => warehouse.getPerimeter(rect.id), min, max);
  }
}
