import { WeatherFlyweight } from '../flyweights/weather.flyweight';
import { CoordinatesValueObject } from '../value-objects/coordinates.value-object';

export class WeatherMarkerEntity {
  constructor(
    public readonly id: string,
    public readonly city: string,
    public readonly coordinates: CoordinatesValueObject,
    public readonly weather: WeatherFlyweight,
  ) {}
}
