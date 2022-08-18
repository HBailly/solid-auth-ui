import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import { Context } from '@/shared/model/context.model';
import { Choices, QArray, Question, Questionnaire, RadioQuestion, Section, TextQuestion } from '@/questions/model/question.model';
import ArrayQuestionComponent from '@/questions/model/array/arrayQuestion.vue';

@Component({
  components: {
    ArrayQuestionComponent,
  },
})
export default class DemographicsComponent extends Vue {
  @Prop({ type: Context, required: true })
  context: Context;

  @Prop({ type: Questionnaire, required: true })
  questionnaire: Questionnaire;

  array: QArray;

  private static generates(): Array<Question> {
    return [
      new RadioQuestion('What is your gender?', Choices(['Male', 'Female', 'Non-binary', 'Prefer not to say'])),
      new RadioQuestion(
        'What is your age?',
        Choices(['Less than 16', '16-25 years old', '26-35 years old', '36-45 years old', '46-55 years old', '55 years old and over']),
        false,
        false,
        true
      ),
      new TextQuestion('What is your nationality?'),
      new RadioQuestion(
        'What is the highest level of education you have completed?',
        Choices([
          'Some high school, no diploma',
          'High school graduate, diploma or the equivalent',
          'Some college credit, no degree',
          'Trade/technical/vocational training',
          'Bachelor’s degree',
          'Master’s degree',
          'Professional degree',
          'Doctorate degree',
        ]),
        false,
        false,
        true
      ),
      new RadioQuestion(
        'On average, how many hours per day do you spend on the Internet?',
        Choices(['Less than 1 hour a day', '1-3 hours', '3-6 hours', '6-8 hours', 'More than 8 hours a day']),
        false,
        false,
        true
      ),
      new RadioQuestion(
        'What is your preferred device to surf the Internet?',
        Choices(['Desktop computer', 'Laptop computer', 'Tablet', 'Smartphone'])
      ),
    ];
  }

  data() {
    const name = 'Demographics';
    if (this.questionnaire.sectionsByName.has(name)) {
      const section = this.questionnaire.sectionsByName.get(name);
      return {
        array: new QArray(section.questions),
      };
    } else {
      const section = new Section(name);
      DemographicsComponent.generates().forEach(question => section.questions.push(question));
      this.questionnaire.sectionsByName.set(section.name, section);
      return {
        array: new QArray(section.questions),
      };
    }
  }
}
