import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import { Context, ExperimentStage, ScenarioName } from '@/shared/model/context.model';
import { Scenario } from '@/prototype/scenario/model/scenario.model';
import AccessRequestComponent from '@/requests/accessRequest/accessRequest.vue';
import { scenario1, scenario2, scenario3 } from '@/prototype/scenario/model/scenario.constant';
import { AccessAuthorization } from '@/shared/model/interop/wrappers/accessAuthorization.wrapper';
import ContextComponent from '@/prototype/scenario/context/context.vue';

@Component({
  components: {
    ContextComponent,
    AccessRequestComponent,
  },
})
export default class ScenarioComponent extends Vue {
  @Prop({ type: Context, required: true })
  context: Context;
  @Prop({ type: Number, required: true })
  stage: ExperimentStage;

  shouldExpand: boolean;

  scenario: Scenario;

  collapsedStates: Map<string, boolean> = new Map();

  data() {
    return {
      shouldExpand: false,
      scenario: this.getScenario(),
    };
  }

  async created() {}

  mounted() {
    // @ts-ignore
    this.$refs.next.focus();
    window.scrollTo(0, 0);
  }

  previous() {
    this.$emit('prev');
  }

  next() {
    this.$emit('next');
  }

  accept(scenario: ScenarioName) {
    if (
      this.context.authorizationsByScenario.has(scenario) ||
      confirm('By proceeding, you will grant access to Projectron.\nDo you want to continue?')
    ) {
      if (
        !this.context.authorizationsByScenario.has(scenario) ||
        confirm('You already have granted the following access request.\nOverwrite existing authorization?')
      ) {
        this.context.session.chronos[scenario - 1].stop();
        const authorization = AccessAuthorization.from(this.context);
        this.context.authorizationsByScenario.set(scenario, authorization);
        this.context.session.upload();
        this.$emit('accept');
      }
    }
  }

  refuse(scenario: ScenarioName) {
    if (confirm('By proceeding, you will deny access to Projectron.\nDo you want to continue?')) {
      alert('You cannot refuse this access request for this experiment. Please review the permissions, then accept the request.');
    }
  }

  toggle(id: string) {
    const element = window.document.getElementById(id);
    if (element) {
      const expanded = !this.collapsedStates.has(id) || !this.collapsedStates.get(id);
      this.collapsedStates.set(id, expanded);
      if (expanded) {
        element.classList.remove('show');
      } else {
        element.classList.add('show');
      }
    }
  }

  canGoNext(): boolean {
    return this.context.authorizationsByScenario.has(this.scenario.name);
  }

  private getScenario(): Scenario {
    switch (this.stage) {
      case ExperimentStage.SCENARIO1:
        return scenario1;
      case ExperimentStage.SCENARIO2:
        return scenario2;
      case ExperimentStage.SCENARIO3:
        return scenario3;
      default:
        throw new Error('Not a valid stage');
    }
  }
}
