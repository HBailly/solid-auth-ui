import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import { TermStore, termStore } from '@/shared/model/terms/term.store';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '@/shared/model/context.model';
import { ResourceShapeTree } from '@/shared/model/shapetree/wrappers/resourceShapeTree.wrapper';

@Component
export default class RegisteredShapeTreeComponent extends Vue {
  @Prop({ type: Context, required: true })
  context: Context;

  @Prop({ type: Object })
  shape: ResourceShapeTree;

  dictionary: TermStore = termStore;

  id: string;

  data() {
    return {
      id: uuidv4(),
    };
  }
}
