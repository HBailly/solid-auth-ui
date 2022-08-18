import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import { Context } from '@/shared/model/context.model';
import { QMatrix, QuestionType, RadioQuestion } from '@/questions/model/question.model';

@Component
export default class QuestionComponent extends Vue {
  @Prop({ type: Context, required: true })
  context: Context;

  @Prop({ type: QMatrix, default: () => QMatrix.empty() })
  matrix: QMatrix;

  data() {
    return {
      QuestionType,
    };
  }

  resetQ(question: RadioQuestion) {
    question.isOther = true;
    question.answer = null;
  }

  setQ(question: RadioQuestion) {
    question.isOther = false;
    question.answer = question.value;
  }
}
