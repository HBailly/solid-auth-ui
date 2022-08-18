import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import { Context, ScenarioName } from '@/shared/model/context.model';
import { baseUrl, TurtleType } from '@/shared/rdf/rdf.io';
import axios from 'axios';
import { AccessAuthorization } from '@/shared/model/interop/wrappers/accessAuthorization.wrapper';
import { DataAuthorization } from '@/shared/model/interop/wrappers/dataAuthorization.wrapper';
import AccessComponent from '@/prototype/turtle/access/access.vue';

@Component({
  components: {
    AccessComponent,
  },
})
export default class TurtleComponent extends Vue {
  @Prop({ type: Context, required: true })
  context: Context;

  scenarios: Array<ScenarioName>;
  accessAuths: Array<string> = [];
  dataAuths: Array<Array<string>> = [];

  ready = false;
  isReady: Array<boolean> = [];

  async created() {
    this.scenarios = Array.from(this.context.authorizationsByScenario.keys());
    for (const scenario of Array.from(this.context.authorizationsByScenario.keys())) {
      this.isReady.push(false);
      await this.loadAuthorizations(scenario).then(() => (this.isReady[scenario - 1] = true));
    }
    this.ready = true;
  }

  mounted() {
    window.scrollTo(0, 0);
  }

  next() {
    this.$emit('next');
  }

  previous() {
    this.$emit('prev');
  }

  private async loadAuthorizations(scenario: ScenarioName) {
    const access = this.context.authorizationsByScenario.get(scenario);
    await this.downloadAccessAuthorization(scenario, access);

    const authorizations: Array<string> = [];
    this.dataAuths.push(authorizations);
    for (const data of Array.from(access._dataAuthorizationsById.values())) {
      await this.downloadDataAuthorization(scenario, access, data, authorizations);
    }
  }

  private async downloadAccessAuthorization(scenario: ScenarioName, access: AccessAuthorization) {
    console.log('loading access ', access._uuid);
    const doc = baseUrl + TurtleType.AUTH + '/' + scenario + '/' + access._uuid + '?session=' + this.context.session.id;
    const response = await axios.get(doc);
    this.accessAuths.push(response.data);
  }

  private downloadDataAuthorization(
    scenario: ScenarioName,
    access: AccessAuthorization,
    data: DataAuthorization,
    authorizations: Array<string>
  ) {
    console.log('loading data ', access._uuid + '/' + data._uuid);
    const doc = baseUrl + TurtleType.AUTH + '/' + scenario + '/' + access._uuid + '/' + data._uuid + '?session=' + this.context.session.id;
    axios.get(doc).then(response => authorizations.push(response.data));
  }
}
