import fs from 'node:fs';
import path from 'node:path';

import { logger } from './utils/logger.util';
import { RectangleEntity } from './entities/rectangle.entity';
import { SphereEntity } from './entities/sphere.entity';
import { ShapeFactory } from './factories/shape.factory';
import { SphereFactory } from './factories/sphere.factory';
import { RectangleService } from './services/rectangle.service';
import { SphereService } from './services/sphere.service';
import { PointService } from './services/point.service';
import { Point3DService } from './services/point3d.service';
import { RectangleResultValidator } from './validators/rectangle/rectangle-result.validator';
import { SphereResultValidator } from './validators/sphere/sphere-result.validator';


const pointService = new PointService();
const point3DService = new Point3DService();

const rectangleResultValidator = new RectangleResultValidator();
const sphereResultValidator = new SphereResultValidator();


function readRectangles(
  relativePath: string,
  rectangleService: RectangleService,
): RectangleEntity[] {
  const fullPath = path.resolve(process.cwd(), relativePath);

  const rectangles: RectangleEntity[] = [];
  const shapeFactory = new ShapeFactory();

  try {
    const content = fs.readFileSync(fullPath, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      if (!line.trim()) {
        return;
      }

      try {
        const rectangle = shapeFactory.createRectangleFromLine(line);

        if (!rectangleService.isValid(rectangle)) {
          logger.warn(`Rectangle line ${index + 1}: invalid geometry`);
          return;
        }

        rectangles.push(rectangle);
      } catch (error: unknown) {
        logger.error(`Rectangle line ${index + 1} skipped: ${(error as Error).message}`);
      }
    });
  } catch (error: unknown) {
    logger.error(`Failed to read rectangles file: ${(error as Error).message}`);
  }

  return rectangles;
}


function readSpheres(
  relativePath: string,
  sphereService: SphereService,
): SphereEntity[] {
  const fullPath = path.resolve(process.cwd(), relativePath);

  const spheres: SphereEntity[] = [];
  const sphereFactory = new SphereFactory();

  try {
    const content = fs.readFileSync(fullPath, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      if (!line.trim()) {
        return;
      }

      try {
        const sphere = sphereFactory.createFromLine(line);

        if (!sphereService.isValid(sphere)) {
          logger.warn(`Sphere line ${index + 1}: invalid geometry`);
          return;
        }

        spheres.push(sphere);
      } catch (error: unknown) {
        logger.error(`Sphere line ${index + 1} skipped: ${(error as Error).message}`);
      }
    });
  } catch (error: unknown) {
    logger.error(`Failed to read spheres file: ${(error as Error).message}`);
  }

  return spheres;
}


function logRectangles(
  rectangles: RectangleEntity[],
  rectangleService: RectangleService,
): void {
  rectangles.forEach((rectangle) => {
    logger.info(`Rectangle ID: ${rectangle.id}`);
    logger.info(`Area: ${rectangleService.getArea(rectangle)}`);
    logger.info(`Perimeter: ${rectangleService.getPerimeter(rectangle)}`);
    logger.info(`Square: ${rectangleService.isSquare(rectangle)}`);
    logger.info(`Rhombus: ${rectangleService.isRhombus(rectangle)}`);
    logger.info(`Trapezoid: ${rectangleService.isTrapezoid(rectangle)}`);
    logger.info(`Convex: ${rectangleService.isConvex(rectangle)}`);
    logger.info(
      `Intersects only one axis (distance 0): ${rectangleService.intersectsOnlyOneAxis(rectangle, 0)}`,
    );
  });
}


function logSpheres(
  spheres: SphereEntity[],
  sphereService: SphereService,
): void {
  spheres.forEach((sphere) => {
    logger.info(`Sphere ID: ${sphere.id}`);
    logger.info(`Surface area: ${sphereService.getSurfaceArea(sphere)}`);
    logger.info(`Volume: ${sphereService.getVolume(sphere)}`);

    const ratio = sphereService.volumeRatioByPlaneXY(sphere);

    logger.info(`Volume ratio (XY plane): positive=${ratio.positive}, negative=${ratio.negative}`);
    logger.info(`Touches any coordinate plane: ${sphereService.touchesAnyCoordinatePlane(sphere)}`);
  });
}


function main(): void {
  try {
    const rectangleService = new RectangleService(pointService, rectangleResultValidator);
    const sphereService = new SphereService(point3DService, sphereResultValidator);

    logger.info('--- Processing Rectangles ---');
    const rectangles = readRectangles('data/rectangles.txt', rectangleService);
    logRectangles(rectangles, rectangleService);

    logger.info('--- Processing Spheres ---');
    const spheres = readSpheres('data/spheres.txt', sphereService);
    logSpheres(spheres, sphereService);

  } catch (error: unknown) {
    logger.fatal(`Fatal error: ${(error as Error).message}`);
  }
}

main();
