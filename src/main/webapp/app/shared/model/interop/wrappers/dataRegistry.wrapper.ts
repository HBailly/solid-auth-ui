import { Wrapper, WrapperStore } from '@/shared/model/wrapper.store';
import { DataRegistration } from '@/shared/model/interop/wrappers/dataRegistration.wrapper';
import { toSafeArray } from '@/shared/model/utils';
import { DataRegistryShape, DataRegistryShapeType } from '@/shared/model/interop/shapes/dataRegistry.shape';

export class DataRegistry implements Wrapper<DataRegistryShape> {
  id: string;
  type: DataRegistryShapeType.DataRegistry;
  hasDataRegistration: string | string[];

  shape: DataRegistryShape;

  _dataRegistrationsById: Map<string, DataRegistration> = new Map();

  graphify(store: WrapperStore): void {
    if (this.hasDataRegistration) {
      toSafeArray(this.hasDataRegistration)
        .map(reg => store.get(reg) as DataRegistration)
        .filter(reg => reg != null)
        .forEach(reg => this._dataRegistrationsById.set(reg.id, reg));
    }
  }

  wrap(shape: DataRegistryShape) {
    this.shape = shape;

    this.id = shape.id;
    this.type = shape.type;
    this.hasDataRegistration = shape.hasDataRegistration;

    return this;
  }
}
