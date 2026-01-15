import { WeatherFlyweightFactory } from './infrastructure/factories/weather-flyweight.factory';
import { WeatherService } from './application/services/weather.service';
import { MapRenderer } from './application/renderers/map.rerender';

const main = (): void => {
  const flyweightFactory = new WeatherFlyweightFactory();
  const weatherService = new WeatherService(flyweightFactory);
  const mapRenderer = new MapRenderer();

  const queries = [
    { city: 'Krakow' },
    { region: 'Lesser' },
    { country: 'Poland' },
    { country: 'Germany' },
    { city: 'UnknownCity' },
  ];

  for (const query of queries) {
    console.log('Query:', query);

    const markers = weatherService.getWeather(query);

    if (markers.length === 0) {
      console.log('→ No weather data found\n');
      continue;
    }

    mapRenderer.render(markers, 'Map markers (ASCII grid):', {
      width: 80,
      height: 24,
      showList: true,
      highlightRadius: 2,
      highlightChar: 'o',
    });
  }
}

main();