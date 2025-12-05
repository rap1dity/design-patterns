import { RangeSpecification } from '../common/range.specification';
import { SphereEntity } from '../../entities/sphere.entity';
import { Warehouse } from '../../warehouse';

export class SphereVolumeRangeSpecification extends RangeSpecification<SphereEntity> {
  constructor(min: number, max: number, warehouse: Warehouse) {
    super((sphere) => warehouse.getVolume(sphere.id), min, max);
  }
}
