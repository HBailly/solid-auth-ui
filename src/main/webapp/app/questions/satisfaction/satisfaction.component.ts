import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import { Context } from '@/shared/model/context.model';
import {
  Choice,
  Choices,
  MultilineQuestion,
  QArray,
  Question,
  Questionnaire,
  RadioQuestion,
  Section,
} from '@/questions/model/question.model';
import ArrayQuestionComponent from '@/questions/model/array/arrayQuestion.vue';
import { AGREEMENT_SCALE, CLARITY_SCALE, SATISFACTION_SCALE, SCALE_1_TO_10 } from '@/questions/model/question.constant';

@Component({
  components: {
    ArrayQuestionComponent,
  },
})
export default class SatisfactionComponent extends Vue {
  @Prop({ type: Context, required: true })
  context: Context;

  @Prop({ type: Questionnaire, required: true })
  questionnaire: Questionnaire;

  array: QArray;

  private static generates(): Array<Question> {
    return [
      new RadioQuestion(
        'Overall, how satisfied/dissatisfied are you with the application access request interface?',
        SATISFACTION_SCALE,
        false,
        false,
        true
      ),
      new RadioQuestion(
        'Do you feel that, with the application access request interface like this, you could control the access to your data?',
        AGREEMENT_SCALE,
        false,
        false,
        true
      ),
      new RadioQuestion(
        'What was your impression of the time it took you to complete the tasks?',
        [
          new Choice('Too long'),
          new Choice('Too long but it was worthwhile'),
          new Choice('About the right amount of time'),
          new Choice('It took less time than I thought it would'),
        ],
        false,
        false,
        true
      ),
      new RadioQuestion(
        'What version did you find the most appropriate?',
        Choices([
          'Version 1 - Standard Project Management Solution.',
          'Version 2 - Project Management Solution with Dependency.',
          'Version 3 - Project Management Solution with Inheritance.',
          'I did not notice any difference.',
        ]),
        false,
        true,
        true
      ),
      new MultilineQuestion('What was the primary reason for your choice?'),
      new RadioQuestion(
        'In your opinion, the dependency relationships highlighted in the version 2 were...?',
        CLARITY_SCALE,
        false,
        false,
        true
      ),
      new RadioQuestion(
        'In your opinion, the inheritance relationships highlighted in the version 3 were...?',
        CLARITY_SCALE,
        false,
        false,
        true
      ),
      new RadioQuestion(
        'How informative did you find the access modes and creator access modes associated with each access need?',
        Choices([
          'Not at all informative',
          'Slightly informative',
          'Moderately informative',
          'Very informative',
          'Extremely informative',
          'I did not notice it',
        ]),
        false,
        false,
        true
      ),
      new MultilineQuestion('How would you describe the difference between the "existing" and "created" access modes (in your own words)?'),
      new RadioQuestion(
        'How informative did you find the type of data associated with each access need?',
        Choices([
          'Not at all informative',
          'Slightly informative',
          'Moderately informative',
          'Very informative',
          'Extremely informative',
          'I did not notice it',
        ]),
        false,
        false,
        true
      ),
      new RadioQuestion(
        'How informative did you find the GDPR personal data and purpose information associated with each access need?',
        Choices([
          'Not at all informative',
          'Slightly informative',
          'Moderately informative',
          'Very informative',
          'Extremely informative',
          'I did not notice it',
        ]),
        false,
        false,
        true
      ),
      new RadioQuestion(
        'How informative did you find the tooltips in the UI?',
        Choices([
          'Not at all informative',
          'Slightly informative',
          'Moderately informative',
          'Very informative',
          'Extremely informative',
          'I did not notice them',
        ]),
        false,
        false,
        true
      ),
      new RadioQuestion(
        'How useful did you find the icons in the UI?',
        Choices(['Not at all useful', 'Slightly useful', 'Moderately useful', 'Very useful', 'Extremely useful', 'I did not notice them']),
        false,
        false,
        true
      ),
      new RadioQuestion(
        'Did you watch some of the video tutorials?',
        Choices(['None of them', 'Some of them', 'Most of them', 'All of them', 'Only the demo', 'I did not see the tutorial section']),
        false,
        false,
        true
      ),
      new RadioQuestion(
        'On a scale from 1 to 10, how likely are you to recommend the application access request interface to a friend or colleague?',
        SCALE_1_TO_10
      ),
      new MultilineQuestion('What is the primary reason for your score?'),
    ];
  }

  data() {
    const name = 'Satisfaction';
    if (this.questionnaire.sectionsByName.has(name)) {
      const section = this.questionnaire.sectionsByName.get(name);
      return {
        array: new QArray(section.questions),
      };
    } else {
      const section = new Section(name);
      SatisfactionComponent.generates().forEach(question => section.questions.push(question));
      this.questionnaire.sectionsByName.set(section.name, section);
      return {
        array: new QArray(section.questions),
      };
    }
  }
}
