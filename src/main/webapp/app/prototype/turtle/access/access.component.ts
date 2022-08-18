import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import { Context } from '@/shared/model/context.model';
import DataComponent from '@/prototype/turtle/data/data.vue';

@Component({
  components: {
    DataComponent,
  },
})
export default class AccessComponent extends Vue {
  @Prop({ type: Context, required: true })
  context: Context;

  @Prop({ type: String, required: true })
  authorization: string;

  @Prop({ type: Array, required: true })
  dataAuthorizations: Array<string>;

  @Prop({ type: Boolean, required: true })
  ready: boolean;
}
