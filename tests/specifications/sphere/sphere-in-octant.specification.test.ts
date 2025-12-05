import { SphereInOctantSpecification } from '../../../src/specifications/sphere/sphere-in-octant.specification';
import { Octant3D } from '../../../src/specifications/enums/octant-3d.enum';
import { SphereEntity } from '../../../src/entities/sphere.entity';
import { Point3DEntity } from '../../../src/entities/point3d.entity';

function makeSphere(x: number, y: number, z: number): SphereEntity {
  return new SphereEntity('s', new Point3DEntity(x, y, z), 1);
}

describe('SphereInOctantSpecification', () => {
  test('matches all 8 octants (full branch coverage)', () => {
    expect(new SphereInOctantSpecification(Octant3D.I)
      .isSatisfiedBy(makeSphere(1, 1, 1))).toBe(true);

    expect(new SphereInOctantSpecification(Octant3D.II)
      .isSatisfiedBy(makeSphere(-1, 1, 1))).toBe(true);

    expect(new SphereInOctantSpecification(Octant3D.III)
      .isSatisfiedBy(makeSphere(-1, -1, 1))).toBe(true);

    expect(new SphereInOctantSpecification(Octant3D.IV)
      .isSatisfiedBy(makeSphere(1, -1, 1))).toBe(true);

    expect(new SphereInOctantSpecification(Octant3D.V)
      .isSatisfiedBy(makeSphere(1, 1, -1))).toBe(true);

    expect(new SphereInOctantSpecification(Octant3D.VI)
      .isSatisfiedBy(makeSphere(-1, 1, -1))).toBe(true);

    expect(new SphereInOctantSpecification(Octant3D.VII)
      .isSatisfiedBy(makeSphere(-1, -1, -1))).toBe(true);

    expect(new SphereInOctantSpecification(Octant3D.VIII)
      .isSatisfiedBy(makeSphere(1, -1, -1))).toBe(true);
  });

  test('returns false when point does not match expected octant', () => {
    const spec = new SphereInOctantSpecification(Octant3D.I);
    expect(spec.isSatisfiedBy(makeSphere(-1, -1, -1))).toBe(false);
  });
});
