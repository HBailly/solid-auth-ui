import { v4 as uuidv4 } from 'uuid';
import { Wrapper, WrapperStore } from '@/shared/model/wrapper.store';
import { AccessAuthorization } from '@/shared/model/interop/wrappers/accessAuthorization.wrapper';
import { AuthorizationRegistryShape, AuthorizationRegistryShapeType } from '@/shared/model/interop/shapes/authorizationRegistry.shape';

export class AuthorizationRegistry implements Wrapper<AuthorizationRegistryShape> {
  id: string;
  type: AuthorizationRegistryShapeType.AuthorizationRegistry;
  hasAccessAuthorization: string | string[];
  
  shape: AuthorizationRegistryShape;
  
  _accessAuthorizations: AccessAuthorization[] = [];

  graphify(store: WrapperStore): void {
    if (Array.isArray(this.hasAccessAuthorization)) {
      this.hasAccessAuthorization.forEach(authorization =>
        this._accessAuthorizations.push(store.get(authorization) as AccessAuthorization)
      );
    } else {
      this._accessAuthorizations.push(store.get(this.hasAccessAuthorization) as AccessAuthorization);
    }
  }

  wrap(shape: AuthorizationRegistryShape): Wrapper<AuthorizationRegistryShape> {
    this.shape = shape;

    this.id = shape.id;
    this.type = shape.type;
    this.hasAccessAuthorization = shape.hasAccessAuthorization;

    return this;
  }

  newAccessAuthorizationId(): [string, string] {
    const id = uuidv4();
    const path = this.id.concat(id);
    return [id, path];
  }

  newDataAuthorizationId(accessAuthorization: AccessAuthorization) {
    const id = uuidv4();
    const path = accessAuthorization.id.concat('/', id);
    return [id, path];
  }
}
