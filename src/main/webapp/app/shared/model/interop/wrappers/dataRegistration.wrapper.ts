import { Wrapper, WrapperStore } from '@/shared/model/wrapper.store';
import { toSafeArray } from '@/shared/model/utils';
import { Resource } from '@/shared/model/terms/wrappers/resource.wrapper';
import { DataRegistrationShape, DataRegistrationShapeType } from '@/shared/model/interop/shapes/dataRegistration.shape';

export class DataRegistration implements Wrapper<DataRegistrationShape> {
  id: string;
  type: DataRegistrationShapeType.DataRegistration;
  registeredAt: Date;
  registeredBy: string;
  registeredShapeTree: string;
  registeredWith: string;
  updatedAt: Date;
  contains: string | string[];

  shape: DataRegistrationShape;

  _instancesById: Map<string, Resource> = new Map();

  graphify(store: WrapperStore): void {
    if (this.contains != null) {
      toSafeArray(this.contains)
        .map(instance => store.get(instance) as Resource)
        .filter(instance => instance != null)
        .forEach(instance => {
          instance._registration = this;
          return this._instancesById.set(instance.id, instance);
        });
    }
  }

  wrap(shape: DataRegistrationShape) {
    this.shape = shape;

    this.id = shape.id;
    this.type = shape.type;
    this.registeredAt = shape.registeredAt;
    this.registeredBy = shape.registeredBy;
    this.registeredShapeTree = shape.registeredShapeTree;
    this.registeredWith = shape.registeredWith;
    this.updatedAt = shape.updatedAt;
    this.contains = shape.contains;

    return this;
  }
}
