import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import { AccessNeedGroup } from '@/shared/model/interop/wrappers/accessNeedGroup.wrapper';
import { TermStore, termStore } from '@/shared/model/terms/term.store';
import AccessModesComponent from '@/requests/accessModes/accessModes.vue';
import AccessNecessityComponent from '@/requests/accessNecessity/accessNecessity.vue';
import AccessNeedComponent from '@/requests/accessNeed/accessNeed.vue';
import AccessScenarioComponent from '@/requests/accessScenario/accessScenario.vue';
import AuthenticateAsComponent from '@/requests/authenticatesAs/authenticatesAs.vue';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '@/shared/model/context.model';
import { AccessScenarioType } from '@/shared/model/interop/enums/accessScenarioType.enum';
import { AccessNecessityType } from '@/shared/model/interop/enums/accessNecessityType.enum';
import { AuthenticatesAsType } from '@/shared/model/interop/enums/authenticatesAs.enum';

@Component({
  components: {
    AccessModesComponent,
    AccessNecessityComponent,
    AccessScenarioComponent,
    AccessNeedComponent,
    AuthenticateAsComponent,
  },
})
export default class AccessNeedGroupComponent extends Vue {
  @Prop({ type: Context, required: true })
  context: Context;

  @Prop({ type: Object, required: true })
  group: AccessNeedGroup;

  @Prop({ type: Boolean, default: false })
  isAccepted: boolean;

  @Prop({ type: Map })
  collapsedStates: Map<string, boolean>;

  @Prop({ type: Number, default: 0 })
  cascadeRefresh: number;

  dictionary: TermStore = termStore;

  id: string;
  show: boolean;

  data() {
    const show = !this.collapsedStates.has(this.group.id) || !this.collapsedStates.get(this.group.id);
    return {
      AccessNecessityType,
      AccessScenarioType,
      AuthenticatesAsType,
      id: uuidv4(),
      show: show,
    };
  }

  toggleSelection(selection: boolean) {
    const cascade = this.group.isIndeterminate();
    this.group._isSelected = this.group.isRequired() || selection;
    this.group.cascadeSelection(selection, cascade);
    this.$emit('onGroupSelectionChange');
  }

  selectTooltip() {
    if (this.group.isIndeterminate()) {
      return 'Click to select the current group and all its requested access needs, including those optional';
    }
    if (!this.group.isAllOptional()) {
      return 'Click to select the current group and only its required access needs';
    }
    if (this.group.isAllOptional()) {
      return 'Click to deselect the current group and all its access needs';
    }
  }

  onSelectionChange() {
    this.$emit('onGroupSelectionChange');
  }

  isDeselected(): boolean {
    return !this.group._isSelected;
  }

  isSelected(): boolean {
    return this.group._isSelected && !this.isAccepted;
  }

  isSelectedAndAccepted(): boolean {
    return this.group._isSelected && this.isAccepted;
  }

  togglePanel() {
    const previousState = this.collapsedStates.has(this.group.id) ? this.collapsedStates.get(this.group.id) : false;
    const newState = !previousState;
    this.collapsedStates.set(this.group.id, newState);
    const elementId = 'group-collapse-' + this.group.id;
    const collapsed = window.document.getElementById(elementId);
    if (newState) {
      collapsed.classList.remove('show');
    } else {
      collapsed.classList.add('show');
    }
  }
}
