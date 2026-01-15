import { BaseWeatherHandler } from './base-weather.handler';
import { GetWeatherParams } from '../params/get-weather.params';
import { CITY_COORDINATES } from '../../domain/constants/cities.constants';
import { CITY_WEATHER } from '../../domain/constants/city-weather.constants';
import { WeatherMarkerEntity } from '../../domain/entities/weather-marker.entity';
import { CoordinatesValueObject } from '../../domain/value-objects/coordinates.value-object';
import { WeatherFlyweightFactory } from '../../infrastructure/factories/weather-flyweight.factory';

export class CityWeatherHandler extends BaseWeatherHandler {
  constructor(
    private readonly flyweightFactory: WeatherFlyweightFactory,
  ) {
    super();
  }

  override handle(params: GetWeatherParams): WeatherMarkerEntity[] {
    if (!params.city) {
      return super.handle(params);
    }

    const coordinates = CITY_COORDINATES[params.city];
    const weatherData = CITY_WEATHER[params.city];

    if (!coordinates || !weatherData) {
      return [];
    }

    const flyweight = this.flyweightFactory.getFlyweight({
      temperatureCelsius: weatherData.temperature,
      humidity: weatherData.humidity,
      type: weatherData.type,
    });

    return [
      new WeatherMarkerEntity(
        `city-${params.city}`,
        params.city,
        new CoordinatesValueObject(
          coordinates.latitude,
          coordinates.longitude,
        ),
        flyweight,
      ),
    ];
  }
}
