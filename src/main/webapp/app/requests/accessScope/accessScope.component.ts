import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import { TermStore, termStore } from '@/shared/model/terms/term.store';
import { v4 as uuidv4 } from 'uuid';
import { pref } from '@/shared/rdf/rdf.namespace';
import SelectedFromRegistryComponent from '@/requests/accessScope/SelectedFromRegistry/selectedFromRegistry.vue';
import AllFromAgentComponent from '@/requests/accessScope/AllFromAgent/allFromAgent.vue';
import AllFromRegistryComponent from '@/requests/accessScope/AllFromRegistry/allFromRegistry.vue';
import { Context } from '@/shared/model/context.model';
import {
  All,
  AllFromAgent,
  AllFromRegistry,
  Dependent,
  Inherited,
  ScopeOfAuthorization,
  SelectedFromRegistry,
} from '@/shared/model/interop/wrappers/scopeOfAuthorization.wrapper';
import { AccessNeed } from '@/shared/model/interop/wrappers/accessNeed.wrapper';
import { ScopeOfAuthorizationType } from '@/shared/model/interop/enums/scopeOfAuthorization.enum';

@Component({
  components: {
    AllFromAgentComponent,
    AllFromRegistryComponent,
    SelectedFromRegistryComponent,
  },
})
export default class AccessScopeComponent extends Vue {
  @Prop({ type: Context, required: true })
  context: Context;

  @Prop({ type: Boolean, default: true })
  enabled: boolean;

  @Prop({ type: AccessNeed, required: false })
  ascendant: AccessNeed;

  @Prop({ type: AccessNeed, required: false })
  parent: AccessNeed;

  @Prop({ type: String, required: true })
  shapeTree: string;

  @Prop({ type: Object, default: All.prototype, required: false })
  scope: ScopeOfAuthorization;

  dictionary: TermStore = termStore;

  id: string;
  values: Map<ScopeOfAuthorizationType, string>;
  selected: ScopeOfAuthorizationType;

  data() {
    const values = termStore
      .getAll(pref.interop + 'AccessScope')
      .filter(term => term.id != ScopeOfAuthorizationType.NoAccess)
      .filter(term => term.id != ScopeOfAuthorizationType.Inherited || this.ascendant != null)
      .filter(term => term.id != ScopeOfAuthorizationType.Dependent || this.parent != null)
      .map(term => [term.id, term.label]);

    const selected = this.getSelection();

    return {
      ScopeOfAuthorizationType,
      id: null,
      values: values,
      selected: selected,
      previous: null,
    };
  }

  getId() {
    return this.id;
  }

  isMultiSelectable(): boolean {
    return (
      this.selected !== ScopeOfAuthorizationType.All &&
      this.selected !== ScopeOfAuthorizationType.Inherited &&
      this.selected !== ScopeOfAuthorizationType.Dependent
    );
  }

  created() {
    this.id = uuidv4();
  }

  update(selection: ScopeOfAuthorizationType) {
    switch (selection) {
      case ScopeOfAuthorizationType.All:
        this.selected = ScopeOfAuthorizationType.All;
        this.scope.parameter = new All();
        break;
      case ScopeOfAuthorizationType.AllFromAgent:
        this.selected = ScopeOfAuthorizationType.AllFromAgent;
        this.scope.parameter = new AllFromAgent();
        break;
      case ScopeOfAuthorizationType.AllFromRegistry:
        this.selected = ScopeOfAuthorizationType.AllFromRegistry;
        this.scope.parameter = new AllFromRegistry();
        break;
      case ScopeOfAuthorizationType.SelectedFromRegistry:
        this.selected = ScopeOfAuthorizationType.SelectedFromRegistry;
        this.scope.parameter = new SelectedFromRegistry();
        break;
      case ScopeOfAuthorizationType.Dependent:
        if (this.parent == null || !this.parent._isSelected) {
          const prefLabel = this.parent ? this.parent._accessNeedDescriptionsByLanguage.get('en').prefLabel : 'parent need';
          alert('Cannot depend from ' + prefLabel + ' because it is unselected.');
        } else {
          this.selected = ScopeOfAuthorizationType.Dependent;
          this.scope.parameter = new Dependent();
        }
        break;
      case ScopeOfAuthorizationType.Inherited:
        if (this.ascendant == null || !this.ascendant._isSelected) {
          const prefLabel = this.ascendant ? this.ascendant._accessNeedDescriptionsByLanguage.get('en').prefLabel : 'ascendant need';
          alert('Cannot inherit from ' + prefLabel + ' because it is unselected.');
        } else {
          this.selected = ScopeOfAuthorizationType.Inherited;
          this.scope.parameter = new Inherited();
        }
        break;
    }
    this.$emit('onScopeSelectionChange');
  }

  private getSelection() {
    if (this.scope.parameter.type === ScopeOfAuthorizationType.Inherited) {
      if ((this.ascendant == null || !this.ascendant._isSelected) && this.enabled) {
        this.scope.parameter = new All();
      }
    }
    return this.scope.parameter.type;
  }
}
