import { ShapeEntity } from '../entities/shape.entity';
import { Specification } from '../interfaces/specification.interface';
import { Comparator } from '../interfaces/comparator.interface';
import { NotFoundException } from '../exceptions/not-found.exception';

export class ShapeRepository<T extends ShapeEntity> {
  private readonly items = new Map<string, T>();

  add(shape: T): void {
    this.items.set(shape.id, shape);
  }

  remove(id: string): boolean {
    return this.items.delete(id);
  }

  findById(id: string): T | undefined {
    return this.items.get(id);
  }

  getById(id: string): T {
    const entity = this.items.get(id);

    if (!entity) {
      throw new NotFoundException(`Entity with id=${id} was not found`);
    }

    return entity;
  }

  getAll(): T[] {
    return Array.from(this.items.values());
  }

  findOne(spec: Specification<T>): T | undefined {
    for (const item of this.items.values()) {
      if (spec.isSatisfiedBy(item)) {
        return item;
      }
    }

    return undefined;
  }

  getOne(spec: Specification<T>): T {
    const found = this.findOne(spec);

    if (!found) {
      throw new NotFoundException(
        `No entity satisfies specification ${spec.constructor.name}`,
      );
    }

    return found;
  }

  findMany(spec: Specification<T>): T[] {
    const result: T[] = [];

    for (const item of this.items.values()) {
      if (spec.isSatisfiedBy(item)) {
        result.push(item);
      }
    }

    return result;
  }

  getMany(spec: Specification<T>): T[] {
    const result = this.findMany(spec);

    if (result.length === 0) {
      throw new NotFoundException(
        `No entities found for specification ${spec.constructor.name}`,
      );
    }

    return result;
  }

  sort(comparator: Comparator<T>): T[] {
    return this.getAll().sort((a, b) => comparator.compare(a, b));
  }
}
