import { Wrapper, WrapperStore } from '@/shared/model/wrapper.store';
import { Context } from '@/shared/model/context.model';
import { AccessNeed } from '@/shared/model/interop/wrappers/accessNeed.wrapper';
import { AllFromAgent, AllFromRegistry, SelectedFromRegistry } from '@/shared/model/interop/wrappers/scopeOfAuthorization.wrapper';
import { DataAuthorizationShape, DataAuthorizationShapeType } from '@/shared/model/interop/shapes/dataAuthorization.shape';
import { ScopeOfAuthorizationType } from '@/shared/model/interop/enums/scopeOfAuthorization.enum';
import { dataAuthorizationSelectedFromRegistry } from '@/shared/model/interop/shapes/dataAuthorizationSelectedFromRegistry.shape';
import { Shape } from 'shex-methods';
import { dataAuthorizationAll } from '@/shared/model/interop/shapes/dataAuthorizationAll.shape';
import { dataAuthorizationInherited } from '@/shared/model/interop/shapes/dataAuthorizationInherited.shape';
import { dataAuthorizationAllFromAgent } from '@/shared/model/interop/shapes/dataAuthorizationAllFromAgent.shape';
import { dataAuthorizationAllFromRegistry } from '@/shared/model/interop/shapes/dataAuthorizationAllFromRegistry.shape';
import { AccessAuthorization } from '@/shared/model/interop/wrappers/accessAuthorization.wrapper';
import { dataAuthorizationDependent } from '@/shared/model/interop/shapes/dataAuthorizationDependent.shape';

export class DataAuthorization implements Wrapper<DataAuthorizationShape> {
  id: string;
  type: DataAuthorizationShapeType.DataAuthorization;
  grantee: string;
  satisfiesAccessNeed: string;
  registeredShapeTree: string;
  accessMode: string | string[];
  creatorAccessMode: string | string[];
  scopeOfAuthorization: ScopeOfAuthorizationType;
  
  shape: DataAuthorizationShape;
  
  _uuid: string;
  _model: Shape<any, any>;
  _accessNeed: AccessNeed;

  static from(source: AccessNeed | DataAuthorization, accessAuthorization: AccessAuthorization, context: Context): DataAuthorization {
    console.log('Granting new data authorization...');

    const authorization = new DataAuthorizationInherited();

    const [uuid, id] = context.agent._registrySet._authorizationRegistry.newDataAuthorizationId(accessAuthorization);
    authorization._uuid = uuid;
    authorization.id = id;
    authorization.type = DataAuthorizationShapeType.DataAuthorization;
    authorization.grantee = context.agent.id;
    authorization.satisfiesAccessNeed = source.id;
    authorization.accessMode = source.accessMode;
    authorization.creatorAccessMode = source.creatorAccessMode;
    authorization.registeredShapeTree = source.registeredShapeTree;

    authorization.scopeOfAuthorization =
      source instanceof DataAuthorization ? source.scopeOfAuthorization : source._scopeOfAuthorization.parameter.type;

    authorization._accessNeed = source instanceof DataAuthorization ? source._accessNeed : source;

    if (source instanceof AccessNeed) {
      return authorization.extends(source, context);
    }

    return authorization as DataAuthorization;
  }

  graphify(store: WrapperStore): void {}

  wrap(shape: DataAuthorizationShape): Wrapper<DataAuthorizationShape> {
    this.shape = shape;

    this.id = shape.id;
    this.type = shape.type;
    this.grantee = shape.grantee;
    this.satisfiesAccessNeed = shape.satisfiesAccessNeed;
    this.registeredShapeTree = shape.registeredShapeTree;
    this.accessMode = shape.accessMode;
    this.creatorAccessMode = shape.creatorAccessMode;
    this.scopeOfAuthorization = shape.scopeOfAuthorization;

    return this.extends();
  }

  public inheritsFrom(ascendant: DataAuthorization) {}

  public dependsFrom(ascendant: DataAuthorization) {}

  strip() {
    const auth = new DataAuthorization();
    auth.id = this.id;
    auth.type = this.type;
    auth.grantee = this.grantee;
    auth.satisfiesAccessNeed = this.satisfiesAccessNeed;
    auth.registeredShapeTree = this.registeredShapeTree;
    auth.accessMode = this.accessMode;
    auth.creatorAccessMode = this.creatorAccessMode;
    auth.scopeOfAuthorization = this.scopeOfAuthorization;

    // @ts-ignore
    const inherited = this as DataAuthorizationInherited;
    if (inherited.dataOwner) auth['dataOwner'] = inherited.dataOwner;
    if (inherited.hasDataRegistration) auth['hasDataRegistration'] = inherited.hasDataRegistration;
    if (inherited.hasDataInstance) auth['hasDataInstance'] = inherited.hasDataInstance;
    if (inherited.inheritsFromAuthorization) auth['inheritsFromAuthorization'] = inherited.inheritsFromAuthorization;

    // @ts-ignore
    const dependent = this as DataAuthorizationDependent;
    if (dependent.dependsFromAuthorization) auth['dependsFromAuthorization'] = dependent.dependsFromAuthorization;

    delete auth._uuid;
    delete auth._accessNeed;

    return auth;
  }

  private extends(need?: AccessNeed, context?: Context): DataAuthorization {
    const scope = need._scopeOfAuthorization.parameter as unknown;
    const auth = this as unknown;

    switch (this.scopeOfAuthorization) {
      case ScopeOfAuthorizationType.All:
        const all = auth as DataAuthorizationAll;
        all._model = dataAuthorizationAll;
        return this as DataAuthorizationAll;

      case ScopeOfAuthorizationType.AllFromAgent:
        const allFromAgent = auth as DataAuthorizationAllFromAgent;
        if (scope) {
          const extendedScope = scope as AllFromAgent;
          allFromAgent._model = dataAuthorizationAllFromAgent;
          allFromAgent.dataOwner = Array.from(extendedScope.owner).map(agent => agent.id);
        }
        return allFromAgent;

      case ScopeOfAuthorizationType.AllFromRegistry:
        const allFromRegistry = auth as DataAuthorizationAllFromRegistry;
        if (scope) {
          const extendedScope = scope as AllFromRegistry;
          allFromRegistry._model = dataAuthorizationAllFromRegistry;
          allFromRegistry.dataOwner = extendedScope.owner.id;
          allFromRegistry.hasDataRegistration = Array.from(extendedScope.registration.values()).map(reg => reg.id);
        }
        return allFromRegistry;

      case ScopeOfAuthorizationType.SelectedFromRegistry:
        const selectedFromRegistry = auth as DataAuthorizationSelectedFromRegistry;
        if (scope) {
          const extendedScope = scope as SelectedFromRegistry;
          selectedFromRegistry._model = dataAuthorizationSelectedFromRegistry;
          selectedFromRegistry.dataOwner = extendedScope.owner.id;
          selectedFromRegistry.hasDataInstance = extendedScope.instances.map(i => i.id);
        }
        return selectedFromRegistry;

      case ScopeOfAuthorizationType.Dependent:
        const dependent = auth as DataAuthorizationDependent;
        dependent._model = dataAuthorizationDependent;
        return dependent;

      case ScopeOfAuthorizationType.Inherited:
        const inherited = auth as DataAuthorizationInherited;
        inherited._model = dataAuthorizationInherited;
        return inherited;

      default:
        throw new Error('Unsupported authorization type');
    }
  }
}

export class DataAuthorizationAll extends DataAuthorization {}

export class DataAuthorizationAllFromAgent extends DataAuthorization {
  dataOwner: string | string[];

  public inheritsFrom(ascendant: DataAuthorization) {
    const originalScope = ascendant as DataAuthorizationInherited;
    this.dataOwner = originalScope.dataOwner;
  }
}

export class DataAuthorizationAllFromRegistry extends DataAuthorization {
  dataOwner: string;
  hasDataRegistration: string | string[];

  public inheritsFrom(ascendant: DataAuthorization) {
    const originalScope = ascendant as DataAuthorizationInherited;
    this.dataOwner = originalScope.dataOwner;
    this.hasDataRegistration = originalScope.hasDataRegistration;
  }
}

export class DataAuthorizationSelectedFromRegistry extends DataAuthorization {
  dataOwner: string;
  hasDataRegistration: string | string[];
  hasDataInstance: string | string[];

  public inheritsFrom(ascendant: DataAuthorization) {
    const originalScope = ascendant as DataAuthorizationInherited;
    this.dataOwner = originalScope.dataOwner;
    this.hasDataRegistration = originalScope.hasDataRegistration;
    this.hasDataInstance = originalScope.hasDataInstance;
  }
}

export class DataAuthorizationDependent extends DataAuthorization {
  dataOwner: string;
  hasDataRegistration?: string;
  hasDataInstance: string | string[];
  dependsFromAuthorization: string;

  public dependsFrom(parent: DataAuthorization) {
    this.dependsFromAuthorization = parent['id'];
  }
}

export class DataAuthorizationInherited extends DataAuthorization {
  dataOwner: string;
  hasDataRegistration?: string;
  hasDataInstance: string | string[];
  inheritsFromAuthorization: string;
  dependsFromAuthorization: string;

  public dependsFrom(parent: DataAuthorization) {
    this.dependsFromAuthorization = parent['id'];
  }

  public inheritsFrom(ascendant: DataAuthorization) {
    const originalScope = ascendant;
    this.dataOwner = originalScope['dataOwner'];
    this.hasDataRegistration = originalScope['hasDataRegistration'];
    this.hasDataInstance = originalScope['hasDataInstance'];
    this.inheritsFromAuthorization = originalScope['id'];
  }
}
