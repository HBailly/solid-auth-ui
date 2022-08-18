import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import CalloutComponent from '@/core/callout/callout.vue';
import AboutComponent from '@/about/about.vue';
import GlossaryComponent from '@/glossary/glossary.vue';
import VideosComponent from '@/videos/videos.vue';
import { Context, ExperimentStage } from '@/shared/model/context.model';
import { CalloutType } from '@/core/callout/model/callout.constant';

@Component({
  components: {
    CalloutComponent,
    AboutComponent,
    VideosComponent,
    GlossaryComponent,
  },
})
export default class OpeningComponent extends Vue {
  @Prop({ type: Context, required: true })
  context: Context;

  @Prop({ type: Number, required: true })
  stage: ExperimentStage;

  data() {
    return {
      CalloutType,
      ExperimentStage,
    };
  }

  mounted() {
    // @ts-ignore
    this.$refs.next.focus();
    window.scrollTo(0, 0);
  }

  callout(): string {
    return (
      'In this page, you find useful contextual information about this prototype.\n' +
      'We strongly encourage you to watch the videos and read the cards in order to familiarize yourself with this prototype, before moving on to the tasks.\n' +
      'Thank you for your time and patience.'
    );
  }

  updated() {
    // @ts-ignore
    this.$refs.next.focus();
    window.scrollTo(0, 0);
  }

  previous() {
    this.$emit('prev');
  }

  next() {
    this.$emit('next');
  }
}
