import Component from 'vue-class-component';
import { Vue } from 'vue-property-decorator';

import { Application } from '@/shared/model/interop/wrappers/application.wrapper';
import { term } from '@/shared/model/terms/shapes/term.shapes';
import { findAll, TurtleType } from '@/shared/rdf/rdf.io';
import { WrapperFactory } from '@/shared/model/wrapper.factory';
import { SocialAgent } from '@/shared/model/interop/wrappers/socialAgent.wrapper';
import { TermStore, termStore } from '@/shared/model/terms/term.store';
import AccessRequestComponent from '@/requests/accessRequest/accessRequest.vue';
import { agentRegistry } from '@/shared/model/interop/shapes/agentRegistry.shape';
import { accessAuthorization } from '@/shared/model/interop/shapes/accessAuthorization.shape';
import { socialAgent } from '@/shared/model/interop/shapes/socialAgent.shape';
import { applicationRegistration } from '@/shared/model/interop/shapes/applicationRegistration.shape';
import { authorizationRegistry } from '@/shared/model/interop/shapes/authorizationRegistry.shape';
import { socialAgentRegistration } from '@/shared/model/interop/shapes/socialAgentRegistration.shape';
import { dataRegistration } from '@/shared/model/interop/shapes/dataRegistration.shape';
import { application } from '@/shared/model/interop/shapes/application.shape';
import { registrySet } from '@/shared/model/interop/shapes/registrySet.shape';
import { dataRegistry } from '@/shared/model/interop/shapes/dataRegistry.shape';
import { Context, ScenarioName } from '@/shared/model/context.model';
import { AccessAuthorization } from '@/shared/model/interop/wrappers/accessAuthorization.wrapper';
import { accessDescriptionSet } from '@/shared/model/interop/shapes/accessDescriptionSet.shape';
import { accessNeedGroupDescription } from '@/shared/model/interop/shapes/accessNeedGroupDescription.shape';
import { accessNeedDescription } from '@/shared/model/interop/shapes/accessNeedDescription.shape';
import { containerShapeTree } from '@/shared/model/shapetree/shapes/containerShapeTree.shape';
import { resourceShapeTree } from '@/shared/model/shapetree/shapes/resourceShapeTree.shape';

@Component({
  components: {
    AccessRequestComponent,
  },
})
export default class Demo extends Vue {
  context: Context;
  dictionary: TermStore = termStore;

  key: number;

  data() {
    return {
      ScenarioName,
      Scenario: ScenarioName,
      context: null,
      key: 0,
    };
  }

  previous() {}

  next() {}

  reset() {
    if (confirm('Do you want to reset the page?')) {
      this.context.authorizationsByScenario.delete(ScenarioName.super_extended);
      this.key++;
      window.scrollTo(0, 0);
    }
  }

  accept(scenario: ScenarioName) {
    if (confirm('By proceeding, you will grant access to Projectron.\nDo you want to continue?')) {
      this.context.authorizationsByScenario.set(ScenarioName.super_extended, AccessAuthorization.from(this.context));
      alert('Authorization granted!');
      console.log(this.context.authorizationsByScenario.get(ScenarioName.super_extended));
      this.key++;
      window.scrollTo(0, 0);
    }
  }

  refuse(scenario: ScenarioName) {
    if (confirm('By proceeding, you will deny access to Projectron.\nDo you want to continue?')) {
      this.context.authorizationsByScenario.delete(ScenarioName.super_extended);
      this.$forceUpdate();
      // @ts-ignore
      this.$children[0].forceRefresh();
      alert('Authorization denied');
      this.key++;
      window.scrollTo(0, 0);
    }
  }

  async created() {
    console.log('Loading data...');
    const context = new Context();

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
                  if (wrapper) context.entities.save(wrapper);
                }
            }
          })
          // Turn entity clouds into directed trees
          .then(() => {
            context.entities.graphify();
            console.log(context.entities);
          })

          // Load specific instances for use into experiment
          .then(() => {
            const jarvisId = 'https://jarvis.example/#id';
            const jarvis = context.entities.get(jarvisId);
            context.authorizationAgent = jarvis as Application;
          })
          .then(() => {
            context.agent = context.entities.get('https://alice.example/#id') as SocialAgent;
          })
          .then(() => {
            this.context = context;
            console.log(this.context);
          })
      );
  }
}
