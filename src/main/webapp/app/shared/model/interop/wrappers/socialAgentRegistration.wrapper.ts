import { WrapperStore, Wrapper } from '@/shared/model/wrapper.store';
import { SocialAgent } from '@/shared/model/interop/wrappers/socialAgent.wrapper';
import {
  SocialAgentRegistrationShape,
  SocialAgentRegistrationShapeType,
} from '@/shared/model/interop/shapes/socialAgentRegistration.shape';

export class SocialAgentRegistration implements Wrapper<SocialAgentRegistrationShape> {
  id: string;
  type: SocialAgentRegistrationShapeType.SocialAgentRegistration;
  reciprocalRegistration: string;
  registeredAgent: string;
  registeredAt: Date;
  registeredBy: string;
  registeredWith: string;
  updatedAt: Date;
  hasAccessGrant: string;

  shape: SocialAgentRegistrationShape;

  _registered: SocialAgent;

  wrap(shape: SocialAgentRegistrationShape) {
    this.shape = shape;

    this.id = shape.id;
    this.type = shape.type;
    this.reciprocalRegistration = shape.reciprocalRegistration;
    this.registeredAgent = shape.registeredAgent;
    this.registeredAt = shape.registeredAt;
    this.registeredBy = shape.registeredBy;
    this.registeredWith = shape.registeredWith;
    this.updatedAt = shape.updatedAt;
    this.hasAccessGrant = shape.hasAccessGrant;
    return this;
  }

  graphify(store: WrapperStore): void {
    this._registered = store.get(this.registeredAgent) as SocialAgent;
  }
}
