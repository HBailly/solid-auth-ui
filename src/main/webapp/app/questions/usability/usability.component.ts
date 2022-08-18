import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import { Context } from '@/shared/model/context.model';
import { QMatrix, Questionnaire, RadioQuestion, Section } from '@/questions/model/question.model';
import MatrixQuestionComponent from '@/questions/model/matrix/matrixQuestion.vue';
import { AGREEMENT_QUESTION, AGREEMENT_SCALE } from '@/questions/model/question.constant';

@Component({
  components: {
    MatrixQuestionComponent,
  },
})
export default class UsabilityComponent extends Vue {
  @Prop({ type: Context, required: true })
  context: Context;
  @Prop({ type: Questionnaire, required: true })
  questionnaire: Questionnaire;

  matrix: QMatrix;

  private static generates(): Array<RadioQuestion> {
    return [
      new RadioQuestion('I think that I would like to use this system frequently.', []),
      new RadioQuestion('I found the system unnecessarily complex.', []),
      new RadioQuestion('I thought the system was easy to use.', []),
      new RadioQuestion('I think that I would need the support of a technical person to be able to use this system.', []),
      new RadioQuestion('I found the various functions in this system were well integrated.', []),
      new RadioQuestion('I thought there was too much inconsistency in this system.', []),
      new RadioQuestion('I would imagine that most people would learn to use this system very quickly', []),
      new RadioQuestion('I found the system very cumbersome to use.', []),
      new RadioQuestion('I felt very confident using the system.', []),
      new RadioQuestion('I needed to learn a lot of things before I could get going with this system', []),
    ];
  }

  data() {
    const name = 'SUS';
    if (this.questionnaire.sectionsByName.has(name)) {
      const section = this.questionnaire.sectionsByName.get(name);
      return {
        matrix: new QMatrix(AGREEMENT_QUESTION, section.questions, AGREEMENT_SCALE),
      };
    } else {
      const section = new Section(name);
      UsabilityComponent.generates().forEach(question => section.questions.push(question));
      this.questionnaire.sectionsByName.set(section.name, section);
      return {
        matrix: new QMatrix(AGREEMENT_QUESTION, section.questions, AGREEMENT_SCALE),
      };
    }
  }
}
