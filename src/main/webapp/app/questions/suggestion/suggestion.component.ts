import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import { Context } from '@/shared/model/context.model';
import { MultilineQuestion, QArray, Question, Questionnaire, Section } from '@/questions/model/question.model';
import ArrayQuestionComponent from '@/questions/model/array/arrayQuestion.vue';

@Component({
  components: {
    ArrayQuestionComponent,
  },
})
export default class SuggestionComponent extends Vue {
  @Prop({ type: Context, required: true })
  context: Context;

  @Prop({ type: Questionnaire, required: true })
  questionnaire: Questionnaire;

  array: QArray;

  private static generates(): Array<Question> {
    return [
      new MultilineQuestion('What did you particularly *like* about the application access request interface?', true),
      new MultilineQuestion('What did you particularly *dislike* about the application access request interface?', true),
      new MultilineQuestion('In your opinion, what could be done to improve the interface?', true),
    ];
  }

  data() {
    const name = 'Suggestion';
    if (this.questionnaire.sectionsByName.has(name)) {
      const section = this.questionnaire.sectionsByName.get(name);
      return {
        array: new QArray(section.questions),
      };
    } else {
      const section = new Section(name);
      SuggestionComponent.generates().forEach(question => section.questions.push(question));
      this.questionnaire.sectionsByName.set(section.name, section);
      return {
        array: new QArray(section.questions),
      };
    }
  }
}
