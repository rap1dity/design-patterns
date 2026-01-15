import { WeatherFlyweight } from '../../domain/flyweights/weather.flyweight';
import { TemperatureValueObject } from '../../domain/value-objects/temperature.value-object';
import { CreateWeatherFlyweightParams } from './params/create-weather-flyweight.params';

export class WeatherFlyweightFactory {
  private readonly cache = new Map<string, WeatherFlyweight>();

  getFlyweight(params: CreateWeatherFlyweightParams): WeatherFlyweight {
    const key = this.buildKey(params);

    const existingFlyweight = this.cache.get(key);
    if (existingFlyweight) {
      return existingFlyweight;
    }

    const flyweight = new WeatherFlyweight(
      new TemperatureValueObject(params.temperatureCelsius),
      params.humidity,
      params.type,
    );

    this.cache.set(key, flyweight);

    return flyweight;
  }

  private buildKey(params: CreateWeatherFlyweightParams): string {
    return `${params.temperatureCelsius}:${params.humidity}:${params.type}`;
  }
}
