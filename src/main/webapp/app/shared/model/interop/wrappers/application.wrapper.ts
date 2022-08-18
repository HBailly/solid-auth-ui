import { AccessNeedGroup } from '@/shared/model/interop/wrappers/accessNeedGroup.wrapper';
import { Wrapper, WrapperStore } from '@/shared/model/wrapper.store';
import { ApplicationShape, ApplicationShapeType } from '@/shared/model/interop/shapes/application.shape';
import { SocialAgent } from '@/shared/model/interop/wrappers/socialAgent.wrapper';
import { toSafeArray } from '@/shared/model/utils';

export class Application implements Wrapper<ApplicationShape> {
  id: string;
  type: ApplicationShapeType.Application;
  applicationName: string;
  applicationDescription: string;
  applicationAuthor: string;
  applicationThumbnail: string;
  hasAccessNeedGroup: string | string[];
  
  shape: ApplicationShape;

  _accessNeedGroups: Map<string, AccessNeedGroup> = new Map<string, AccessNeedGroup>();
  _author: SocialAgent;

  public graphify(store: WrapperStore): void {
    if (this.hasAccessNeedGroup) {
      toSafeArray(this.hasAccessNeedGroup)
        .map(group => store.get(group) as AccessNeedGroup)
        .filter(need => need != null)
        .forEach(group => this._accessNeedGroups.set(group.id, group));
    }
    this._author = store.get(this.applicationAuthor) as SocialAgent;
  }

  wrap(shape: ApplicationShape) {
    this.shape = shape;

    this.id = shape.id;
    this.type = shape.type;
    this.applicationName = shape.applicationName;
    this.applicationDescription = shape.applicationDescription;
    this.applicationAuthor = shape.applicationAuthor;
    this.applicationThumbnail = shape.applicationThumbnail;
    this.hasAccessNeedGroup = shape.hasAccessNeedGroup;

    return this;
  }

  isSelected() {
    return Array.from(this._accessNeedGroups.values()).filter(group => group._isSelected).length > 0;
  }

  isRequiredOnly() {
    return Array.from(this._accessNeedGroups.values())
      .map(group => group.isRequiredOnly())
      .reduce((a, b) => a && b);
  }

  isAllOptional() {
    return Array.from(this._accessNeedGroups.values())
      .map(group => group.isAllOptional())
      .reduce((a, b) => a && b);
  }
}
