import { ShapeEntity } from '../../../src/entities/shape.entity';
import { ByIdSpecification } from '../../../src/specifications/common/by-id.specification';

class TestShape extends ShapeEntity {
  constructor(id: string, name: string = 'shape') {
    super(id, name);
  }
}

describe('ByIdSpecification', () => {
  test('returns true when IDs match', () => {
    const entity = new TestShape('123');
    const spec = new ByIdSpecification<TestShape>('123');

    expect(spec.isSatisfiedBy(entity)).toBe(true);
  });

  test('returns false when IDs do not match', () => {
    const entity = new TestShape('123');
    const spec = new ByIdSpecification<TestShape>('999');

    expect(spec.isSatisfiedBy(entity)).toBe(false);
  });

  test('works in composite: AND', () => {
    const entity = new TestShape('123');

    const spec1 = new ByIdSpecification<TestShape>('123');
    const spec2 = new ByIdSpecification<TestShape>('123');

    const combined = spec1.and(spec2);

    expect(combined.isSatisfiedBy(entity)).toBe(true);
  });

  test('works in composite: OR', () => {
    const entity = new TestShape('123');

    const spec1 = new ByIdSpecification<TestShape>('999');
    const spec2 = new ByIdSpecification<TestShape>('123');

    const combined = spec1.or(spec2);

    expect(combined.isSatisfiedBy(entity)).toBe(true);
  });

  test('works in composite: NOT', () => {
    const entity = new TestShape('123');

    const spec = new ByIdSpecification<TestShape>('123').not();

    expect(spec.isSatisfiedBy(entity)).toBe(false);
  });
});
