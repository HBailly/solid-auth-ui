import { Wrapper, WrapperStore } from '@/shared/model/wrapper.store';
import { AccessNeedDescription } from '@/shared/model/interop/wrappers/accessNeedDescription.wrapper';
import { AccessNeedGroup } from '@/shared/model/interop/wrappers/accessNeedGroup.wrapper';
import { All, Inherited, ScopeOfAuthorization } from '@/shared/model/interop/wrappers/scopeOfAuthorization.wrapper';
import { ResourceShapeTree } from '@/shared/model/shapetree/wrappers/resourceShapeTree.wrapper';
import { toSafeArray } from '@/shared/model/utils';
import { AccessNeedShape, AccessNeedShapeType } from '@/shared/model/interop/shapes/accessNeed.shape';
import { AccessNecessityType } from '@/shared/model/interop/enums/accessNecessityType.enum';
import { AccessModeType } from '@/shared/model/interop/enums/accessModeType.enum';
import { ScopeOfAuthorizationType } from '@/shared/model/interop/enums/scopeOfAuthorization.enum';

export class AccessNeed implements Wrapper<AccessNeedShape> {
  id: string;
  type: AccessNeedShapeType.AccessNeed;
  registeredShapeTree: string;
  accessNecessity: AccessNecessityType.AccessRequired | AccessNecessityType.AccessOptional;
  accessMode: AccessModeType | AccessModeType[];
  creatorAccessMode?: AccessModeType | AccessModeType[];
  hasDataInstance?: string | string[];
  hasPurpose?: string | string[];
  hasAccessNeedDescription: string | string[];
  hasAccessNeed: string | string[];
  inheritsFromNeed: string;
  
  shape: AccessNeedShape;
  
  _shapeTree: ResourceShapeTree;
  _parentGroup: AccessNeedGroup;
  _parentNeed: AccessNeed;
  _childrenNeedsById: Map<string, AccessNeed> = new Map();
  _ascendantNeed: AccessNeed;
  _descendantNeedsById: Map<string, AccessNeed> = new Map();
  _accessNeedDescriptionsByLanguage: Map<string, AccessNeedDescription> = new Map();
  _scopeOfAuthorization: ScopeOfAuthorization = new ScopeOfAuthorization();
  _isSelected = true;

  graphify(store: WrapperStore): void {
    if (this.hasAccessNeed) {
      const descendants = toSafeArray(this.hasAccessNeed);
      descendants
        .map(id => store.get(id) as AccessNeed)
        .forEach(need => {
          need._parentNeed = this;
          this._childrenNeedsById.set(need.id, need);
        });
    }

    if (this.hasAccessNeedDescription) {
      const descriptions = toSafeArray(this.hasAccessNeedDescription);
      descriptions
        .map(id => store.get(id) as AccessNeedDescription)
        .forEach(description => {
          this._accessNeedDescriptionsByLanguage.set(description._language, description);
        });
    }

    if (this.inheritsFromNeed) {
      const parent = store.get(this.inheritsFromNeed) as AccessNeed;
      if (parent) {
        this._ascendantNeed = parent;
        parent._descendantNeedsById.set(this.id, this);
      } else {
        throw new Error('Access need ancestor [' + this.inheritsFromNeed + '] not found!');
      }
    }

    this._shapeTree = store.get(this.registeredShapeTree) as ResourceShapeTree;
  }

  wrap(shape: AccessNeedShape) {
    this.shape = shape;

    this.id = shape.id;
    this.type = shape.type;
    this.hasAccessNeedDescription = shape.hasAccessNeedDescription;
    this.registeredShapeTree = shape.registeredShapeTree;
    this.accessNecessity = shape.accessNecessity;
    this.accessMode = shape.accessMode;
    this.creatorAccessMode = shape.creatorAccessMode;
    this.hasDataInstance = shape.hasDataInstance;
    this.hasPurpose = shape.hasPurpose;
    this.hasAccessNeed = shape.hasAccessNeed;
    this.inheritsFromNeed = shape.inheritsFromNeed;

    if (this.inheritsFromNeed) {
      this._scopeOfAuthorization.parameter = new Inherited();
    }

    return this;
  }

  isDisabled(): boolean {
    return !this._parentGroup._isSelected || (this._parentNeed != null && !this._parentNeed._isSelected);
  }

  getAccessNeedsAsArray(): Array<AccessNeed> {
    const array: Array<AccessNeed> = new Array<AccessNeed>();
    array.push(this);
    this._childrenNeedsById.forEach(dependent => {
      dependent.getAccessNeedsAsArray().forEach(e => array.push(e));
    });
    return array;
  }

  getChildren(): Array<AccessNeed> {
    return Array.from(this._childrenNeedsById.values());
  }

  getInheritors(): Array<AccessNeed> {
    return Array.from(this._descendantNeedsById.values());
  }

  cascadeSelection(isSelected: boolean, includeOptional?: boolean): void {
    if (this.hasDescendants() && !isSelected && this.hasInheritance()) {
      const currentNeed = this._accessNeedDescriptionsByLanguage.get('en').prefLabel;
      const inheritors = this.getInheritors()
        .filter(need => need.isInheriting())
        .filter(need => need._isSelected)
        .map(need => '- ' + need._accessNeedDescriptionsByLanguage.get('en').prefLabel)
        .reduce((a, b) => a + '\n' + b);
      if (
        confirm(
          'You deselected ' +
            currentNeed +
            ' while it provides the scope of authorization to the following needs:' +
            '\n\n' +
            inheritors +
            '\n\nDo you want to deselect them too?'
        )
      ) {
        this._isSelected = false;
        Array.from(this._descendantNeedsById.values())
          .filter(need => need.isInheriting())
          .forEach(need => need.cascadeSelection(isSelected, includeOptional));
        alert(currentNeed + ' and the following needs have been deselected:\n' + inheritors);
      } else {
        Array.from(this._descendantNeedsById.values())
          .filter(need => need._isSelected)
          .filter(need => need.isInheriting())
          .map(need => need._scopeOfAuthorization)
          .forEach(scope => (scope.parameter = new All()));
        alert(currentNeed + ' has been deselected.\n\nThe scope of the following needs was changed to "All":\n' + inheritors);
      }
    }

    if (this.isRequired() && this.getParent()._isSelected == isSelected) {
      this._isSelected = isSelected;
    } else if (!this.isRequired() && (!isSelected || (isSelected && includeOptional))) {
      this._isSelected = isSelected;
    }
    this._childrenNeedsById.forEach(need => need.cascadeSelection(isSelected, includeOptional));
  }

  isRequiredOnly(): boolean {
    return (
      (this.isRequired() || !this._isSelected) &&
      Array.from(this._childrenNeedsById.values())
        .map(need => need.isRequiredOnly())
        .concat(true)
        .reduce((a, b) => a && b)
    );
  }

  isAllOptional(): boolean {
    return (
      this._isSelected &&
      Array.from(this._childrenNeedsById.values())
        .map(need => need.isAllOptional())
        .concat(true)
        .reduce((a, b) => a && b)
    );
  }

  isIndeterminate(): boolean {
    return !this.isRequiredOnly() && !this.isAllOptional();
  }

  getAscendant() {
    return this._ascendantNeed;
  }

  getParent() {
    return this._parentNeed ? this._parentNeed : this._parentGroup;
  }

  isRequired(): boolean {
    return this.accessNecessity == AccessNecessityType.AccessRequired;
  }

  hasChildren(): boolean {
    return this._childrenNeedsById.size > 0;
  }

  hasDescendants(): boolean {
    return this._descendantNeedsById.size > 0;
  }

  isCustomizable(): boolean {
    return (
      !this.isRequired() ||
      Array.from(this._childrenNeedsById.values())
        .map(need => need.isCustomizable())
        .concat(false)
        .reduce((a, b) => a || b)
    );
  }

  private isInheriting(): boolean {
    return this._scopeOfAuthorization.parameter.type == ScopeOfAuthorizationType.Inherited;
  }

  private isSelectable() {
    return this._parentNeed != null ? this._parentNeed._isSelected : this._parentGroup._isSelected;
  }

  private hasInheritance() {
    return Array.from(this._descendantNeedsById.values())
      .filter(need => need._isSelected)
      .map(need => need.isInheriting())
      .concat(false)
      .reduce((a, b) => a || b);
  }
}
