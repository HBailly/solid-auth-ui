import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import { TermStore, termStore } from '@/shared/model/terms/term.store';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '@/shared/model/context.model';
import { AccessNecessityType } from '@/shared/model/interop/enums/accessNecessityType.enum';

@Component
export default class AccessNecessityComponent extends Vue {
  @Prop({ type: Context, required: true })
  context: Context;

  @Prop({ type: String })
  necessity: AccessNecessityType;

  dictionary: TermStore = termStore;
  icons = {
    [AccessNecessityType.AccessOptional]: 'unlock',
    [AccessNecessityType.AccessRequired]: 'lock',
  };

  id: string;

  data() {
    return {
      AccessNecessityType,
      id: null,
    };
  }

  created() {
    this.id = uuidv4();
  }
}
