import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';

import { Application } from '@/shared/model/interop/wrappers/application.wrapper';
import { TermStore, termStore } from '@/shared/model/terms/term.store';
import AccessNeedGroupComponent from '@/requests/accessNeedGroup/accessNeedGroup.vue';
import { Context, ScenarioName } from '@/shared/model/context.model';
import { AccessAuthorization } from '@/shared/model/interop/wrappers/accessAuthorization.wrapper';
import { findAll, TurtleType } from '@/shared/rdf/rdf.io';
import { application } from '@/shared/model/interop/shapes/application.shape';
import { accessNeedGroup } from '@/shared/model/interop/shapes/accessNeedGroup.shape';
import { accessNeed } from '@/shared/model/interop/shapes/accessNeed.shape';
import { WrapperFactory } from '@/shared/model/wrapper.factory';

@Component({
  components: {
    AccessNeedGroupComponent,
  },
})
export default class AccessRequestComponent extends Vue {
  @Prop({ type: Context, required: true })
  context: Context;
  @Prop({ type: Number, required: true })
  scenario: ScenarioName;
  source: TurtleType;

  dictionary: TermStore = termStore;

  collapsedStates: Map<string, boolean>;

  application: Application;
  isAllOptional: boolean;
  isIndeterminate: boolean;

  cascadeRefresh: number;
  disabled: boolean;

  async created() {
    if (!this.context.applicationByScenario.has(this.scenario)) {
      console.log('Loading data...');

      // Then, load source data from server
      Promise.all([
        findAll(application, this.source, 'application'),
        findAll(accessNeedGroup, this.source, 'needs'),
        findAll(accessNeed, this.source, 'needs'),
      ])
        // Wrap entities into JS objects
        .then(data => {
          for (const response of data) {
            const array = response.data;
            if (array)
              for (const element of array) {
                const wrapper = WrapperFactory.wrap(element);
                if (wrapper) this.context.entities.save(wrapper);
              }
          }
        })
        // Turn entity clouds into directed trees
        .then(() => {
          this.context.entities.graphify();
          console.log(this.context.entities);
        })
        // Load specific instances for use into experiment
        .then(() => {
          const appId = 'https://projectron.example/#id';
          const app = this.context.entities.get(appId) as Application;
          this.context.application = app;
          this.application = app;
          this.context.applicationByScenario.set(this.scenario, app);
        })
        // Start UI
        .then(() => {
          console.log(this.context);
          this.context.session.chronos[this.scenario - 1].start();
        });
    } else {
      this.application = this.context.applicationByScenario.get(this.scenario);
    }
  }

  data() {
    return {
      AccessAuthorization,
      application: this.context.applicationByScenario.get(this.scenario),
      source: this.getScenario(),
      groupSelection: new Map(),
      collapsedStates: new Map(),
      isAllOptional: true,
      isIndeterminate: false,
      cascadeRefresh: 0,
      disabled: this.context.authorizationsByScenario.has(this.scenario),
    };
  }

  onGroupSelectionChange() {
    this.isIndeterminate = !this.application.isRequiredOnly() && !this.application.isAllOptional();
    this.isAllOptional = this.application.isAllOptional();
    this.forceRefresh();
  }

  toggleRequired() {
    if (this.isIndeterminate) {
      this.isAllOptional = false;
    }
    this.application._accessNeedGroups.forEach(group => {
      group.cascadeSelection(!this.isAllOptional, this.isIndeterminate);
    });

    this.isIndeterminate = this.application.isSelected() && !this.application.isAllOptional();
    this.isAllOptional = this.application.isAllOptional();

    this.forceRefresh();
  }

  forceRefresh() {
    this.cascadeRefresh++;
  }

  getScenario() {
    switch (this.scenario) {
      case ScenarioName.base:
        return TurtleType.BASE;
      case ScenarioName.simple:
        return TurtleType.DATA;
      case ScenarioName.extended:
        return TurtleType.DATA_EXT;
      case ScenarioName.super_extended:
        return TurtleType.DATA_SUPER_EXT;
    }
  }

  selectTooltip() {
    if (this.isIndeterminate) {
      return 'Click to select all access needs in all groups, including those optional';
    }
    if (!this.isAllOptional) {
      return 'Click to select only required access needs in all groups';
    }
    if (this.isAllOptional) {
      return 'Click to deselect all optional needs in all groups';
    }
  }

  previous(): void {
    this.$emit('prev');
  }

  next(): void {
    this.$emit('next');
  }

  denyAuthorization(): void {
    this.$emit('refuse', this.scenario);
  }

  grantAuthorization(event) {
    event.preventDefault();
    this.$emit('accept', this.scenario);
  }
}
