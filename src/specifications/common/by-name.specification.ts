import { AbstractSpecification } from '../base/abstract-specification.base';
import { ShapeEntity } from '../../entities/shape.entity';

export class ByNameSpecification<T extends ShapeEntity> extends AbstractSpecification<T> {
  constructor(private readonly name: string) {
    super();
  }

  isSatisfiedBy(entity: T): boolean {
    return entity.name === this.name;
  }
}
