import { Wrapper, WrapperStore } from '@/shared/model/wrapper.store';
import { AccessDescriptionSet } from '@/shared/model/interop/wrappers/accessDescriptionSet.wrapper';
import { AccessNeedGroup } from '@/shared/model/interop/wrappers/accessNeedGroup.wrapper';
import {
  AccessNeedGroupDescriptionShape,
  AccessNeedGroupDescriptionShapeType,
} from '@/shared/model/interop/shapes/accessNeedGroupDescription.shape';

export class AccessNeedGroupDescription implements Wrapper<AccessNeedGroupDescriptionShape> {
  id: string;
  type: AccessNeedGroupDescriptionShapeType.AccessNeedGroupDescription;
  inAccessDescriptionSet: string;
  hasAccessNeedGroup: string;
  prefLabel: string;
  description: string;

  shape: AccessNeedGroupDescriptionShape;

  _language: string;

  graphify(store: WrapperStore): void {
    if (this.inAccessDescriptionSet) {
      const set = store.get(this.inAccessDescriptionSet) as AccessDescriptionSet;
      set._accessNeedGroupDescriptionsByLanguage.set(this.id, this);
      this._language = set.usesLanguage;
    }
  }

  wrap(shape: AccessNeedGroupDescriptionShape) {
    this.shape = shape;

    this.id = shape.id;
    this.type = shape.type;
    this.inAccessDescriptionSet = shape.inAccessDescriptionSet;
    this.hasAccessNeedGroup = shape.hasAccessNeedGroup;
    this.prefLabel = shape.prefLabel;
    this.description = shape.description;

    return this;
  }
}
