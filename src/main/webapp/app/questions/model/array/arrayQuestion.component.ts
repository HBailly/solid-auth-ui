import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import { Context } from '@/shared/model/context.model';
import { QArray, QuestionType, RadioQuestion } from '@/questions/model/question.model';

@Component
export default class ArrayQuestionComponent extends Vue {
  @Prop({ type: Context, required: true })
  context: Context;

  @Prop({ type: String, default: '' })
  section: string;

  @Prop({ type: QArray, default: () => QArray.empty() })
  array: QArray;

  data() {
    return {
      QuestionType,
    };
  }

  next() {
    this.$emit('next');
  }

  reset(question: RadioQuestion) {
    question.isOther = true;
    question.answer = null;
  }

  set(question: RadioQuestion) {
    question.isOther = false;
    question.answer = question.value;
  }
}
