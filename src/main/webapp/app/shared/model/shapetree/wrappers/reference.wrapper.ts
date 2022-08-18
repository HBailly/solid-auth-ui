import { Wrapper, WrapperStore } from '@/shared/model/wrapper.store';
import { ReferenceShape } from '@/shared/model/shapetree/shapes/resourceShapeTree.shape';

export class Reference implements Wrapper<ReferenceShape> {
  id: string;
  hasShapeTree: string;
  viaPredicate?: string;
  viaShapePath?: string;

  shape: ReferenceShape;

  wrap(shape: ReferenceShape) {
    this.shape = shape;

    this.id = shape.id;
    this.hasShapeTree = shape.hasShapeTree;
    this.viaPredicate = shape.viaPredicate;
    this.viaShapePath = shape.viaShapePath;

    return this;
  }

  graphify(store: WrapperStore): void {}
}
