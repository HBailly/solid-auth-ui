import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import { Context } from '@/shared/model/context.model';
import WestinComponent from '@/questions/westin/westin.vue';
import { Questionnaire } from '@/questions/model/question.model';
import DemographicsComponent from '@/questions/demographics/demographics.vue';
import KnowledgeComponent from '@/questions/knowledge/knowledge.vue';

@Component({
  components: {
    DemographicsComponent,
    KnowledgeComponent,
    WestinComponent,
  },
})
export default class PreliminaryComponent extends Vue {
  @Prop({ type: Context, required: true })
  context: Context;

  questionnaire: Questionnaire;
  count: number;

  data() {
    if (this.context.questionnaires.has(PRELIMINARY)) {
      const questionnaire = this.context.questionnaires.get(PRELIMINARY);
      return {
        questionnaire: questionnaire,
        count: 0,
      };
    } else {
      const questionnaire = new Questionnaire(PRELIMINARY);
      this.context.questionnaires.set(PRELIMINARY, questionnaire);
      return {
        questionnaire: questionnaire,
        count: 0,
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

export const PRELIMINARY = 'Preliminary';
