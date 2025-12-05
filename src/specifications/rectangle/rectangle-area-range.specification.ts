import { RangeSpecification } from '../common/range.specification';
import { RectangleEntity } from '../../entities/rectangle.entity';
import { Warehouse } from '../../warehouse';

export class RectangleAreaRangeSpecification extends RangeSpecification<RectangleEntity> {
  constructor(min: number, max: number, private readonly warehouse: Warehouse) {
    super((rect) => warehouse.getArea(rect.id), min, max);
  }
}
