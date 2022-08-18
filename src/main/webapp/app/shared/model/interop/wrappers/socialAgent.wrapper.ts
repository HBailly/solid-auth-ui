import { WrapperStore, Wrapper } from '@/shared/model/wrapper.store';
import { RegistrySet } from '@/shared/model/interop/wrappers/registrySet.wrapper';
import { SocialAgentShape, SocialAgentShapeType } from '@/shared/model/interop/shapes/socialAgent.shape';

export class SocialAgent implements Wrapper<SocialAgentShape> {
  id: string;
  type: SocialAgentShapeType.SocialAgent;
  name: string;
  givenName: string;
  familyName: string;
  hasAuthorizationAgent: string;
  hasRegistrySet: string;
  hasInbox: string;
  hasAccessInbox: string;

  shape: SocialAgentShape;

  _registrySet: RegistrySet;

  static with(id: string) {
    const agent = new SocialAgent();
    agent.id = id;
    return agent;
  }

  wrap(shape: SocialAgentShape) {
    this.shape = shape;

    this.id = shape.id;
    this.name = shape.name;
    this.givenName = shape.givenName;
    this.familyName = shape.familyName;
    this.hasAuthorizationAgent = shape.hasAuthorizationAgent;
    this.hasRegistrySet = shape.hasRegistrySet;
    this.hasInbox = shape.hasInbox;
    this.hasAccessInbox = shape.hasAccessInbox;

    return this;
  }

  graphify(store: WrapperStore): void {
    this._registrySet = store.get(this.hasRegistrySet) as RegistrySet;
  }
}
