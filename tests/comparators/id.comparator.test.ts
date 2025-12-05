import { ShapeEntity } from '../../src/entities/shape.entity';
import { IdComparator } from '../../src/comparators/id.comparator';

class TestShape extends ShapeEntity {
  constructor(id: string) {
    super(id, 'shape');
  }
}

describe('IdComparator', () => {
  test('sorts entities by id lexicographically', () => {
    const a = new TestShape('a');
    const c = new TestShape('c');
    const b = new TestShape('b');

    const array = [c, a, b];
    const comparator = new IdComparator<TestShape>();

    const result = array.sort((x, y) => comparator.compare(x, y));

    expect(result.map(x => x.id)).toEqual(['a', 'b', 'c']);
  });
});
