import { ShapeEntity } from '../../../src/entities/shape.entity';
import { ByNameSpecification } from '../../../src/specifications/common/by-name.specification';

class TestShape extends ShapeEntity {
  constructor(id: string, name: string = 'test-shape') {
    super(id, name);
  }
}

describe('ByNameSpecification', () => {
  test('returns true when names match', () => {
    const entity = new TestShape('1', 'rectangle');
    const spec = new ByNameSpecification<TestShape>('rectangle');

    expect(spec.isSatisfiedBy(entity)).toBe(true);
  });

  test('returns false when names do not match', () => {
    const entity = new TestShape('1', 'rectangle');
    const spec = new ByNameSpecification<TestShape>('sphere');

    expect(spec.isSatisfiedBy(entity)).toBe(false);
  });

  test('composite: AND', () => {
    const entity = new TestShape('1', 'shape');

    const spec1 = new ByNameSpecification<TestShape>('shape');
    const spec2 = new ByNameSpecification<TestShape>('shape');

    const combined = spec1.and(spec2);

    expect(combined.isSatisfiedBy(entity)).toBe(true);
  });

  test('composite: OR', () => {
    const entity = new TestShape('1', 'shape');

    const spec1 = new ByNameSpecification<TestShape>('wrong');
    const spec2 = new ByNameSpecification<TestShape>('shape');

    const combined = spec1.or(spec2);

    expect(combined.isSatisfiedBy(entity)).toBe(true);
  });

  test('composite: NOT', () => {
    const entity = new TestShape('1', 'shape');

    const spec = new ByNameSpecification<TestShape>('shape').not();

    expect(spec.isSatisfiedBy(entity)).toBe(false);
  });
});
