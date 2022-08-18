import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';

@Component
export default class DemoComponent extends Vue {
  @Prop({ type: Boolean, default: true })
  standalone: boolean;
}
