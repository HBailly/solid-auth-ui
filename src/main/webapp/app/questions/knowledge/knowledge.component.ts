import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import { Context } from '@/shared/model/context.model';
import { Choices, QArray, Question, Questionnaire, RadioQuestion, Section } from '@/questions/model/question.model';
import ArrayQuestionComponent from '@/questions/model/array/arrayQuestion.vue';
import { EXPERIENCE_SCALE } from '@/questions/model/question.constant';

@Component({
  components: {
    ArrayQuestionComponent,
  },
})
export default class KnowledgeComponent extends Vue {
  @Prop({ type: Context, required: true })
  context: Context;

  @Prop({ type: Questionnaire, required: true })
  questionnaire: Questionnaire;

  array: QArray;

  private static generates(): Array<Question> {
    return [
      new RadioQuestion('How many years of experience do you have with SOLID?', EXPERIENCE_SCALE),
      new RadioQuestion('How many years of experience do you have with programming?', EXPERIENCE_SCALE),
      new RadioQuestion(
        'How many years of experience do you have with the General Data Protection Regulation (GDPR) compliance requirements?',
        EXPERIENCE_SCALE
      ),
      new RadioQuestion(
        'How familiar are you with the Data Interoperability Panel specification?',
        Choices(['Not at all familiar', 'Slightly familiar', 'Moderately familiar', 'Very familiar', 'Extremely familiar']),
        false,
        false,
        true
      ),
    ];
  }

  data() {
    const name = 'Knowledge';
    if (this.questionnaire.sectionsByName.has(name)) {
      const section = this.questionnaire.sectionsByName.get(name);
      return {
        array: new QArray(section.questions),
      };
    } else {
      const section = new Section(name);
      KnowledgeComponent.generates().forEach(question => section.questions.push(question));
      this.questionnaire.sectionsByName.set(section.name, section);
      return {
        array: new QArray(section.questions),
      };
    }
  }
}
