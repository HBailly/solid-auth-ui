import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import { AccessNeed } from '@/shared/model/interop/wrappers/accessNeed.wrapper';
import { TermStore, termStore } from '@/shared/model/terms/term.store';
import AccessModesComponent from '@/requests/accessModes/accessModes.vue';
import AccessNecessityComponent from '@/requests/accessNecessity/accessNecessity.vue';
import DataInstancesComponent from '@/requests/dataInstances/dataInstances.vue';
import ParentComponent from '@/requests/dependency/parent.vue';
import ChildrenComponent from '@/requests/dependency/children.vue';
import InheritsFromNeedComponent from '@/requests/inheritance/inheritsFromNeed.vue';
import InheritorsComponent from '@/requests/inheritance/inheritors.vue';
import PurposesComponent from '@/requests/purposes/purposes.vue';
import ScopeOfAccessComponent from '@/requests/accessScope/accessScope.vue';
import RegisteredShapeTreeComponent from '@/requests/registeredShapeTree/registeredShapeTree.vue';
import { Context } from '@/shared/model/context.model';
import { v4 as uuidv4 } from 'uuid';
import { AccessScenarioType } from '@/shared/model/interop/enums/accessScenarioType.enum';
import { AccessNecessityType } from '@/shared/model/interop/enums/accessNecessityType.enum';
import { AuthenticatesAsType } from '@/shared/model/interop/enums/authenticatesAs.enum';

@Component<AccessNeedComponent>({
  components: {
    AccessModesComponent,
    AccessNecessityComponent,
    DataInstancesComponent,
    InheritsFromNeedComponent,
    InheritorsComponent,
    ParentComponent,
    ChildrenComponent,
    RegisteredShapeTreeComponent,
    PurposesComponent,
    ScopeOfAccessComponent,
  },
})
export default class AccessNeedComponent extends Vue {
  @Prop({ type: Context, required: true })
  context: Context;

  @Prop({ type: AccessNeed, required: true })
  need: AccessNeed;

  @Prop({ type: Boolean, default: false })
  isAccepted: boolean;

  @Prop({ type: String })
  accordion: string;

  @Prop({ type: Map })
  collapsedStates: Map<string, boolean>;

  @Prop({ type: Number, default: 0 })
  cascadeRefresh: number;

  dictionary: TermStore = termStore;

  id: string;

  show: boolean;

  data() {
    const show = !this.collapsedStates.has(this.need.id) || !this.collapsedStates.get(this.need.id);
    return {
      AccessNecessityType,
      AccessScenarioType,
      AuthenticatesAsType,
      isIndeterminate: false,
      id: uuidv4(),
      show: show,
    };
  }

  selectTooltip() {
    if (this.need.isIndeterminate()) {
      return 'Click to select the current and all dependent needs, including those optional';
    }
    if (!this.need.isAllOptional()) {
      if (this.need.hasChildren()) {
        return 'Click to select the current need and only required dependent needs';
      } else {
        return 'Click to select the current need';
      }
    }
    if (this.need.isAllOptional()) {
      if (this.need.hasChildren()) {
        return 'Click to deselect the current and all dependent needs';
      } else {
        return 'Click to deselect the current need';
      }
    }
  }

  toggleSelection(selection: boolean): void {
    const cascade = this.need.isIndeterminate();
    this.need._isSelected = this.need.isRequired() || selection;
    this.need.cascadeSelection(selection, cascade);
    this.$emit('onSelectionChange');
  }

  onScopeSelectionChange() {
    this.$emit('onSelectionChange');
  }

  togglePanel() {
    const previousState = this.collapsedStates.has(this.need.id) ? this.collapsedStates.get(this.need.id) : false;
    const newState = !previousState;
    this.collapsedStates.set(this.need.id, newState);
    const elementId = 'need-collapse-' + this.need.id;
    const collapsed = window.document.getElementById(elementId);
    if (newState) {
      collapsed.classList.remove('show');
    } else {
      collapsed.classList.add('show');
    }
  }

  isEnabled(): boolean {
    return !this.need.isDisabled();
  }

  isDeselected(): boolean {
    return !this.need._isSelected;
  }

  isSelected(): boolean {
    return this.need._isSelected && !this.isAccepted;
  }

  isSelectedAndAccepted(): boolean {
    return this.need._isSelected && this.isAccepted;
  }

  toSafeArray(potentialArray: any | any[]): any[] {
    if (potentialArray == null) return [];
    return Array.isArray(potentialArray) ? potentialArray : [potentialArray];
  }
}
