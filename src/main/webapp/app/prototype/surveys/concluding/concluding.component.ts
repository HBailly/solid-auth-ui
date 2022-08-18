import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import { Context } from '@/shared/model/context.model';
import { Questionnaire } from '@/questions/model/question.model';
import UsabilityComponent from '@/questions/usability/usability.vue';
import SatisfactionComponent from '@/questions/satisfaction/satisfaction.vue';
import SuggestionComponent from '@/questions/suggestion/suggestion.vue';

@Component({
  components: {
    UsabilityComponent,
    SatisfactionComponent,
    SuggestionComponent,
  },
})
export default class ConcludingComponent extends Vue {
  @Prop({ type: Context, required: true })
  context: Context;

  questionnaire: Questionnaire;

  data() {
    if (this.context.questionnaires.has(CONCLUDING)) {
      const questionnaire = this.context.questionnaires.get(CONCLUDING);
      return {
        questionnaire: questionnaire,
      };
    } else {
      const questionnaire = new Questionnaire(CONCLUDING);
      this.context.questionnaires.set(CONCLUDING, questionnaire);
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

  previous() {
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

export const CONCLUDING = 'Concluding';
