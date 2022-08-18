import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import { Context } from '@/shared/model/context.model';

@Component({
  components: {},
})
export default class DataComponent extends Vue {
  @Prop({ type: Context, required: true })
  context: Context;

  @Prop({ type: Array, required: true })
  authorizations: Array<string>;

  next() {
    this.$emit('next');
  }

  previous() {
    this.$emit('prev');
  }
}
