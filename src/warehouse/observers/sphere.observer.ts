import { ShapeObserver } from '../interfaces/shape-observer.interface';
import { SphereEntity } from '../../entities/sphere.entity';
import { SphereService } from '../../services/sphere.service';
import { Warehouse } from '../index';

export class SphereObserver implements ShapeObserver<SphereEntity> {
  constructor(
    private readonly sphereService: SphereService,
    private readonly warehouse: Warehouse,
  ) {}

  onShapeChanged(sphere: SphereEntity): void {
    const volume = this.sphereService.getVolume(sphere);
    const surfaceArea = this.sphereService.getSurfaceArea(sphere);

    this.warehouse.updateSphere(sphere.id, { volume, surfaceArea });
  }
}
