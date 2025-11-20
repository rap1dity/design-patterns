import { PointEntity } from './point.entity';

export abstract class ShapeEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly points: PointEntity[],
  ) {}
}