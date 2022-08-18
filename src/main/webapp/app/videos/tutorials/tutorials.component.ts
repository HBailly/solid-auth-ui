import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import ResourceComponent from '@/videos/tutorials/resource/resource.vue';

@Component({
  components: {
    ResourceComponent,
  },
})
export default class TutorialsComponent extends Vue {
  @Prop({ type: Boolean, default: true })
  standalone: boolean;

  expanded: boolean;

  data() {
    return {
      expanded: this.standalone,
    };
  }

  previous() {
    this.$emit('prev');
  }

  next() {
    this.$emit('next');
  }
}
