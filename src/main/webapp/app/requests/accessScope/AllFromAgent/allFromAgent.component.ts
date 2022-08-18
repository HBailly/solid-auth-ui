import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '@/shared/model/context.model';
import { AllFromAgent } from '@/shared/model/interop/wrappers/scopeOfAuthorization.wrapper';
import { SocialAgent } from '@/shared/model/interop/wrappers/socialAgent.wrapper';

@Component
export default class AllFromAgentComponent extends Vue {
  @Prop({ type: Context, required: true })
  context: Context;

  @Prop({ type: Boolean, default: true })
  enabled: boolean;

  @Prop({ type: Object, required: true })
  parameter: AllFromAgent;

  id: string;
  values: Map<string, SocialAgent>;
  options;
  selected: SocialAgent[];

  data() {
    const values = this.getValues();
    const options = Array.from(values.values())
      .sort((a, b) => a.familyName.localeCompare(b.familyName))
      .map(agent => {
        return { key: agent.id, value: agent, text: agent.name };
      });
    const selected = this.parameter.owner ? this.parameter.owner : [];

    return {
      id: null,
      values: values,
      options: options,
      selected: selected,
    };
  }

  created() {
    this.id = uuidv4();
  }

  updateAgent(agents: SocialAgent[]): void {
    this.selected = agents;
    this.parameter.owner = agents;
  }

  private getValues(): Map<string, SocialAgent> {
    const entities = this.context.entities;
    return new Map(
      this.context.agent._registrySet._agentRegistry._agentRegistrations
        .map(registration => registration.registeredAgent)
        .map(id => (entities.has(id) ? entities.get(id) : SocialAgent.with(id)))
        .map(unknown => unknown as SocialAgent)
        .sort((a, b) => a.familyName.localeCompare(b.familyName))
        .map(agent => [agent.id, agent])
    );
  }
}
