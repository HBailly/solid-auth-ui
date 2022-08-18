import { Wrapper, WrapperStore } from '@/shared/model/wrapper.store';
import { TermShape } from '@/shared/model/terms/shapes/term.shapes';
import { DataRegistration } from '@/shared/model/interop/wrappers/dataRegistration.wrapper';

export class Resource implements Wrapper<TermShape> {
  id: string;
  label: string;
  description?: string;

  shape: TermShape;

  _registration: DataRegistration;

  graphify(store: WrapperStore): void {}

  wrap(shape: any): Wrapper<any> {
    this.shape = shape;

    this.id = shape.id;
    this.shape = shape.shape;
    this.label = shape.label;
    this.description = shape.description;

    return this;
  }
}
