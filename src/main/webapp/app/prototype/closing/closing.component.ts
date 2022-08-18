import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import { Context, ScenarioName } from '@/shared/model/context.model';
import { accessAuthorization } from '@/shared/model/interop/shapes/accessAuthorization.shape';
import { baseUrl, TurtleType } from '@/shared/rdf/rdf.io';
import { Questionnaire } from '@/questions/model/question.model';
import axios from 'axios';
import { AccessAuthorization } from '@/shared/model/interop/wrappers/accessAuthorization.wrapper';
import ContactComponent from '@/contact/contact.vue';
import CalloutComponent from '@/core/callout/callout.vue';
import { DataAuthorization } from '@/shared/model/interop/wrappers/dataAuthorization.wrapper';

@Component({
  components: {
    ContactComponent,
    CalloutComponent,
  },
})
export default class PlainLanguageStatementComponent extends Vue {
  @Prop({ type: Context, required: true })
  context: Context;

  created() {
    this.context.session.completed = true;
    this.context.session
      .upload()
      .then(() => {
        this.context.questionnaires.forEach(q => this.uploadQuestionnaire(q));
        this.context.authorizationsByScenario.forEach((a, s) => this.uploadAccessAuthorization(s, a));
      })
      .catch(err => {
        console.log(err);
      });
  }

  mounted() {
    // @ts-ignore
    this.$refs.next.focus();
    window.scrollTo(0, 0);
  }

  next() {
    this.$emit('next');
  }

  previous() {
    this.$emit('prev');
  }

  async uploadAccessAuthorization(scenario: ScenarioName, authorization: AccessAuthorization) {
    console.log('Uploading access authorization [%s] of scenario %s...', authorization._uuid, scenario);

    const doc = baseUrl + TurtleType.AUTH + '/' + scenario + '/' + authorization._uuid + '?sessionId=' + this.context.session.id;
    const data = authorization.strip();

    await accessAuthorization
      .create({
        doc: doc,
        // @ts-ignore
        data: data,
      })
      .then(() => {
        const dataAuthorizations = authorization._dataAuthorizationsById;
        const results = [];
        for (const dataAuthorization of Array.from(dataAuthorizations.values())) {
          this.uploadDataAuthorization(scenario, authorization, dataAuthorization, results);
        }
        return results;
      })
      .then(() => {
        console.log('Access authorization [%s] successfully uploaded.', authorization._uuid);
      });
  }

  async uploadQuestionnaire(questionnaire: Questionnaire) {
    console.log('Uploading questionnaire [%s] (%i questions)', questionnaire.name, questionnaire.getCount());
    await axios
      .post('/survey/questions?sessionId=' + this.context.session.id, questionnaire)
      .then(() => {
        console.log('Questionnaire [%s] uploaded.', questionnaire.name);
      })
      .catch(err => {
        console.log(err);
      });
  }

  private uploadDataAuthorization(
    scenario: ScenarioName,
    authorization: AccessAuthorization,
    dataAuthorization: DataAuthorization,
    results: any[]
  ) {
    console.log('Uploading data authorization [%s] of scenario %s...', dataAuthorization._uuid, scenario);

    const shape = dataAuthorization._model;

    const doc =
      baseUrl +
      TurtleType.AUTH +
      '/' +
      scenario +
      '/' +
      authorization._uuid +
      '/' +
      dataAuthorization._uuid +
      '?sessionId=' +
      this.context.session.id;
    const data = dataAuthorization.strip();

    const result = shape
      .create({
        doc: doc,
        data: data,
      })
      .then(() => console.log('Data authorization [%s] successfully uploaded.', dataAuthorization._uuid))
      .catch(err => console.log(err));

    results.push(result);
  }
}
