import { Wrapper, WrapperStore } from '@/shared/model/wrapper.store';
import { SocialAgent } from '@/shared/model/interop/wrappers/socialAgent.wrapper';
import { AccessRequestShape, AccessRequestShapeType } from '@/shared/model/interop/shapes/accessRequest.shape';

export class AccessRequest implements Wrapper<AccessRequestShape> {
  id: string;
  fromSocialAgent: string;
  hasAccessNeedGroup: string;
  toSocialAgent: string;
  type: AccessRequestShapeType.AccessRequest;

  shape: AccessRequestShape;

  _from: SocialAgent;
  _to: SocialAgent;

  graphify(store: WrapperStore): void {
    this._from = store.get(this.fromSocialAgent) as SocialAgent;
    this._to = store.get(this.toSocialAgent) as SocialAgent;
  }

  wrap(shape: AccessRequestShape): Wrapper<AccessRequestShape> {
    this.shape = shape;

    this.id = shape.id;
    this.fromSocialAgent = shape.fromSocialAgent;
    this.hasAccessNeedGroup = shape.hasAccessNeedGroup;
    this.toSocialAgent = shape.toSocialAgent;
    this.type = shape.type;

    return this;
  }
}
