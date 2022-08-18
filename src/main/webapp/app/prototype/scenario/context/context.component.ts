import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class ContextComponent extends Vue {
  @Prop({ type: Boolean, default: true })
  shouldExpand: boolean;

  expanded: boolean;

  data() {
    return {
      expanded: this.shouldExpand,
    };
  }
}
