import { ShapeEntity } from '../../src/entities/shape.entity';
import { ShapeRepository } from '../../src/repositories/shape.repository';
import { NotFoundException } from '../../src/exceptions/not-found.exception';
import { ByIdSpecification } from '../../src/specifications/common/by-id.specification';
import { ByNameSpecification } from '../../src/specifications/common/by-name.specification';
import { IdComparator } from '../../src/comparators/id.comparator';

class TestShape extends ShapeEntity {
  constructor(id: string, name: string = 'test-shape') {
    super(id, name);
  }
}

describe('ShapeRepository', () => {
  let repo: ShapeRepository<TestShape>;

  beforeEach(() => {
    repo = new ShapeRepository<TestShape>();
  });

  test('add() should store entities', () => {
    const s1 = new TestShape('1');
    repo.add(s1);

    expect(repo.getById('1')).toBe(s1);
  });

  test('remove() should delete entity by id', () => {
    const s1 = new TestShape('1');
    repo.add(s1);

    const result = repo.remove('1');

    expect(result).toBe(true);
    expect(repo.findById('1')).toBeUndefined();
  });

  test('findById() returns undefined when not found', () => {
    expect(repo.findById('missing')).toBeUndefined();
  });

  test('getById() throws NotFoundException when entity does not exist', () => {
    expect(() => repo.getById('missing')).toThrow(NotFoundException);
  });

  test('findOne() returns a matching entity or undefined', () => {
    const s1 = new TestShape('1');
    repo.add(s1);

    const spec = new ByIdSpecification<TestShape>('1');

    expect(repo.findOne(spec)).toBe(s1);
    expect(repo.findOne(new ByIdSpecification<TestShape>('no'))).toBeUndefined();
  });

  test('getOne() throws NotFoundException if no entity matches specification', () => {
    const spec = new ByNameSpecification<TestShape>('anything');

    expect(() => repo.getOne(spec)).toThrow(NotFoundException);
  });

  test('findMany() returns all matching entities', () => {
    const s1 = new TestShape('1');
    const s2 = new TestShape('2');
    repo.add(s1);
    repo.add(s2);

    const spec = new ByNameSpecification<TestShape>('test-shape');

    expect(repo.findMany(spec)).toEqual([s1, s2]);
  });

  test('getMany() throws NotFoundException when no entities match', () => {
    const spec = new ByIdSpecification<TestShape>('missing');

    expect(() => repo.getMany(spec)).toThrow(NotFoundException);
  });

  test('getAll() returns a copy of internal items as array', () => {
    const s1 = new TestShape('1');
    repo.add(s1);

    const arr = repo.getAll();

    expect(arr).toEqual([s1]);
    expect(arr).not.toBe(repo.getAll());
  });

  test('sort() should sort entities according to comparator', () => {
    const s3 = new TestShape('3');
    const s1 = new TestShape('1');
    const s2 = new TestShape('2');

    repo.add(s3);
    repo.add(s1);
    repo.add(s2);

    const result = repo.sort(new IdComparator<TestShape>());

    expect(result.map((s) => s.id)).toEqual(['1', '2', '3']);
  });
});
