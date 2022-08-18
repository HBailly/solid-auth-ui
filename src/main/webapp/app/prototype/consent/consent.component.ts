import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import { Context } from '@/shared/model/context.model';
import ArrayQuestionComponent from '@/questions/model/array/arrayQuestion.vue';
import { QArray, Question, RadioQuestion, Section } from '@/questions/model/question.model';
import { YES_NO_BOOLEAN } from '@/questions/model/question.constant';
import CalloutComponent from '@/core/callout/callout.vue';

@Component({
  components: {
    ArrayQuestionComponent,
    CalloutComponent,
  },
})
export default class InformedConsentComponent extends Vue {
  @Prop({ type: Context, required: true })
  context: Context;

  approved: boolean;

  array: QArray;

  private static generates(): Array<Question> {
    return [
      new RadioQuestion('I have read the Plain Language Statement (or had it read to me).', YES_NO_BOOLEAN),
      new RadioQuestion('I understand the information provided.', YES_NO_BOOLEAN),
      new RadioQuestion('I understand the information provided in relation to data protection.', YES_NO_BOOLEAN),
      new RadioQuestion('I have had an opportunity to ask questions and discuss this study.', YES_NO_BOOLEAN),
      new RadioQuestion('I have received satisfactory answers to all my questions.', YES_NO_BOOLEAN),
      new RadioQuestion('I am aware that I may withdraw from the Research Study at any point.', YES_NO_BOOLEAN),
      new RadioQuestion(
        'I have read and understand the arrangements to be made to protect the confidentiality of data,' +
          ' including that confidentiality of information provided is subject to legal limitations.',
        YES_NO_BOOLEAN
      ),
      new RadioQuestion(
        'I have read and understand information relating to any other relevant information\n' +
          'as indicated in the Plain Language Statement.',
        YES_NO_BOOLEAN
      ),
      new RadioQuestion('I consent to participate in this research study.', YES_NO_BOOLEAN),
    ];
  }

  data() {
    const name = 'Consent';
    if (this.context.consent != null) {
      const approved: boolean = this.isAllApproved();
      return {
        array: new QArray(this.context.consent.questions),
        approved: approved,
      };
    } else {
      const section = new Section(name);
      InformedConsentComponent.generates().forEach(question => section.questions.push(question));
      this.context.consent = section;
      const approved: boolean = this.isAllApproved();
      return {
        array: new QArray(section.questions),
        approved: approved,
      };
    }
  }

  mounted() {
    // @ts-ignore
    this.$refs.next.focus();
    window.scrollTo(0, 0);
  }

  submit(event) {
    event.preventDefault();
    if (this.isAllApproved()) {
      this.approved = true;
      this.$emit('next');
    } else {
      alert('You have not fully consented to this research, therefore may not proceed.');
    }
  }

  previous() {
    this.$emit('prev');
  }

  refuse() {
    if (
      confirm(
        'If you do not consent to this research, you may not proceed to the next section and will leave the experiment.\n' +
          'Do you wish to refuse?'
      )
    ) {
      this.approved = false;
      // noinspection JSIgnoredPromiseFromCall
      this.$router.push({
        path: `/refusal`,
      });
    }
  }

  next() {
    this.$emit('next');
  }

  private isAllApproved() {
    const questions = this.context.consent.questions;
    const result: boolean = questions.map(q => Boolean(q.answer)).reduce((a, b) => a && b);
    return result;
  }
}
