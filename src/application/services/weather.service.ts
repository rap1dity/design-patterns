import { GetWeatherParams } from '../params/get-weather.params';
import { WeatherMarkerEntity } from '../../domain/entities/weather-marker.entity';
import { WeatherFlyweightFactory } from '../../infrastructure/factories/weather-flyweight.factory';

import { CityWeatherHandler } from '../handlers/city-weather.handler';
import { RegionWeatherHandler } from '../handlers/region-weather.handler';
import { CountryWeatherHandler } from '../handlers/country-weather.handler';

export class WeatherService {
  private readonly rootHandler: CityWeatherHandler;

  constructor(
    private readonly flyweightFactory: WeatherFlyweightFactory,
  ) {
    this.rootHandler = this.buildChain();
  }

  getWeather(params: GetWeatherParams): WeatherMarkerEntity[] {
    return this.rootHandler.handle(params);
  }

  private buildChain(): CityWeatherHandler {
    const cityHandler = new CityWeatherHandler(this.flyweightFactory);
    const regionHandler = new RegionWeatherHandler(this.flyweightFactory);
    const countryHandler = new CountryWeatherHandler(this.flyweightFactory);

    cityHandler
      .setNext(regionHandler)
      .setNext(countryHandler)

    return cityHandler;
  }
}
