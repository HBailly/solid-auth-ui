import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import { TermStore, termStore } from '@/shared/model/terms/term.store';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '@/shared/model/context.model';
import { AccessModeType } from '@/shared/model/interop/enums/accessModeType.enum';

@Component
export default class Modes extends Vue {
  @Prop({ type: Context, required: true })
  context: Context;

  @Prop({ type: Array, required: true })
  modes: AccessModeType[];

  @Prop({ type: String, required: true })
  header: HeaderType;

  dictionary: TermStore = termStore;

  icons: Array<string>;

  id: string;

  getId(): string {
    return this.id;
  }

  getHeader(): string {
    return this.header === HeaderType.EXISTING ? 'Existing' : 'Created';
  }

  getTooltipTitle(): string {
    return this.header === HeaderType.EXISTING
      ? 'Instances that already exist in the repository'
      : 'Future instances that will be created by ' + this.context.application.applicationName;
  }

  data() {
    const icons = {
      [AccessModeType.Read]: 'magnifying-glass',
      [AccessModeType.Write]: 'pen-to-square',
      [AccessModeType.Append]: 'pen-to-square',
      [AccessModeType.Control]: 'handcuffs',
      [AccessModeType.Create]: 'plus',
      [AccessModeType.Update]: 'pen-to-square',
      [AccessModeType.Delete]: 'x',
    };
    return {
      AccessModeType,
      id: uuidv4(),
      icons: icons,
    };
  }
}

export enum HeaderType {
  EXISTING = 'EXISTING',
  CREATOR = 'CREATOR',
}
