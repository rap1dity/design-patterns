import { ShapeObserver } from '../interfaces/shape-observer.interface';
import { RectangleEntity } from '../../entities/rectangle.entity';
import { RectangleService } from '../../services/rectangle.service';
import { Warehouse } from '../index';

export class RectangleObserver implements ShapeObserver<RectangleEntity> {
  constructor(
    private readonly rectangleService: RectangleService,
    private readonly warehouse: Warehouse,
  ) {}

  onShapeChanged(rectangle: RectangleEntity): void {
    const area = this.rectangleService.getArea(rectangle);
    const perimeter = this.rectangleService.getPerimeter(rectangle);

    this.warehouse.updateRectangle(rectangle.id, { area, perimeter });
  }
}
