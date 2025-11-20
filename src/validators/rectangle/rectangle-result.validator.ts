import { CalculationException } from '../../exceptions/calculation.exception';

export class RectangleResultValidator {
  validateArea(value: number): void {
    if (!Number.isFinite(value) || value <= 0) {
      throw new CalculationException(`Invalid rectangle area: ${value}`);
    }
  }

  validatePerimeter(value: number): void {
    if (!Number.isFinite(value) || value <= 0) {
      throw new CalculationException(`Invalid rectangle perimeter: ${value}`);
    }
  }
}
