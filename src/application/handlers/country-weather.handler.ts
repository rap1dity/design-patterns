import { BaseWeatherHandler } from './base-weather.handler';
import { GetWeatherParams } from '../params/get-weather.params';
import { COUNTRY_REGIONS } from '../../domain/constants/countries.constants';
import { REGION_CITIES } from '../../domain/constants/regions.constants';
import { CITY_COORDINATES } from '../../domain/constants/cities.constants';
import { CITY_WEATHER } from '../../domain/constants/city-weather.constants';
import { WeatherMarkerEntity } from '../../domain/entities/weather-marker.entity';
import { CoordinatesValueObject } from '../../domain/value-objects/coordinates.value-object';
import { WeatherFlyweightFactory } from '../../infrastructure/factories/weather-flyweight.factory';

export class CountryWeatherHandler extends BaseWeatherHandler {
  constructor(
    private readonly flyweightFactory: WeatherFlyweightFactory,
  ) {
    super();
  }

  override handle(params: GetWeatherParams): WeatherMarkerEntity[] {
    if (!params.country) {
      return super.handle(params);
    }

    const regions = COUNTRY_REGIONS[params.country];
    if (!regions) {
      return [];
    }

    const result: WeatherMarkerEntity[] = [];

    for (const region of regions) {
      const cities = REGION_CITIES[region];
      if (!cities) {
        continue;
      }

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
    }

    return result;
  }
}
