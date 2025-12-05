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


const warehouse = Warehouse.getInstance();

const pointService = new PointService();
const point3DService = new Point3DService();

const rectangleService = new RectangleService(pointService, new RectangleResultValidator());
const sphereService = new SphereService(point3DService, new SphereResultValidator());

rectangleService.attach(new RectangleObserver(rectangleService, warehouse));
sphereService.attach(new SphereObserver(sphereService, warehouse));

const rectangleRepo = new ShapeRepository<RectangleEntity>();
const sphereRepo = new ShapeRepository<SphereEntity>();


function readRectangles(pathStr: string): RectangleEntity[] {
  const fullPath = path.resolve(process.cwd(), pathStr);
  const factory = new ShapeFactory();
  const result: RectangleEntity[] = [];

  try {
    const lines = fs.readFileSync(fullPath, 'utf-8').split('\n');
    lines.forEach((line, i) => {
      if (!line.trim()) return;
      try {
        const rect = factory.createRectangleFromLine(line);
        if (!rectangleService.isValid(rect)) {
          logger.warn(`Rectangle line ${i + 1} invalid`);
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

function readSpheres(pathStr: string): SphereEntity[] {
  const fullPath = path.resolve(process.cwd(), pathStr);
  const factory = new SphereFactory();
  const result: SphereEntity[] = [];

  try {
    const lines = fs.readFileSync(fullPath, 'utf-8').split('\n');
    lines.forEach((line, i) => {
      if (!line.trim()) return;
      try {
        const s = factory.createFromLine(line);
        if (!sphereService.isValid(s)) {
          logger.warn(`Sphere line ${i + 1} invalid`);
          return;
        }
        result.push(s);
      } catch (err) {
        logger.error(`Sphere line ${i + 1} skipped: ${(err as Error).message}`);
      }
    });
  } catch (err) {
    logger.error(`Failed to read spheres file: ${(err as Error).message}`);
  }

  return result;
}


function logRectangles(rects: RectangleEntity[]) {
  rects.forEach((r) => {
    logger.info(`Rectangle ${r.id}`);
    logger.info(`  Area: ${rectangleService.getArea(r)}`);
    logger.info(`  Perimeter: ${rectangleService.getPerimeter(r)}`);
    logger.info(`  Square: ${rectangleService.isSquare(r)}`);
    logger.info(`  Rhombus: ${rectangleService.isRhombus(r)}`);
    logger.info(`  Trapezoid: ${rectangleService.isTrapezoid(r)}`);
    logger.info(`  Convex: ${rectangleService.isConvex(r)}`);
  });
}

function logSpheres(spheres: SphereEntity[]) {
  spheres.forEach((s) => {
    logger.info(`Sphere ${s.id}`);
    logger.info(`  Surface area: ${sphereService.getSurfaceArea(s)}`);
    logger.info(`  Volume: ${sphereService.getVolume(s)}`);
  });
}

function main(): void {
  try {

    const rectangles = readRectangles('data/rectangles.txt');
    const spheres = readSpheres('data/spheres.txt');

    rectangles.forEach(r => rectangleRepo.add(r));
    spheres.forEach(s => sphereRepo.add(s));

    logger.info('--- Initial Rectangles ---');
    logRectangles(rectangles);

    logger.info('--- Initial Spheres ---');
    logSpheres(spheres);

    logger.info('--- Initial Warehouse Sync (Observer via update calls) ---');

    rectangles.forEach(r =>
      rectangleService.updatePoints(r, [...r.points])
    );

    spheres.forEach(s => {
      sphereService.updateRadius(s, s.radius);
      sphereService.updateCenter(s, s.center.x, s.center.y, s.center.z);
    });

    logger.info('Warehouse successfully initialized');


    logger.info('--- Specification Search Demo ---');

    const areaSpec = new RectangleAreaRangeSpecification(10, 100, warehouse);
    const rectFound = rectangleRepo.findMany(areaSpec);
    logger.info(`Rectangles with area 10..100: ${rectFound.length}`);

    const volumeSpec = new SphereVolumeRangeSpecification(100, 5000, warehouse);
    const sphFound = sphereRepo.findMany(volumeSpec);
    logger.info(`Spheres with volume 100..5000: ${sphFound.length}`);


    logger.info('--- Sorting Demo ---');
    const sortedById = rectangleRepo.sort(new IdComparator());
    logger.info(`Rectangle order by ID: ${sortedById.map(r => r.id).join(', ')}`);


    logger.info('--- Observer Flow Demo ---');

    if (rectangles.length > 0) {
      const r = rectangles[0];

      logger.info(`Old area: ${warehouse.getArea(r.id)}`);

      const updatedPoints = [
        r.points[0],
        { ...r.points[1], x: r.points[1].x + 3 },
        r.points[2],
        r.points[3]
      ];

      rectangleService.updatePoints(r, updatedPoints);

      logger.info(`New area after update: ${warehouse.getArea(r.id)}`);
    }

    if (spheres.length > 0) {
      const s = spheres[0];

      logger.info(`Old volume: ${warehouse.getVolume(s.id)}`);

      sphereService.updateRadius(s, s.radius + 2);

      logger.info(`New volume after update: ${warehouse.getVolume(s.id)}`);
    }

  } catch (err) {
    logger.fatal(`Fatal error: ${(err as Error).message}`);
  }
}

main();
