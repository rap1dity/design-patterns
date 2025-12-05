import { ShapeEntity } from '../../src/entities/shape.entity';
import { NameComparator } from '../../src/comparators/name.comparator';

class TestShape extends ShapeEntity {
  constructor(id: string, name: string) {
    super(id, name);
  }
}

describe('NameComparator', () => {
  test('sorts entities by name', () => {
    const rect = new TestShape('1', 'rectangle');
    const sphere = new TestShape('2', 'sphere');
    const alpha = new TestShape('3', 'alpha');

    const items = [sphere, rect, alpha];

    const comparator = new NameComparator<TestShape>();

    const sorted = items.sort((a, b) => comparator.compare(a, b));

    expect(sorted.map(s => s.name)).toEqual(['alpha', 'rectangle', 'sphere']);
  });
});
