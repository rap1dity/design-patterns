# Design patterns: Flyweight + Chain of Responsibility (Weather Map)

## Overview

TypeScript console application that simulates **displaying meteorological data on a map**.

- **Flyweight** is used to reuse common weather properties (temperature, humidity, type) across many markers.
- **Chain of Responsibility** processes user queries by scope (city → region → country) and returns a list of map markers.
- **ASCII map renderer** visualizes markers on a grid using latitude/longitude and weather symbols.

## Project Structure

```
src/
  application/
    handlers/
      base-weather.handler.ts
      city-weather.handler.ts
      country-weather.handler.ts
      region-weather.handler.ts
    params/
      get-weather.params.ts
    renderers/
      map.rerender.ts
    services/
      weather.service.ts
  domain/
    constants/
      cities.constants.ts
      city-weather.constants.ts
      countries.constants.ts
      regions.constants.ts
    entities/
      weather-marker.entity.ts
    enums/
      weather-type.enum.ts
    flyweights/
      weather.flyweight.ts
    utils/
      has-own-property.util.ts
    value-objects/
      coordinates.value-object.ts
      temperature.value-object.ts
  infrastructure/
    factories/
      params/
        create-weather-flyweight.params.ts
      weather-flyweight.factory.ts
  main.ts
dist/
README.md
package.json
tsconfig.json
```

## How to Run

Install dependencies:

```
npm ci
```

Build the project:

```
npm run build
```

Run the application:

```
npm run start
```