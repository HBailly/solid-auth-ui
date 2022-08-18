import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import DemoComponent from '@/videos/demo/demo.vue';
import TutorialsComponent from '@/videos/tutorials/tutorials.vue';

@Component({
  components: {
    DemoComponent,
    TutorialsComponent,
  },
})
export default class VideosComponent extends Vue {
  @Prop({ type: Boolean, default: true })
  standalone: boolean;

  previous() {
    this.$emit('prev');
  }

  next() {
    this.$emit('next');
  }
}
