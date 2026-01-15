import { BaseWeatherHandler } from './base-weather.handler';
import { GetWeatherParams } from '../params/get-weather.params';
import { REGION_CITIES } from '../../domain/constants/regions.constants';
import { CITY_COORDINATES } from '../../domain/constants/cities.constants';
import { CITY_WEATHER } from '../../domain/constants/city-weather.constants';
import { WeatherMarkerEntity } from '../../domain/entities/weather-marker.entity';
import { CoordinatesValueObject } from '../../domain/value-objects/coordinates.value-object';
import { WeatherFlyweightFactory } from '../../infrastructure/factories/weather-flyweight.factory';

export class RegionWeatherHandler extends BaseWeatherHandler {
  constructor(
    private readonly flyweightFactory: WeatherFlyweightFactory,
  ) {
    super();
  }

  override handle(params: GetWeatherParams): WeatherMarkerEntity[] {
    if (!params.region) {
      return super.handle(params);
    }

    const cities = REGION_CITIES[params.region];
    if (!cities) {
      return [];
    }

    const result: WeatherMarkerEntity[] = [];

    for (const city of cities) {
      const coordinates = CITY_COORDINATES[city];
      const weatherData = CITY_WEATHER[city];

      if (!coordinates || !weatherData) {
        continue;
      }

      const flyweight = this.flyweightFactory.getFlyweight({
        temperatureCelsius: weatherData.temperature,
        humidity: weatherData.humidity,
        type: weatherData.type,
      });

      result.push(
        new WeatherMarkerEntity(
          `city-${city}`,
          city,
          new CoordinatesValueObject(
            coordinates.latitude,
            coordinates.longitude,
          ),
          flyweight,
        ),
      );
    }

    return result;
  }
}
