import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import SolidComponent from '@/about/solid/solid.vue';
import ProjectronComponent from '@/about/projectron/projectron.vue';
import DpvComponent from '@/about/dpv/dpv.vue';
import InteropComponent from '@/about/interop/interop.vue';
import InterfaceComponent from '@/about/interface/interface.vue';

@Component({
  components: {
    SolidComponent,
    InteropComponent,
    InterfaceComponent,
    ProjectronComponent,
    DpvComponent,
  },
})
export default class AboutComponent extends Vue {
  @Prop({ type: Boolean, default: true })
  standalone: boolean;

  previous() {
    this.$emit('prev');
  }

  next() {
    this.$emit('next');
  }
}
