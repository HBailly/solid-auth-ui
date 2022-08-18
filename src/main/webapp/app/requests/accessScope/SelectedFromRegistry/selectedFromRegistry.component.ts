import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '@/shared/model/context.model';
import { SelectedFromRegistry } from '@/shared/model/interop/wrappers/scopeOfAuthorization.wrapper';
import { Resource } from '@/shared/model/terms/wrappers/resource.wrapper';
import { ScopeOfAuthorizationType } from '@/shared/model/interop/enums/scopeOfAuthorization.enum';

@Component
export default class SelectedFromRegistryComponent extends Vue {
  @Prop({ type: Context, required: true })
  context: Context;

  @Prop({ type: Boolean, default: true })
  enabled: boolean;

  @Prop({ type: Object, required: true })
  parameter: SelectedFromRegistry;

  @Prop({ type: String, required: true })
  shapeTree: string;

  id: string;

  selected;
  options;

  data() {
    const selected = this.parameter.instances ? this.parameter.instances : [];
    const options = Array.from(this.context.agent._registrySet._dataRegistriesById.values())
      .flatMap(registry => {
        return Array.from(registry._dataRegistrationsById.values());
      })
      .filter(registration => registration.registeredShapeTree == this.shapeTree)
      .sort((a, b) => a.id.localeCompare(b.id))
      .map(registration => {
        const instances = Array.from(registration._instancesById.values())
          .sort((a, b) => a.label.localeCompare(b.label))
          .map(instance => {
            return { text: instance.label, value: instance };
          });
        return { label: registration.id, options: instances };
      });

    return {
      ScopeOfAuthorizationType,
      id: null,
      selected: selected,
      options: options,
    };
  }

  created() {
    this.id = uuidv4();
  }

  update(resources: Resource[]) {
    this.parameter.owner = this.context.agent;
    this.parameter.instances = resources;
    this.parameter.registration = new Set(resources.map(resource => resource._registration));
  }
}
