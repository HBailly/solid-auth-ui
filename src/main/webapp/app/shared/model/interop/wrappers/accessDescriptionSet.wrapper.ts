import { Wrapper, WrapperStore } from '@/shared/model/wrapper.store';
import { AccessNeedDescription } from '@/shared/model/interop/wrappers/accessNeedDescription.wrapper';
import { AccessNeedGroupDescription } from '@/shared/model/interop/wrappers/accessNeedGroupDescription.wrapper';
import { AccessDescriptionSetShape, AccessDescriptionSetShapeType } from '@/shared/model/interop/shapes/accessDescriptionSet.shape';

export class AccessDescriptionSet implements Wrapper<AccessDescriptionSetShape> {
  id: string;
  type: AccessDescriptionSetShapeType.AccessDescriptionSet;
  usesLanguage: string;

  shape: AccessDescriptionSetShape;

  _accessNeedGroupDescriptionsByLanguage: Map<string, AccessNeedGroupDescription> = new Map();
  _accessNeedDescriptionsByLanguage: Map<string, AccessNeedDescription> = new Map();

  graphify(store: WrapperStore): void {}

  wrap(shape: AccessDescriptionSetShape) {
    this.shape = shape;

    this.id = shape.id;
    this.type = shape.type;
    this.usesLanguage = shape.usesLanguage;

    return this;
  }
}
