import { SphereEntity } from '../entities/sphere.entity';
import { SphereResultValidator } from '../validators/sphere/sphere-result.validator';
import { Point3DService } from './point3d.service';
import { ShapeObserver } from '../warehouse/interfaces/shape-observer.interface';

export class SphereService {
  private observers: ShapeObserver<SphereEntity>[] = [];

  constructor(
    private readonly pointService: Point3DService,
    private readonly resultValidator: SphereResultValidator
  ) {}

  attach(observer: ShapeObserver<SphereEntity>): void {
    this.observers.push(observer);
  }

  private notify(sphere: SphereEntity): void {
    for (const observer of this.observers) {
      observer.onShapeChanged(sphere);
    }
  }

  updateCenter(sphere: SphereEntity, x: number, y: number, z: number): SphereEntity {
    sphere.center.x = x;
    sphere.center.y = y;
    sphere.center.z = z;

    this.notify(sphere);

    return sphere;
  }

  updateRadius(sphere: SphereEntity, r: number): SphereEntity {
    sphere.radius = r;

    this.notify(sphere);

    return sphere;
  }


  isValid(sphere: SphereEntity): boolean {
    return Number.isFinite(sphere.radius) && sphere.radius > 0;
  }

  getSurfaceArea(sphere: SphereEntity): number {
    if (!this.isValid(sphere)) {
      return 0;
    }

    const area = 4 * Math.PI * sphere.radius * sphere.radius;
    this.resultValidator.validateSurfaceArea(area);

    return area;
  }

  getVolume(sphere: SphereEntity): number {
    if (!this.isValid(sphere)) {
      return 0;
    }

    const volume = (4 / 3) * Math.PI * Math.pow(sphere.radius, 3);
    this.resultValidator.validateVolume(volume);

    return volume;
  }

  touchesAnyCoordinatePlane(sphere: SphereEntity): boolean {
    const { center, radius } = sphere;

    return (
      Math.abs(center.x) === radius ||
      Math.abs(center.y) === radius ||
      Math.abs(center.z) === radius
    );
  }

  volumeRatioByPlaneXY(sphere: SphereEntity): { positive: number; negative: number } {
    if (this.pointService.isOnPlaneXY(sphere.center)) {
      return { positive: 0.5, negative: 0.5 };
    }

    return { positive: 1, negative: 0 };
  }
}
