import Component from 'vue-class-component';
import { Vue } from 'vue-property-decorator';

import { Application } from '@/shared/model/interop/wrappers/application.wrapper';
import { term } from '@/shared/model/terms/shapes/term.shapes';
import { findAll, TurtleType } from '@/shared/rdf/rdf.io';
import { WrapperFactory } from '@/shared/model/wrapper.factory';
import { SocialAgent } from '@/shared/model/interop/wrappers/socialAgent.wrapper';
import { TermStore, termStore } from '@/shared/model/terms/term.store';
import { Context, ExperimentStage, ScenarioName } from '@/shared/model/context.model';
import PlainLanguageStatementComponent from '@/prototype/pls/pls.vue';
import InformedConsentComponent from '@/prototype/consent/consent.vue';
import ClosingComponent from '@/prototype/closing/closing.vue';
import { agentRegistry } from '@/shared/model/interop/shapes/agentRegistry.shape';
import { accessAuthorization } from '@/shared/model/interop/shapes/accessAuthorization.shape';
import { socialAgent } from '@/shared/model/interop/shapes/socialAgent.shape';
import { applicationRegistration } from '@/shared/model/interop/shapes/applicationRegistration.shape';
import { authorizationRegistry } from '@/shared/model/interop/shapes/authorizationRegistry.shape';
import { socialAgentRegistration } from '@/shared/model/interop/shapes/socialAgentRegistration.shape';
import { dataRegistration } from '@/shared/model/interop/shapes/dataRegistration.shape';
import { registrySet } from '@/shared/model/interop/shapes/registrySet.shape';
import { dataRegistry } from '@/shared/model/interop/shapes/dataRegistry.shape';
import { application } from '@/shared/model/interop/shapes/application.shape';
import PreliminaryComponent from '@/prototype/surveys/preliminary/preliminary.vue';
import ConcludingComponent from '@/prototype/surveys/concluding/concluding.vue';
import OpeningComponent from '@/prototype/opening/opening.vue';
import ReviewComponent from '@/prototype/surveys/review/review.vue';
import ScenarioComponent from '@/prototype/scenario/scenario.vue';
import GuidelinesComponent from '@/prototype/guidelines/guidelines.vue';
import TurtleComponent from '@/prototype/turtle/turtle.vue';
import { containerShapeTree } from '@/shared/model/shapetree/shapes/containerShapeTree.shape';
import { resourceShapeTree } from '@/shared/model/shapetree/shapes/resourceShapeTree.shape';
import { accessDescriptionSet } from '@/shared/model/interop/shapes/accessDescriptionSet.shape';
import { accessNeedGroupDescription } from '@/shared/model/interop/shapes/accessNeedGroupDescription.shape';
import { accessNeedDescription } from '@/shared/model/interop/shapes/accessNeedDescription.shape';

Component.registerHooks(['beforeRouteEnter', 'beforeRouteLeave', 'beforeRouteUpdate']);
@Component({
  components: {
    PlainLanguageStatementComponent,
    InformedConsentComponent,
    PreliminaryComponent,
    GuidelinesComponent,
    OpeningComponent,
    ScenarioComponent,
    ReviewComponent,
    ConcludingComponent,
    ClosingComponent,
    TurtleComponent,
  },
})
export default class Demo extends Vue {
  context: Context;
  stage: ExperimentStage;

  dictionary: TermStore = termStore;

  // noinspection JSUnusedGlobalSymbols
  beforeMount() {
    window.addEventListener('beforeunload', e => this.beforeunload(e));
  }

  // noinspection JSUnusedGlobalSymbols
  beforeDestroy() {
    window.removeEventListener('beforeunload', e => this.beforeunload(e));
  }

  data() {
    return {
      ExperimentStage,
      Scenario: ScenarioName,
      context: new Context(),
      stage: 0,
    };
  }

  beforeunload(event) {
    if (this.stage >= ExperimentStage.PRELIMINARY && this.stage < ExperimentStage.DONE) {
      event.preventDefault();
      event.returnValue = '';
    }
  }

  beforeRouteLeave(to, from, next) {
    if (this.stage >= ExperimentStage.PRELIMINARY && this.stage < ExperimentStage.DONE) {
      if (!window.confirm('You are about to leave the page. Your changes will not be saved.\nDo you want to proceed anyway?')) {
        return;
      }
      this.context.session.upload();
    }
    next();
  }

  next() {
    if (this.stage < ExperimentStage.TURTLE) {
      this.stage++;
    }
  }

  previous() {
    if (this.stage > 0) {
      this.stage--;
    }
  }

  async created() {
    console.log('Loading data...');

    // First, fetch all ontology vocabulary
    Promise.all([
      findAll(term, TurtleType.ONTOLOGY, 'dpv-purposes'),
      findAll(term, TurtleType.ONTOLOGY, 'interop'),
      findAll(term, TurtleType.ONTOLOGY, 'acl'),
      findAll(term, TurtleType.ONTOLOGY, 'dpv-purposes'),
      findAll(term, TurtleType.ONTOLOGY, 'dpv-data'),
    ])
      // Store it in local dictionary
      .then(data => {
        for (const terms of data) {
          if (terms) terms.data.forEach(e => termStore.save(e));
        }
        console.log(termStore);
      })

      // Then, load source data from server
      .then(() =>
        Promise.all([
          findAll(application, TurtleType.BASE, 'application'),
          findAll(socialAgent, TurtleType.BASE, 'agents'),
          findAll(registrySet, TurtleType.BASE, 'registries'),
          findAll(agentRegistry, TurtleType.BASE, 'agent-registries'),
          findAll(socialAgentRegistration, TurtleType.BASE, 'agent-registries'),
          findAll(applicationRegistration, TurtleType.BASE, 'agent-registries'),
          findAll(authorizationRegistry, TurtleType.BASE, 'auth-registries'),
          findAll(accessAuthorization, TurtleType.BASE, 'auth-registries'),
          findAll(dataRegistry, TurtleType.BASE, 'data-registries'),
          findAll(dataRegistration, TurtleType.BASE, 'data-registries'),

          findAll(accessDescriptionSet, TurtleType.BASE, 'description-en'),
          findAll(accessNeedGroupDescription, TurtleType.BASE, 'description-en'),
          findAll(accessNeedDescription, TurtleType.BASE, 'description-en'),
          findAll(accessDescriptionSet, TurtleType.BASE, 'description-fr'),
          findAll(accessNeedGroupDescription, TurtleType.BASE, 'description-fr'),
          findAll(accessNeedDescription, TurtleType.BASE, 'description-fr'),

          findAll(containerShapeTree, TurtleType.BASE, 'shapes'),
          findAll(resourceShapeTree, TurtleType.BASE, 'shapes'),

          findAll(term, TurtleType.BASE, 'instances'),
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
            const jarvisId = 'https://jarvis.example/#id';
            const jarvis = this.context.entities.get(jarvisId);
            this.context.authorizationAgent = jarvis as Application;
          })
          .then(() => {
            this.context.agent = this.context.entities.get('https://alice.example/#id') as SocialAgent;
          })
          .then(() => {
            console.log(this.context);
          })
      );
  }
}
