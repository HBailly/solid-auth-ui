import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import { CalloutType } from '@/core/callout/model/callout.constant';

@Component
export default class CalloutComponent extends Vue {
  @Prop({ type: String, required: true })
  text: string;
  @Prop({ type: String, required: true })
  type: CalloutType;

  data() {
    return {
      CalloutType,
    };
  }
}
