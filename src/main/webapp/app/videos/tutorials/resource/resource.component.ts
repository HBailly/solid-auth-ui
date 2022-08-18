import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';

@Component
export default class ResourceComponent extends Vue {
  @Prop({ type: String, required: true })
  url: string;
  @Prop({ type: String, required: true })
  caption: string;
}
