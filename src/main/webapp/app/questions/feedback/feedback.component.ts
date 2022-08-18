import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import { Context } from '@/shared/model/context.model';
import { Choices, QArray, Question, Questionnaire, RadioQuestion, Section } from '@/questions/model/question.model';
import ArrayQuestionComponent from '@/questions/model/array/arrayQuestion.vue';
import MatrixQuestionComponent from '@/questions/model/matrix/matrixQuestion.vue';

// https://mwcc.edu/wp-content/uploads/2020/09/Likert-Scale-Response-Options_MWCC.pdf

@Component({
  components: {
    ArrayQuestionComponent,
    MatrixQuestionComponent,
  },
})
export default class FeedbackComponent extends Vue {
  @Prop({ type: Context, required: true })
  context: Context;
  @Prop({ type: Questionnaire, required: true })
  questionnaire: Questionnaire;

  array: QArray;

  private static general(): Array<Question> {
    return [
      new RadioQuestion(
        'Granting access to...',
        Choices([
          'All of your projects',
          'All of your work projects',
          'All of your personal projects',
          'Only selected work projects',
          'Only selected personal projects',
          'Only projects shared with you by one, or more, given social agent(s)',
        ]),
        false,
        true,
        true
      ),
      new RadioQuestion(
        'Granting access to...',
        Choices([
          'All of your tasks',
          'All of your work tasks',
          'All of your personal tasks',
          'Only selected work tasks',
          'Only selected personal tasks',
          'Only tasks shared with you by one, or more, given social agent(s)',
        ]),
        false,
        true,
        true
      ),
      new RadioQuestion(
        'Granting access to...',
        Choices([
          'All of your contacts',
          'All of your work contacts',
          'All of your personal contacts',
          'Only selected work contacts',
          'Only selected personal contacts',
          'Only contacts shared with you by one, or more, given social agent(s)',
        ]),
        false,
        true,
        true
      ),
      new RadioQuestion(
        'Granting access to...',
        Choices([
          'All of your credit card details',
          'All of your work credit card details',
          'All of your personal credit card details',
          'Only selected work credit card details',
          'Only selected personal credit card details',
          'Only credit card details shared with you by one, or more, given social agent(s)',
        ]),
        false,
        true,
        true
      ),
      new RadioQuestion(
        'How have you defined the scope of access to your contacts?',
        Choices([
          'By specifying the scope for the access need "Manage your team members", and inheritance throughout the other needs.',
          'By specifying the scope individually for "Access to project managers" and "Access to tasks assignees"',
          'You did not grant access to your contacts.',
        ]),
        false,
        true,
        true
      ),
    ];
  }

  data() {
    const feedback = 'Feedback';
    console.log(this.questionnaire);
    if (this.questionnaire.sectionsByName.has(feedback)) {
      const section = this.questionnaire.sectionsByName.get(feedback);
      return {
        feedback: new QArray(section.questions, 'What do you remember agreeing to?'),
      };
    } else {
      const section = new Section(feedback);
      FeedbackComponent.general().forEach(question => section.questions.push(question));
      this.questionnaire.sectionsByName.set(section.name, section);
      return {
        array: new QArray(section.questions, 'What do you remember agreeing to?'),
      };
    }
  }
}
