import { CalculationException } from '../../exceptions/calculation.exception';

export class SphereResultValidator {
  validateSurfaceArea(value: number): void {
    if (!Number.isFinite(value) || value <= 0) {
      throw new CalculationException(`Invalid sphere surface area: ${value}`);
    }
  }

  validateVolume(value: number): void {
    if (!Number.isFinite(value) || value <= 0) {
      throw new CalculationException(`Invalid sphere volume: ${value}`);
    }
  }
}
