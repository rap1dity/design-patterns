import { WeatherType } from '../enums/weather-type.enum';

export const CITY_WEATHER: Record<string, { temperature: number, humidity: number, type: WeatherType }> = {
  Warsaw: { temperature: 12, humidity: 70, type: WeatherType.CLOUDY },
  Krakow: { temperature: 10, humidity: 65, type: WeatherType.SUNNY },
  Tarnow: { temperature: 13, humidity: 22, type: WeatherType.SNOW },
  Gdansk: { temperature: 8, humidity: 80, type: WeatherType.RAINY },
  Berlin: { temperature: 9, humidity: 60, type: WeatherType.CLOUDY },
  Barnum: { temperature: 12, humidity: 30, type: WeatherType.SUNNY },
  Kobus: { temperature: 54, humidity: 25, type: WeatherType.SNOW },
} as const;
