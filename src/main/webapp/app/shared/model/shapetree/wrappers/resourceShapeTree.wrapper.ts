import { Wrapper, WrapperStore } from '@/shared/model/wrapper.store';
import { ReferenceShape, ResourceShapeTreeShape } from '@/shared/model/shapetree/shapes/resourceShapeTree.shape';
import { ExpectsTypeType, ShapeTreeType } from '@/shared/model/shapetree/enums/expectsType.enum';
import { Reference } from '@/shared/model/shapetree/wrappers/reference.wrapper';

export class ResourceShapeTree implements Wrapper<ResourceShapeTreeShape> {
  type: ShapeTreeType.ShapeTree;
  expectsType: ExpectsTypeType.Resource;
  references: ReferenceShape;
  prefLabel: string;
  definition: string;
  hasData: string;

  graphify(store: WrapperStore): void {}

  id: string;
  shape: ResourceShapeTreeShape;

  wrap(shape: ResourceShapeTreeShape) {
    this.shape = shape;

    this.id = shape.id;
    this.type = shape.type;
    this.expectsType = shape.expectsType;
    this.prefLabel = shape.prefLabel;
    this.definition = shape.definition;
    this.hasData = shape.hasData;

    if (shape.references) this.references = new Reference().wrap(shape.references);

    return this;
  }
}
