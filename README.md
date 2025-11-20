# Design patters

## Project Overview

This project is a console application written in TypeScript for processing and analysing geometric figures as part of a laboratory assignment. It supports two figure types:

* Rectangle (2D)
* Sphere (3D)

The application follows a strict separation of responsibilities:

* Entities store only data (no business logic)
* All calculations are implemented in services
* Object creation is handled via the Factory Method pattern
* Input and result validation is performed by dedicated validators

## Project Structure

```
src/
  entities/
    point.entity.ts
    point3d.entity.ts
    rectangle.entity.ts
    shape.entity.ts
    sphere.entity.ts
  exceptions/
    calculation.exception.ts
    invalid-data.exception.ts
  factories/
    shape.factory.ts
    sphere.factory.ts
  services/
    point.service.ts
    point3d.service.ts
    rectangle.service.ts
    sphere.service.ts
  utils/
    logger.util.ts    
  validators/
    rectangle/
      rectangle-line.validator.ts
      rectangle-result.validator.ts
    sphere/
      sphere-line.validator.ts
      sphere-result.validator.ts
  main.ts
tests/
```

## Features

### Rectangle

* Area and perimeter calculation
* Validity check
* Convexity check
* Square, rhombus and strict trapezoid detection
* Axis intersection check

### Sphere

* Surface area and volume calculation
* Validity check
* Volume ratio when intersected by coordinate plane
* Detection of touching coordinate planes

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

## Testing

Run unit tests with coverage:

```
npm run test
```