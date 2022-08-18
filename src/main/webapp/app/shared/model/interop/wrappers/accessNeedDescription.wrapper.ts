import { Wrapper, WrapperStore } from '@/shared/model/wrapper.store';
import { AccessDescriptionSet } from '@/shared/model/interop/wrappers/accessDescriptionSet.wrapper';
import { AccessNeed } from '@/shared/model/interop/wrappers/accessNeed.wrapper';
import { AccessNeedDescriptionShape, AccessNeedDescriptionShapeType } from '@/shared/model/interop/shapes/accessNeedDescription.shape';

export class AccessNeedDescription implements Wrapper<AccessNeedDescriptionShape> {
  id: string;
  type: AccessNeedDescriptionShapeType.AccessNeedDescription;
  inAccessDescriptionSet: string;
  hasAccessNeed: string;
  prefLabel: string;
  description: string;

  shape: AccessNeedDescriptionShape;

  _language: string;

  graphify(store: WrapperStore): void {
    if (this.inAccessDescriptionSet) {
      const set = store.get(this.inAccessDescriptionSet) as AccessDescriptionSet;
      this._language = set.usesLanguage;
      set._accessNeedDescriptionsByLanguage.set(this.id, this);
    }
  }

  wrap(shape: AccessNeedDescriptionShape) {
    this.shape = shape;

    this.id = shape.id;
    this.type = shape.type;
    this.inAccessDescriptionSet = shape.inAccessDescriptionSet;
    this.hasAccessNeed = shape.hasAccessNeed;
    this.prefLabel = shape.prefLabel;
    this.description = shape.description;

    return this;
  }
}
