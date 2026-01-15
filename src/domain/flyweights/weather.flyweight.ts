import { WeatherType } from '../enums/weather-type.enum';
import { TemperatureValueObject } from '../value-objects/temperature.value-object';

export class WeatherFlyweight {
  constructor(
    public readonly temperature: TemperatureValueObject,
    public readonly humidity: number,
    public readonly type: WeatherType,
  ) {
    if (humidity < 0 || humidity > 100) {
      throw new Error('Humidity must be between 0 and 100');
    }
  }
}
