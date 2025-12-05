import { AbstractSpecification } from '../base/abstract-specification.base';

export class RangeSpecification<T> extends AbstractSpecification<T> {
  constructor(
    private readonly selector: (entity: T) => number | undefined,
    private readonly min: number,
    private readonly max: number,
  ) {
    super();

    if (min > max) {
      throw new Error(`Invalid range: min (${min}) cannot be greater than max (${max})`);
    }
  }

  isSatisfiedBy(entity: T): boolean {
    const value = this.selector(entity);

    if (value === undefined || Number.isNaN(value)) {
      return false;
    }

    return value >= this.min && value <= this.max;
  }
}
