import { RangeSpecification } from '../../../src/specifications/common/range.specification';

class TestEntity {
  constructor(readonly value: number) {}
}

class TestRangeSpec extends RangeSpecification<TestEntity> {
  constructor(min: number, max: number) {
    super((entity) => entity.value, min, max);
  }
}


describe('RangeSpecification (generic test)', () => {
  test('returns true when value is inside range', () => {
    const spec = new TestRangeSpec(10, 20);
    expect(spec.isSatisfiedBy(new TestEntity(15))).toBe(true);
  });

  test('returns true for boundary values', () => {
    const spec = new TestRangeSpec(10, 20);
    expect(spec.isSatisfiedBy(new TestEntity(10))).toBe(true);
    expect(spec.isSatisfiedBy(new TestEntity(20))).toBe(true);
  });

  test('returns false when value is below minimum', () => {
    const spec = new TestRangeSpec(10, 20);
    expect(spec.isSatisfiedBy(new TestEntity(5))).toBe(false);
  });

  test('returns false when value is above maximum', () => {
    const spec = new TestRangeSpec(10, 20);
    expect(spec.isSatisfiedBy(new TestEntity(25))).toBe(false);
  });

  test('NOT inverts the condition', () => {
    const spec = new TestRangeSpec(10, 20).not();
    expect(spec.isSatisfiedBy(new TestEntity(15))).toBe(false);
    expect(spec.isSatisfiedBy(new TestEntity(5))).toBe(true);
  });

  test('AND requires both specifications to be satisfied', () => {
    const spec1 = new TestRangeSpec(10, 30);
    const spec2 = new TestRangeSpec(20, 40);

    const combined = spec1.and(spec2);

    expect(combined.isSatisfiedBy(new TestEntity(25))).toBe(true);
    expect(combined.isSatisfiedBy(new TestEntity(15))).toBe(false);
  });

  test('OR requires at least one specification to be satisfied', () => {
    const low = new TestRangeSpec(0, 10);
    const high = new TestRangeSpec(20, 30);

    const combined = low.or(high);

    expect(combined.isSatisfiedBy(new TestEntity(5))).toBe(true);
    expect(combined.isSatisfiedBy(new TestEntity(25))).toBe(true);
    expect(combined.isSatisfiedBy(new TestEntity(15))).toBe(false);
  });
});
