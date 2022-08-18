import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import { TermStore, termStore } from '@/shared/model/terms/term.store';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '@/shared/model/context.model';

@Component
export default class PurposesComponent extends Vue {
  @Prop({ type: Context, required: true })
  context: Context;

  @Prop({ type: Array })
  purposes: string[];

  dictionary: TermStore = termStore;

  id: string;

  data() {
    return {
      id: null,
    };
  }

  created() {
    this.id = uuidv4();
  }

  getId() {
    return this.id;
  }
}
