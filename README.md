# Design patters

## Project Overview

A TypeScript console application demonstrating the implementation of several fundamental software engineering design patterns through the processing and analysis of geometric figures.

The project focuses on clean architecture, strict separation of concerns, and modular extensibility by applying patterns such as:

* Factory Method
* Repository
* Specification
* Strategy (Comparator API)
* Singleton (Warehouse)
* Observer
* SOLID-aligned service layer separation

Figures supported:

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
    not-found.exception.ts
  factories/
    shape.factory.ts
    sphere.factory.ts
  interfaces/
    comparator.interface.ts
    specification.interface.ts
  repositories/
    comparators/
      distance.comparator.ts
      id.comparator.ts
      name.comparator.ts
      point-x.comparator.ts
      point-y.comparator.ts
    shape.repository.ts
  services/
    point.service.ts
    point3d.service.ts
    rectangle.service.ts
    sphere.service.ts
  specifications/
    base/
      abstract-specification.base.ts
    common/
      by-id.specification.ts
      by-name.specification.ts
      range.specification.ts
    enums/
      octant-3d.enum.ts
      quadrant-2d.enum.ts
    rectangle/
      rectangle-area-range.specification.ts
      rectangle-distance-range.specification.ts
      rectangle-in-quadrant.specification.ts
      rectangle-perimeter-range.specification.ts
    sphere/
      sphere-distance-range.specification.ts
      sphere-in-octant.specification.ts
      sphere-surface-range.specification.ts
      sphere-volume-range.specification.ts
  utils/
    logger.util.ts    
  validators/
    rectangle/
      rectangle-line.validator.ts
      rectangle-result.validator.ts
    sphere/
      sphere-line.validator.ts
      sphere-result.validator.ts
  warehouse/
    interfaces/
      shape-observer.interface.ts
    observers/
      rectangle.observer.ts
      sphere.observer.ts
    types/
      rectangle-metrics.type.ts
      sphere-metrics.type.ts
    index.ts
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