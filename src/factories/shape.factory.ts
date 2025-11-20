import { RectangleEntity } from '../entities/rectangle.entity';
import { PointEntity } from '../entities/point.entity';
import { RectangleLineValidator } from '../validators/rectangle/rectangle-line.validator';

export class ShapeFactory {
  private readonly rectangleLineValidator = new RectangleLineValidator();

  createRectangleFromLine(line: string): RectangleEntity {
    const parts = line.trim().split(/\s+/);

    this.rectangleLineValidator.validate(parts);

    const [id, ...coords] = parts;
    const numbers = coords.map(Number);

    const points = [
      new PointEntity(numbers[0], numbers[1]),
      new PointEntity(numbers[2], numbers[3]),
      new PointEntity(numbers[4], numbers[5]),
      new PointEntity(numbers[6], numbers[7]),
    ];

    return new RectangleEntity(id, points);
  }
}
