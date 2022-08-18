import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import { TermStore, termStore } from '@/shared/model/terms/term.store';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '@/shared/model/context.model';
import { AccessModeType } from '@/shared/model/interop/enums/accessModeType.enum';
import ModesComponent from '@/requests/accessModes/modes/modes.vue';
import { HeaderType } from '@/requests/accessModes/modes/modes';

@Component({
  components: {
    ModesComponent,
  },
})
export default class AccessModesComponent extends Vue {
  @Prop({ type: Context, required: true })
  context: Context;

  @Prop({ type: Array, required: true })
  existing: AccessModeType[];

  @Prop({ type: Array, required: true })
  creator: AccessModeType[];

  dictionary: TermStore = termStore;

  id: string;

  getId() {
    return this.id;
  }

  data() {
    return {
      HeaderType,
      id: uuidv4(),
    };
  }
}
