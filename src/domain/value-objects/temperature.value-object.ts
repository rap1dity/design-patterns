export class TemperatureValueObject {
  constructor(public readonly celsius: number) {
    if (Number.isNaN(celsius)) {
      throw new Error('Temperature must be a valid number');
    }
  }
}