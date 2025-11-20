import { InvalidDataException } from '../../exceptions/invalid-data.exception';

const NUMBER_REGEX = /^-?\d+(\.\d+)?$/;

export class SphereLineValidator {
  validate(line: string): void {
    const parts = line.trim().split(/\s+/);

    if (parts.length !== 5) {
      throw new InvalidDataException('Invalid sphere data length');
    }

    const [, x, y, z, r] = parts;

    if (
      !NUMBER_REGEX.test(x) ||
      !NUMBER_REGEX.test(y) ||
      !NUMBER_REGEX.test(z) ||
      !NUMBER_REGEX.test(r)
    ) {
      throw new InvalidDataException('Invalid numeric value');
    }

    if (parseFloat(r) <= 0) {
      throw new InvalidDataException('Radius must be positive');
    }
  }
}
