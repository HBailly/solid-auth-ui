import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import { TermStore, termStore } from '@/shared/model/terms/term.store';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '@/shared/model/context.model';
import { AuthenticatesAsType } from '@/shared/model/interop/enums/authenticatesAs.enum';

@Component
export default class AuthenticatesAsComponent extends Vue {
  @Prop({ type: Context, required: true })
  context: Context;

  dictionary: TermStore = termStore;
  icons = {
    [AuthenticatesAsType.SocialAgent]: 'user',
    [AuthenticatesAsType.Application]: 'computer',
  };

  @Prop({ type: String })
  profile: AuthenticatesAsType;

  id: string;

  data() {
    return {
      AuthenticatesAsType,
      id: null,
    };
  }

  created() {
    this.id = uuidv4();
  }
}
