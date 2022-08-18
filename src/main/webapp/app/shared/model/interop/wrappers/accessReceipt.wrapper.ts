import { WrapperStore, Wrapper } from '@/shared/model/wrapper.store';
import { AccessReceiptShape, AccessReceiptShapeType } from '@/shared/model/interop/shapes/accessReceipt.shape';

export class AccessReceipt implements Wrapper<AccessReceiptShape> {
  id: string;
  type: AccessReceiptShapeType.AccessReceipt;
  grantedBy: string;
  providedAt: Date;

  shape: AccessReceiptShape;

  graphify(store: WrapperStore): void {}

  wrap(shape: AccessReceiptShape): Wrapper<AccessReceiptShape> {
    this.shape = shape;

    this.id = shape.id;
    this.grantedBy = shape.grantedBy;
    this.providedAt = shape.providedAt;

    return this;
  }
}
