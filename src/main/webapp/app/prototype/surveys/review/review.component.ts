import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import { Context } from '@/shared/model/context.model';
import { Questionnaire } from '@/questions/model/question.model';
import FeedbackComponent from '@/questions/feedback/feedback.vue';

@Component({
  components: {
    FeedbackComponent,
  },
})
export default class ReviewComponent extends Vue {
  @Prop({ type: Context, required: true })
  context: Context;

  questionnaire: Questionnaire;

  data() {
    if (this.context.questionnaires.has(REVIEW)) {
      const questionnaire = this.context.questionnaires.get(REVIEW);
      return {
        questionnaire: questionnaire,
      };
    } else {
      const questionnaire = new Questionnaire(REVIEW);
      this.context.questionnaires.set(REVIEW, questionnaire);
      return {
        questionnaire: questionnaire,
      };
    }
  }

  mounted() {
    // @ts-ignore
    this.$refs.next.focus();
    window.scrollTo(0, 0);
  }

  previous(event) {
    this.$emit('prev');
  }

  submit(event) {
    event.preventDefault();
    this.$emit('next');
  }

  next() {
    this.$emit('next');
  }
}

export const REVIEW = 'review';
