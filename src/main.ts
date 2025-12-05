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

import { ShapeRepository } from './repositories/shape.repository';

import { Warehouse } from './warehouse';
import { RectangleObserver } from './warehouse/observers/rectangle.observer';
import { SphereObserver } from './warehouse/observers/sphere.observer';

import { RectangleAreaRangeSpecification } from './specifications/rectangle/rectangle-area-range.specification';
import { SphereVolumeRangeSpecification } from './specifications/sphere/sphere-volume-range.specification';

import { IdComparator } from './comparators/id.comparator';

const pointService = new PointService();
const point3DService = new Point3DService();

const rectangleResultValidator = new RectangleResultValidator();
const sphereResultValidator = new SphereResultValidator();

const warehouse = Warehouse.getInstance();

const rectangleRepo = new ShapeRepository<RectangleEntity>();
const sphereRepo = new ShapeRepository<SphereEntity>();


function readRectangles(pathStr: string, service: RectangleService): RectangleEntity[] {
  const fullPath = path.resolve(process.cwd(), pathStr);
  const factory = new ShapeFactory();

  const result: RectangleEntity[] = [];

  try {
    const lines = fs.readFileSync(fullPath, 'utf-8').split('\n');

    lines.forEach((line, i) => {
      if (!line.trim()) return;

      try {
        const rect = factory.createRectangleFromLine(line);

        if (!service.isValid(rect)) {
          logger.warn(`Rectangle line ${i + 1}: invalid geometry`);
          return;
        }

        result.push(rect);
      } catch (err) {
        logger.error(`Rectangle line ${i + 1} skipped: ${(err as Error).message}`);
      }
    });
  } catch (err) {
    logger.error(`Failed to read rectangles file: ${(err as Error).message}`);
  }

  return result;
}


function readSpheres(pathStr: string, service: SphereService): SphereEntity[] {
  const fullPath = path.resolve(process.cwd(), pathStr);
  const factory = new SphereFactory();

  const result: SphereEntity[] = [];

  try {
    const lines = fs.readFileSync(fullPath, 'utf-8').split('\n');

    lines.forEach((line, i) => {
      if (!line.trim()) return;

      try {
        const sphere = factory.createFromLine(line);

        if (!service.isValid(sphere)) {
          logger.warn(`Sphere line ${i + 1}: invalid geometry`);
          return;
        }

        result.push(sphere);
      } catch (err) {
        logger.error(`Sphere line ${i + 1} skipped: ${(err as Error).message}`);
      }
    });
  } catch (err) {
    logger.error(`Failed to read spheres file: ${(err as Error).message}`);
  }

  return result;
}


function logRectangles(rectangles: RectangleEntity[], service: RectangleService) {
  rectangles.forEach((r) => {
    logger.info(`Rectangle ${r.id}`);
    logger.info(`  Area: ${service.getArea(r)}`);
    logger.info(`  Perimeter: ${service.getPerimeter(r)}`);
    logger.info(`  Square: ${service.isSquare(r)}`);
    logger.info(`  Rhombus: ${service.isRhombus(r)}`);
    logger.info(`  Trapezoid: ${service.isTrapezoid(r)}`);
    logger.info(`  Convex: ${service.isConvex(r)}`);
  });
}

function logSpheres(spheres: SphereEntity[], service: SphereService) {
  spheres.forEach((s) => {
    logger.info(`Sphere ${s.id}`);
    logger.info(`  Surface area: ${service.getSurfaceArea(s)}`);
    logger.info(`  Volume: ${service.getVolume(s)}`);
  });
}


function main(): void {
  try {
    const rectangleService = new RectangleService(pointService, rectangleResultValidator);
    const sphereService = new SphereService(point3DService, sphereResultValidator);

    rectangleService.attach(new RectangleObserver(rectangleService, warehouse));
    sphereService.attach(new SphereObserver(sphereService, warehouse));

    const rectangles = readRectangles('data/rectangles.txt', rectangleService);
    const spheres = readSpheres('data/spheres.txt', sphereService);

    rectangles.forEach((r) => rectangleRepo.add(r));
    spheres.forEach((s) => sphereRepo.add(s));

    logger.info('--- Rectangles ---');
    logRectangles(rectangles, rectangleService);

    logger.info('--- Spheres ---');
    logSpheres(spheres, sphereService);

    logger.info('--- Specification Search Demo ---');

    const areaRange = new RectangleAreaRangeSpecification(10, 100, warehouse);

    const rectanglesInRange = rectangleRepo.findMany(areaRange);
    logger.info(`Rectangles with area in 10..100: ${rectanglesInRange.length}`);

    const largeSpheres = sphereRepo.findMany(new SphereVolumeRangeSpecification(100, 5000, warehouse));
    logger.info(`Spheres with volume in 100..5000: ${largeSpheres.length}`);

    logger.info('--- Sorting Demo ---');
    const sortedById = rectangleRepo.sort(new IdComparator());
    logger.info(`Rectangle order by ID: ${sortedById.map(r => r.id).join(', ')}`);

    logger.info('--- Warehouse Observer Demo ---');

    if (rectangles.length > 0) {
      const r1 = rectangles[0];

      rectangleService.updatePoints(r1, [
        r1.points[0],
        r1.points[1],
        { ...r1.points[1], y: r1.points[1].y + 5 },
        r1.points[3],
      ]);

      logger.info(`Updated area in warehouse: ${warehouse.getArea(r1.id)}`);
    }

  } catch (err) {
    logger.fatal(`Fatal error: ${(err as Error).message}`);
  }
}

main();
