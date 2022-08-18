import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '@/shared/model/context.model';
import { AllFromRegistry } from '@/shared/model/interop/wrappers/scopeOfAuthorization.wrapper';
import { DataRegistration } from '@/shared/model/interop/wrappers/dataRegistration.wrapper';

@Component
export default class AllFromRegistryComponent extends Vue {
  @Prop({ type: Context, required: true })
  context: Context;

  @Prop({ type: Boolean, default: true })
  enabled: boolean;

  @Prop({ type: Object, required: true })
  parameter: AllFromRegistry;

  @Prop({ type: String, required: true })
  shapeTree: string;

  id: string;
  values: Map<string, DataRegistration>;
  options;
  selected: DataRegistration[];

  data() {
    const valuesMap = this.context.agent._registrySet._dataRegistriesById;
    const optionsValues = Array.from(this.context.agent._registrySet._dataRegistriesById.values())
      .flatMap(registry => Array.from(registry._dataRegistrationsById.values()))
      .filter(registration => registration.registeredShapeTree == this.shapeTree)
      .sort((a, b) => a.id.localeCompare(b.id))
      .map(registration => {
        return { key: registration.id, value: registration };
      });
    const selectedValue = this.parameter.registration ? Array.from(this.parameter.registration) : [];

    return {
      id: null,
      values: valuesMap,
      options: optionsValues,
      selected: selectedValue,
    };
  }

  created() {
    this.id = uuidv4();
  }

  updateRegistry(registry: DataRegistration[]) {
    this.selected = registry;
    this.parameter.owner = this.context.agent;
    this.parameter.registration = new Set(registry);
  }
}
