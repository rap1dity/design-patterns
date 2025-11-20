import { InvalidDataException } from '../../exceptions/invalid-data.exception';

const NUMBER_REGEX = /^-?\d+(\.\d+)?$/;

export class RectangleLineValidator {
  validate(parts: string[]): void {
    if (parts.length !== 9) {
      throw new InvalidDataException('Incorrect number of parameters for rectangle');
    }

    const [, ...coords] = parts;

    coords.forEach((value) => {
      if (!NUMBER_REGEX.test(value)) {
        throw new InvalidDataException(`Invalid value: ${value}`);
      }
    });
  }
}