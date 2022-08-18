import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import { TermStore, termStore } from '@/shared/model/terms/term.store';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '@/shared/model/context.model';
import { AccessScenarioType } from '@/shared/model/interop/enums/accessScenarioType.enum';

@Component
export default class AccessScenarioComponent extends Vue {
  @Prop({ type: Context, required: true })
  context: Context;

  dictionary: TermStore = termStore;

  icons = {
    [AccessScenarioType.PersonalAccess]: 'person',
    [AccessScenarioType.SharedAccess]: 'people-group',
  };

  @Prop({ type: String })
  scenario: AccessScenarioType;

  id: string;

  data() {
    return {
      AccessScenarioType,
      id: null,
    };
  }

  created() {
    this.id = uuidv4();
  }
}
