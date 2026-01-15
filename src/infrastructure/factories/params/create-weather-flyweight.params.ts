import { WeatherType } from '../../../domain/enums/weather-type.enum';

export interface CreateWeatherFlyweightParams {
  temperatureCelsius: number;
  humidity: number;
  type: WeatherType;
}
