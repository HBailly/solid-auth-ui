import { Wrapper, WrapperStore } from '@/shared/model/wrapper.store';
import { ApplicationRegistration } from '@/shared/model/interop/wrappers/applicationRegistration.wrapper';
import { SocialAgentRegistration } from '@/shared/model/interop/wrappers/socialAgentRegistration.wrapper';
import { AgentRegistryShape, AgentRegistryShapeType } from '@/shared/model/interop/shapes/agentRegistry.shape';
import { toSafeArray } from '@/shared/model/utils';

export class AgentRegistry implements Wrapper<AgentRegistryShape> {
  id: string;
  type: AgentRegistryShapeType.AgentRegistry;
  hasApplicationRegistration: string | string[];
  hasSocialAgentRegistration: string | string[];

  shape: AgentRegistryShape;

  _applicationRegistrations: Array<ApplicationRegistration> = [];
  _agentRegistrations: Array<SocialAgentRegistration> = [];

  wrap(shape: AgentRegistryShape) {
    this.shape = shape;

    this.id = shape.id;
    this.type = shape.type;
    this.hasApplicationRegistration = shape.hasApplicationRegistration;
    this.hasSocialAgentRegistration = shape.hasSocialAgentRegistration;

    return this;
  }

  graphify(store: WrapperStore): void {
    if (this.hasApplicationRegistration) {
      toSafeArray(this.hasApplicationRegistration)
        .map(registration => store.get(registration) as ApplicationRegistration)
        .filter(registration => registration != null)
        .forEach(registration => this._applicationRegistrations.push(registration));
    }

    if (this.hasSocialAgentRegistration) {
      toSafeArray(this.hasSocialAgentRegistration)
        .map(registration => store.get(registration) as SocialAgentRegistration)
        .filter(registration => registration != null)
        .forEach(registration => this._agentRegistrations.push(registration));
    }
  }
}
