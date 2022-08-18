import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import { TermStore, termStore } from '@/shared/model/terms/term.store';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '@/shared/model/context.model';
import { AccessNeed } from '@/shared/model/interop/wrappers/accessNeed.wrapper';
import { AccessNecessityType } from '@/shared/model/interop/enums/accessNecessityType.enum';

@Component
export default class InheritsFromNeedComponent extends Vue {
  @Prop({ type: Context, required: true })
  context: Context;

  @Prop({ type: Object })
  ascendant: AccessNeed;

  dictionary: TermStore = termStore;

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

  scrollToAscendant() {
    const el = window.document.getElementById('need-header-' + this.ascendant.id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
