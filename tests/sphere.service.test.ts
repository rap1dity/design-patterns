import { SphereEntity } from '../src/entities/sphere.entity';
import { SphereService } from '../src/services/sphere.service';
import { Point3DEntity } from '../src/entities/point3d.entity';
import { Point3DService } from '../src/services/point3d.service';
import { SphereResultValidator } from '../src/validators/sphere/sphere-result.validator';

describe('SphereService', () => {
  const point3DService = new Point3DService();
  const sphereResultValidator = new SphereResultValidator();
  const service = new SphereService(point3DService, sphereResultValidator);

  test('calculates surface area and volume correctly', () => {
    const sphere = new SphereEntity(
      'S1',
      new Point3DEntity(0, 0, 0),
      5
    );

    const surface = service.getSurfaceArea(sphere);
    const volume = service.getVolume(sphere);

    expect(surface).toBeCloseTo(314.159, 2);
    expect(volume).toBeCloseTo(523.598, 2);
  });

  test('detects valid sphere', () => {
    const sphere = new SphereEntity(
      'S2',
      new Point3DEntity(1, 2, 3),
      4
    );

    expect(service.isValid(sphere)).toBe(true);
    expect(service.getVolume(sphere)).not.toBe(0);
  });

  test('invalid sphere returns zero area and volume', () => {
    const sphere = new SphereEntity(
      'S3',
      new Point3DEntity(0, 0, 0),
      -5
    );

    expect(service.isValid(sphere)).toBe(false);
    expect(service.getSurfaceArea(sphere)).toBe(0);
    expect(service.getVolume(sphere)).toBe(0);
  });

  test('detects touching coordinate plane', () => {
    const sphere = new SphereEntity(
      'S4',
      new Point3DEntity(5, 0, 0),
      5
    );

    expect(service.touchesAnyCoordinatePlane(sphere)).toBe(true);
    expect(service.touchesAnyCoordinatePlane(sphere)).not.toBe(false);
  });

  test('does not touch any coordinate plane', () => {
    const sphere = new SphereEntity(
      'S5',
      new Point3DEntity(10, 10, 10),
      2
    );

    expect(service.touchesAnyCoordinatePlane(sphere)).toBe(false);
  });

  test('volume ratio is split equally when center on XY plane', () => {
    const sphere = new SphereEntity(
      'S6',
      new Point3DEntity(0, 0, 0),
      5
    );

    const ratio = service.volumeRatioByPlaneXY(sphere);

    expect(ratio.positive).toBe(0.5);
    expect(ratio.negative).toBe(0.5);
  });

  test('volume ratio is one-sided when center not on XY plane', () => {
    const sphere = new SphereEntity(
      'S7',
      new Point3DEntity(0, 0, 10),
      3
    );

    const ratio = service.volumeRatioByPlaneXY(sphere);

    expect(ratio.positive).toBe(1);
    expect(ratio.negative).toBe(0);
  });
});
