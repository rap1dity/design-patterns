import { Point3DEntity } from '../entities/point3d.entity';

export class Point3DService {
  distance(p1: Point3DEntity, p2: Point3DEntity): number {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    const dz = p1.z - p2.z;

    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  isOnPlaneXY(point: Point3DEntity): boolean {
    return point.z === 0;
  }

  isOnPlaneXZ(point: Point3DEntity): boolean {
    return point.y === 0;
  }

  isOnPlaneYZ(point: Point3DEntity): boolean {
    return point.x === 0;
  }
}
