import { Wrapper, WrapperStore } from '@/shared/model/wrapper.store';
import { DataRegistry } from '@/shared/model/interop/wrappers/dataRegistry.wrapper';
import { AgentRegistry } from '@/shared/model/interop/wrappers/agentRegistry.wrapper';
import { AuthorizationRegistry } from '@/shared/model/interop/wrappers/authorizationRegistry.wrapper';
import { RegistrySetShape, RegistrySetShapeType } from '@/shared/model/interop/shapes/registrySet.shape';
import { toSafeArray } from '@/shared/model/utils';

export class RegistrySet implements RegistrySetShape, Wrapper<RegistrySetShape> {
  id: string;
  type: RegistrySetShapeType.RegistrySet;
  hasAgentRegistry: string;
  hasAuthorizationRegistry: string;
  hasDataRegistry: string | string[];

  shape: RegistrySetShape;

  _agentRegistry: AgentRegistry;
  _authorizationRegistry: AuthorizationRegistry;
  _dataRegistriesById: Map<string, DataRegistry> = new Map();

  wrap(shape: RegistrySetShape) {
    this.shape = shape;

    this.id = shape.id;
    this.type = shape.type;
    this.hasAgentRegistry = shape.hasAgentRegistry;
    this.hasAuthorizationRegistry = shape.hasAuthorizationRegistry;
    this.hasDataRegistry = shape.hasDataRegistry;

    return this;
  }

  graphify(store: WrapperStore): void {
    if (this.hasDataRegistry) {
      toSafeArray(this.hasDataRegistry)
        .map(registry => store.get(registry) as DataRegistry)
        .filter(registry => registry != null)
        .forEach(registry => this._dataRegistriesById.set(registry.id, registry));
    }

    this._authorizationRegistry = store.get(this.hasAuthorizationRegistry) as AuthorizationRegistry;
    this._agentRegistry = store.get(this.hasAgentRegistry) as AgentRegistry;
  }
}
