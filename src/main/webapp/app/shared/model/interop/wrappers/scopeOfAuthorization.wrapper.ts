import { SocialAgent } from '@/shared/model/interop/wrappers/socialAgent.wrapper';
import { DataRegistration } from '@/shared/model/interop/wrappers/dataRegistration.wrapper';
import { DataAuthorization } from '@/shared/model/interop/wrappers/dataAuthorization.wrapper';
import { Resource } from '@/shared/model/terms/wrappers/resource.wrapper';
import { ScopeOfAuthorizationType } from '@/shared/model/interop/enums/scopeOfAuthorization.enum';

export interface ScopeParameter {
  type: ScopeOfAuthorizationType;
}

export class ScopeOfAuthorization {
  parameter: ScopeParameter = new All();
}

export class All implements ScopeParameter {
  type: ScopeOfAuthorizationType = ScopeOfAuthorizationType.All;
}

export class AllFromAgent implements ScopeParameter {
  type: ScopeOfAuthorizationType = ScopeOfAuthorizationType.AllFromAgent;
  owner: SocialAgent[];
}

export class AllFromRegistry implements ScopeParameter {
  type: ScopeOfAuthorizationType = ScopeOfAuthorizationType.AllFromRegistry;
  owner: SocialAgent;
  registration: Set<DataRegistration>;
}

export class SelectedFromRegistry implements ScopeParameter {
  type: ScopeOfAuthorizationType = ScopeOfAuthorizationType.SelectedFromRegistry;
  owner: SocialAgent;
  registration: Set<DataRegistration>;
  instances: Resource[];
}

export class Dependent implements ScopeParameter {
  type: ScopeOfAuthorizationType = ScopeOfAuthorizationType.Dependent;
  depends: DataAuthorization;
}

export class Inherited implements ScopeParameter {
  type: ScopeOfAuthorizationType = ScopeOfAuthorizationType.Inherited;
  owner: SocialAgent;
  registration?: DataRegistration;
  instances: Resource[];
  inherits: DataAuthorization;
}

export class NoAccess implements ScopeParameter {
  type: ScopeOfAuthorizationType = ScopeOfAuthorizationType.NoAccess;
}
