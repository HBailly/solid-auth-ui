import { Wrapper, WrapperStore } from '@/shared/model/wrapper.store';
import {
  DataAuthorization,
  DataAuthorizationDependent,
  DataAuthorizationInherited,
} from '@/shared/model/interop/wrappers/dataAuthorization.wrapper';
import { Context } from '@/shared/model/context.model';
import { AccessNeedGroup } from '@/shared/model/interop/wrappers/accessNeedGroup.wrapper';
import { AccessAuthorizationShape, AccessAuthorizationShapeType } from '@/shared/model/interop/shapes/accessAuthorization.shape';
import { ScopeOfAuthorizationType } from '@/shared/model/interop/enums/scopeOfAuthorization.enum';

export class AccessAuthorization implements Wrapper<AccessAuthorizationShape> {
  id: string;
  type: AccessAuthorizationShapeType.AccessAuthorization;
  grantedAt: Date;
  grantedBy: string;
  grantedWith: string;
  grantee: string;
  hasAccessNeedGroup: string | string[];
  hasDataAuthorization: string | string[];
  replaces: string;
  
  shape: AccessAuthorizationShape;
  
  _uuid: string;
  _dataAuthorizationsById: Map<string, DataAuthorization> = new Map();
  _accessNeedGroups: AccessNeedGroup[] = [];

  static from(context: Context): AccessAuthorization {
    console.log('Granting new access authorization...');
    const authorization = new AccessAuthorization();

    const [uuid, id] = context.agent._registrySet._authorizationRegistry.newAccessAuthorizationId();
    authorization._uuid = uuid;
    authorization.id = id;
    authorization.type = AccessAuthorizationShapeType.AccessAuthorization;
    authorization.grantedBy = context.agent.id;
    authorization.grantedWith = context.authorizationAgent.id;
    authorization.grantedAt = new Date();
    authorization.grantee = context.application.id;
    authorization.hasAccessNeedGroup = [];
    const hasDataAuthorization = [];
    const hasAccessNeedGroup = [];

    authorization._accessNeedGroups = Array.from(context.application._accessNeedGroups.values());

    authorization._accessNeedGroups
      .filter(group => group._isSelected)
      .map(group => {
        hasAccessNeedGroup.push(group.id);
        return group;
      })
      .map(group => group.getAccessNeedsAsArray())
      .flatMap(need => need)
      .filter(need => need._isSelected)
      .map(need => {
        return DataAuthorization.from(need, authorization, context);
      })
      .forEach(data => {
        authorization._dataAuthorizationsById.set(data._accessNeed.id, data);
        hasDataAuthorization.push(data.id);
      });

    Array.from(authorization._dataAuthorizationsById.values())
      .filter(auth => auth.scopeOfAuthorization === ScopeOfAuthorizationType.Inherited)
      .map(auth => auth as DataAuthorizationInherited)
      .forEach(auth => {
        const ascendantNeed = auth._accessNeed._ascendantNeed;
        const ascendantAuth = authorization._dataAuthorizationsById.get(ascendantNeed.id);
        auth.inheritsFrom(ascendantAuth);
        const parent = auth._accessNeed._parentNeed;
        const parentAuth = authorization._dataAuthorizationsById.get(parent.id);
        if (parentAuth.scopeOfAuthorization === ScopeOfAuthorizationType.Dependent) {
          auth.dependsFrom(parentAuth);
        }
      });

    Array.from(authorization._dataAuthorizationsById.values())
      .filter(auth => auth.scopeOfAuthorization === ScopeOfAuthorizationType.Dependent)
      .map(auth => auth as DataAuthorizationDependent)
      .forEach(auth => {
        const parent = auth._accessNeed._parentNeed;
        const parentAuth = authorization._dataAuthorizationsById.get(parent.id);
        auth.dependsFrom(parentAuth);
      });

    authorization.hasAccessNeedGroup = hasAccessNeedGroup;
    authorization.hasDataAuthorization = hasDataAuthorization;

    return authorization;
  }

  graphify(store: WrapperStore): void {}

  wrap(shape: AccessAuthorizationShape) {
    this.shape = shape;

    this.id = shape.id;
    this.type = shape.type;
    this.grantedAt = shape.grantedAt;
    this.grantedBy = shape.grantedBy;
    this.grantedWith = shape.grantedWith;
    this.grantee = shape.grantee;
    this.hasAccessNeedGroup = shape.hasAccessNeedGroup;
    this.hasDataAuthorization = shape.hasDataAuthorization;
    this.replaces = shape.replaces;

    return this;
  }

  strip() {
    const stripped = new AccessAuthorization();
    stripped.id = this.id;
    stripped.type = this.type;
    stripped.grantedAt = this.grantedAt;
    stripped.grantedBy = this.grantedBy;
    stripped.grantedWith = this.grantedWith;
    stripped.grantee = this.grantee;
    stripped.hasAccessNeedGroup = this.hasAccessNeedGroup;
    stripped.hasDataAuthorization = this.hasDataAuthorization;
    stripped.replaces = this.replaces;

    delete stripped._uuid;
    delete stripped._dataAuthorizationsById;
    delete stripped._accessNeedGroups;

    return stripped;
  }
}
