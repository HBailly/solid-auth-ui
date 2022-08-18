import { Wrapper, WrapperStore } from '@/shared/model/wrapper.store';
import { ContainerShapeTreeShape } from '@/shared/model/shapetree/shapes/containerShapeTree.shape';
import { ExpectsTypeType, ShapeTreeType } from '@/shared/model/shapetree/enums/expectsType.enum';

export class ContainerShapeTree implements Wrapper<ContainerShapeTreeShape> {
  id: string;
  type: ShapeTreeType.ShapeTree;
  expectsType: ExpectsTypeType.Container;
  contains: string;

  shape: ContainerShapeTreeShape;

  wrap(shape: ContainerShapeTreeShape) {
    this.shape = shape;

    this.id = shape.id;
    this.type = shape.type;
    this.expectsType = shape.expectsType;
    this.contains = shape.contains;

    return this;
  }

  graphify(store: WrapperStore): void {}
}
