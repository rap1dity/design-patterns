import { RectangleMetrics } from './types/rectangle-metrics.type';
import { SphereMetrics } from './types/sphere-metrics.type';

export class Warehouse {
  private static instance: Warehouse;

  private readonly rectangles = new Map<string, RectangleMetrics>();
  private readonly spheres = new Map<string, SphereMetrics>();

  private constructor() {}

  static getInstance(): Warehouse {
    if (!Warehouse.instance) {
      Warehouse.instance = new Warehouse();
    }
    return Warehouse.instance;
  }

  updateRectangle(id: string, metrics: RectangleMetrics): void {
    this.rectangles.set(id, metrics);
  }

  updateSphere(id: string, metrics: SphereMetrics): void {
    this.spheres.set(id, metrics);
  }

  getArea(id: string): number | undefined {
    return this.rectangles.get(id)?.area;
  }

  getPerimeter(id: string): number | undefined {
    return this.rectangles.get(id)?.perimeter;
  }

  getVolume(id: string): number | undefined {
    return this.spheres.get(id)?.volume;
  }

  getSurfaceArea(id: string): number | undefined {
    return this.spheres.get(id)?.surfaceArea;
  }
}
