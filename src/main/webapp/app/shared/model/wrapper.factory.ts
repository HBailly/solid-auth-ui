import { Wrapper } from '@/shared/model/wrapper.store';
import { Application } from '@/shared/model/interop/wrappers/application.wrapper';

import { SocialAgent } from '@/shared/model/interop/wrappers/socialAgent.wrapper';
import { AccessNeedGroup } from '@/shared/model/interop/wrappers/accessNeedGroup.wrapper';
import { AccessNeed } from '@/shared/model/interop/wrappers/accessNeed.wrapper';
import { AccessDescriptionSet } from '@/shared/model/interop/wrappers/accessDescriptionSet.wrapper';
import { AccessNeedDescription } from '@/shared/model/interop/wrappers/accessNeedDescription.wrapper';
import { AccessNeedGroupDescription } from '@/shared/model/interop/wrappers/accessNeedGroupDescription.wrapper';
import { RegistrySet } from '@/shared/model/interop/wrappers/registrySet.wrapper';
import { DataRegistry } from '@/shared/model/interop/wrappers/dataRegistry.wrapper';
import { DataRegistration } from '@/shared/model/interop/wrappers/dataRegistration.wrapper';
import { AgentRegistry } from '@/shared/model/interop/wrappers/agentRegistry.wrapper';
import { ApplicationRegistration } from '@/shared/model/interop/wrappers/applicationRegistration.wrapper';
import { SocialAgentRegistration } from '@/shared/model/interop/wrappers/socialAgentRegistration.wrapper';
import { ResourceShapeTree } from '@/shared/model/shapetree/wrappers/resourceShapeTree.wrapper';
import { AccessAuthorization } from '@/shared/model/interop/wrappers/accessAuthorization.wrapper';
import { AuthorizationRegistry } from '@/shared/model/interop/wrappers/authorizationRegistry.wrapper';
import { Resource } from '@/shared/model/terms/wrappers/resource.wrapper';
import { TermShape } from '@/shared/model/terms/shapes/term.shapes';
import { ContainerShapeTree } from '@/shared/model/shapetree/wrappers/containerShapeTree.wrapper';
import { Shape } from '../../../../../../../../shex-methods';
import { ApplicationShape, ApplicationShapeType } from '@/shared/model/interop/shapes/application.shape';
import {
  SocialAgentRegistrationShape,
  SocialAgentRegistrationShapeType,
} from '@/shared/model/interop/shapes/socialAgentRegistration.shape';
import { AccessAuthorizationShape, AccessAuthorizationShapeType } from '@/shared/model/interop/shapes/accessAuthorization.shape';
import { ExpectsTypeType, ShapeTreeType } from '@/shared/model/shapetree/enums/expectsType.enum';
import { AuthorizationRegistryShape, AuthorizationRegistryShapeType } from '@/shared/model/interop/shapes/authorizationRegistry.shape';
import { ContainerShapeTreeShape } from '@/shared/model/shapetree/shapes/containerShapeTree.shape';
import { AccessNeedDescriptionShape, AccessNeedDescriptionShapeType } from '@/shared/model/interop/shapes/accessNeedDescription.shape';
import { AgentRegistryShape, AgentRegistryShapeType } from '@/shared/model/interop/shapes/agentRegistry.shape';
import { SocialAgentShape, SocialAgentShapeType } from '@/shared/model/interop/shapes/socialAgent.shape';
import {
  AccessNeedGroupDescriptionShape,
  AccessNeedGroupDescriptionShapeType,
} from '@/shared/model/interop/shapes/accessNeedGroupDescription.shape';
import { RegistrySetShape, RegistrySetShapeType } from '@/shared/model/interop/shapes/registrySet.shape';
import { DataRegistryShape, DataRegistryShapeType } from '@/shared/model/interop/shapes/dataRegistry.shape';
import { ResourceShapeTreeShape } from '@/shared/model/shapetree/shapes/resourceShapeTree.shape';
import { AccessNeedShape, AccessNeedShapeType } from '@/shared/model/interop/shapes/accessNeed.shape';
import {
  ApplicationRegistrationShape,
  ApplicationRegistrationShapeType,
} from '@/shared/model/interop/shapes/applicationRegistration.shape';
import { DataRegistrationShape, DataRegistrationShapeType } from '@/shared/model/interop/shapes/dataRegistration.shape';
import { AccessNeedGroupShape, AccessNeedGroupShapeType } from '@/shared/model/interop/shapes/accessNeedGroup.shape';
import { AccessDescriptionSetShape, AccessDescriptionSetShapeType } from '@/shared/model/interop/shapes/accessDescriptionSet.shape';

export class WrapperFactory {
  static wrap(message: Shape<any, any>): Wrapper<any> {
    if (Array.isArray(message.type)) {
      for (const arbitrary of message.type) {
        const arbitraryWrap = WrapperFactory.from(message, arbitrary);
        if (arbitraryWrap) {
          return arbitraryWrap;
        }
      }
      console.log('Unsupported types: [%s]', message.type);
      return undefined;
    } else {
      return WrapperFactory.from(message, message.type as string);
    }
  }

  private static from(message, type: string) {
    switch (type) {
      case ApplicationShapeType.Application:
        return new Application().wrap(message as ApplicationShape);

      case SocialAgentShapeType.SocialAgent:
        return new SocialAgent().wrap(message as SocialAgentShape);

      case AccessNeedGroupShapeType.AccessNeedGroup:
        return new AccessNeedGroup().wrap(message as AccessNeedGroupShape);

      case AccessNeedShapeType.AccessNeed:
        return new AccessNeed().wrap(message as AccessNeedShape);

      case AccessDescriptionSetShapeType.AccessDescriptionSet:
        return new AccessDescriptionSet().wrap(message as AccessDescriptionSetShape);

      case AccessNeedGroupDescriptionShapeType.AccessNeedGroupDescription:
        return new AccessNeedGroupDescription().wrap(message as AccessNeedGroupDescriptionShape);

      case AccessNeedDescriptionShapeType.AccessNeedDescription:
        return new AccessNeedDescription().wrap(message as AccessNeedDescriptionShape);

      case RegistrySetShapeType.RegistrySet:
        return new RegistrySet().wrap(message as RegistrySetShape);

      case DataRegistryShapeType.DataRegistry:
        return new DataRegistry().wrap(message as DataRegistryShape);

      case DataRegistrationShapeType.DataRegistration:
        return new DataRegistration().wrap(message as DataRegistrationShape);

      case AgentRegistryShapeType.AgentRegistry:
        return new AgentRegistry().wrap(message as AgentRegistryShape);

      case SocialAgentRegistrationShapeType.SocialAgentRegistration:
        return new SocialAgentRegistration().wrap(message as SocialAgentRegistrationShape);

      case ApplicationRegistrationShapeType.ApplicationRegistration:
        return new ApplicationRegistration().wrap(message as ApplicationRegistrationShape);

      case AccessAuthorizationShapeType.AccessAuthorization:
        return new AccessAuthorization().wrap(message as AccessAuthorizationShape);

      case AuthorizationRegistryShapeType.AuthorizationRegistry:
        return new AuthorizationRegistry().wrap(message as AuthorizationRegistryShape);

      case ShapeTreeType.ShapeTree:
        if (message.expectsType == ExpectsTypeType.Container) return new ContainerShapeTree().wrap(message as ContainerShapeTreeShape);
        if (message.expectsType == ExpectsTypeType.Resource) return new ResourceShapeTree().wrap(message as ResourceShapeTreeShape);
        throw new Error('Unsupported Shapetree type: [' + type + ']');

      default:
        if (type.endsWith('project') || type.endsWith('task') || type.endsWith('contact') || type.endsWith('creditcard')) {
          return new Resource().wrap(message as TermShape);
        }
        throw new Error('Unsupported type: [' + type + ']');
    }
  }
}
