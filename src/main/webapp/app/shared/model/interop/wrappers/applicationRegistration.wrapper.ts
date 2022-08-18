import { WrapperStore, Wrapper } from '@/shared/model/wrapper.store';
import {
  ApplicationRegistrationShape,
  ApplicationRegistrationShapeType,
} from '@/shared/model/interop/shapes/applicationRegistration.shape';

export class ApplicationRegistration implements Wrapper<ApplicationRegistrationShape> {
  id: string;
  type: ApplicationRegistrationShapeType.ApplicationRegistration;
  registeredAgent: string;
  registeredAt: Date;
  registeredBy: string;
  registeredWith: string;
  updatedAt: Date;
  hasAccessGrant: string;

  shape: ApplicationRegistrationShape;

  wrap(shape: ApplicationRegistrationShape) {
    this.shape = shape;

    this.id = shape.id;
    this.type = shape.type;
    this.registeredAgent = shape.registeredAgent;
    this.registeredAt = shape.registeredAt;
    this.registeredBy = shape.registeredBy;
    this.registeredWith = shape.registeredWith;
    this.updatedAt = shape.updatedAt;
    this.hasAccessGrant = shape.hasAccessGrant;

    return this;
  }

  graphify(store: WrapperStore): void {}
}
