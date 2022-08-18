import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import { Context } from '@/shared/model/context.model';
import { QMatrix, Question, Questionnaire, RadioQuestion, Section } from '@/questions/model/question.model';
import MatrixQuestionComponent from '@/questions/model/matrix/matrixQuestion.vue';
import { AGREEMENT_QUESTION, AGREEMENT_SCALE } from '@/questions/model/question.constant';

@Component({
  components: {
    MatrixQuestionComponent,
  },
})
export default class WestinComponent extends Vue {
  @Prop({ type: Context, required: true })
  context: Context;
  @Prop({ type: Questionnaire, required: true })
  questionnaire: Questionnaire;

  matrix: QMatrix;

  private static generates(): Array<Question> {
    return [
      new RadioQuestion('I am concerned about online identity  theft.', []),
      new RadioQuestion('I am concerned about my privacy online.', []),
      new RadioQuestion('I am concerned about my privacy in  everyday life.', []),
      new RadioQuestion('I am likely to read  the privacy policy of  an ecommerce site before buying anything.', []),
      new RadioQuestion('Privacy policies accurately reflect what  companies do.', []),
    ];
  }

  data() {
    const name = 'Westin';
    if (this.questionnaire.sectionsByName.has(name)) {
      const section = this.questionnaire.sectionsByName.get(name);
      return {
        matrix: new QMatrix(AGREEMENT_QUESTION, section.questions, AGREEMENT_SCALE),
      };
    } else {
      const section = new Section(name);
      WestinComponent.generates().forEach(question => section.questions.push(question));
      this.questionnaire.sectionsByName.set(section.name, section);
      return {
        matrix: new QMatrix(AGREEMENT_QUESTION, section.questions, AGREEMENT_SCALE),
      };
    }
  }
}
