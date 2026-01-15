import { GetWeatherParams } from '../params/get-weather.params';
import { WeatherMarkerEntity } from '../../domain/entities/weather-marker.entity';

export abstract class BaseWeatherHandler {
  protected nextHandler: BaseWeatherHandler | null = null;

  setNext(handler: BaseWeatherHandler): BaseWeatherHandler {
    this.nextHandler = handler;

    return handler;
  }

  handle(params: GetWeatherParams): WeatherMarkerEntity[] {
    if (this.nextHandler) {
      return this.nextHandler.handle(params);
    }

    return [];
  }
}
