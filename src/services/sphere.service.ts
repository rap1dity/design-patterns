import { SphereEntity } from '../entities/sphere.entity';
import { SphereResultValidator } from '../validators/sphere/sphere-result.validator';
import { Point3DService } from './point3d.service';

export class SphereService {
  constructor(
    private readonly pointService: Point3DService,
    private readonly resultValidator: SphereResultValidator
  ) {}


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
