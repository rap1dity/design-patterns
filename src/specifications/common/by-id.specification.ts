import { AbstractSpecification } from '../base/abstract-specification.base';
import { ShapeEntity } from '../../entities/shape.entity';

export class ByIdSpecification<T extends ShapeEntity> extends AbstractSpecification<T> {
  constructor(private readonly id: string) {
    super();
  }

  isSatisfiedBy(entity: T): boolean {
    return entity.id === this.id;
  }
}
