import { AccessNeed } from '@/shared/model/interop/wrappers/accessNeed.wrapper';
import { Wrapper, WrapperStore } from '@/shared/model/wrapper.store';
import { AccessNeedGroupDescription } from '@/shared/model/interop/wrappers/accessNeedGroupDescription.wrapper';
import { toSafeArray } from '@/shared/model/utils';
import { AccessNeedGroupShape, AccessNeedGroupShapeType } from '@/shared/model/interop/shapes/accessNeedGroup.shape';
import { AccessNecessityType } from '@/shared/model/interop/enums/accessNecessityType.enum';
import { AccessScenarioType } from '@/shared/model/interop/enums/accessScenarioType.enum';
import { AuthenticatesAsType } from '@/shared/model/interop/enums/authenticatesAs.enum';

export class AccessNeedGroup implements Wrapper<AccessNeedGroupShape> {
  id: string;
  type: AccessNeedGroupShapeType.AccessNeedGroup;
  hasAccessNeedGroupDescription: string | string[];
  accessNecessity: AccessNecessityType.AccessRequired | AccessNecessityType.AccessOptional;
  accessScenario: AccessScenarioType.PersonalAccess | AccessScenarioType.SharedAccess;
  authenticatesAs: AuthenticatesAsType.SocialAgent | AuthenticatesAsType.Application;
  hasAccessNeed: string | string[];

  shape: AccessNeedGroupShape;

  _accessNeedsById: Map<string, AccessNeed> = new Map();
  _accessNeedGroupDescriptionsByLanguage: Map<string, AccessNeedGroupDescription> = new Map();
  _isSelected = true;

  graphify(store: WrapperStore): void {
    if (this.hasAccessNeedGroupDescription) {
      const descriptions = toSafeArray(this.hasAccessNeedGroupDescription);
      descriptions
        .map(id => store.get(id) as AccessNeedGroupDescription)
        .forEach(description => {
          this._accessNeedGroupDescriptionsByLanguage.set(description._language, description);
        });
    }
    if (this.hasAccessNeed) {
      toSafeArray(this.hasAccessNeed)
        .sort()
        .forEach(id => {
          const need = store.get(id) as AccessNeed;
          this._accessNeedsById.set(id, need);
        });
    }
  }

  wrap(shape: AccessNeedGroupShape) {
    this.shape = shape;

    this.id = shape.id;
    this.type = shape.type;
    this.hasAccessNeedGroupDescription = shape.hasAccessNeedGroupDescription;
    this.accessNecessity = shape.accessNecessity;
    this.accessScenario = shape.accessScenario;
    this.authenticatesAs = shape.authenticatesAs;
    this.hasAccessNeed = shape.hasAccessNeed;

    return this;
  }

  getAccessNeedsAsArray(): Array<AccessNeed> {
    const array: Array<AccessNeed> = new Array<AccessNeed>();
    this._accessNeedsById.forEach(child => {
      child.getAccessNeedsAsArray().forEach(need => {
        need._parentGroup = this;
        array.push(need);
      });
    });
    return array;
  }

  isIndeterminate(): boolean {
    return (!this.isRequiredOnly() || this.isRequired()) && !this.isAllOptional();
  }

  cascadeSelection(isSelected: boolean, includeOptional?: boolean): void {
    this._isSelected = this.isRequired() || isSelected;
    this._accessNeedsById.forEach(need => need.cascadeSelection(isSelected, includeOptional));
  }

  isRequiredOnly(): boolean {
    return (
      (this.isRequired() || !this._isSelected) &&
      Array.from(this._accessNeedsById.values())
        .map(need => need.isRequiredOnly())
        .concat(true)
        .reduce((a, b) => a && b)
    );
  }

  isAllOptional(): boolean {
    return (
      this._isSelected &&
      Array.from(this._accessNeedsById.values())
        .map(need => need.isAllOptional())
        .concat(true)
        .reduce((a, b) => a && b)
    );
  }

  isCustomizable() {
    return (
      !this.isRequired() ||
      this.getAccessNeedsAsArray()
        .map(need => need.isCustomizable())
        .concat(false)
        .reduce((a, b) => a || b)
    );
  }

  isRequired(): boolean {
    return this.accessNecessity == AccessNecessityType.AccessRequired;
  }
}
