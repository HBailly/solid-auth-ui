import Component from 'vue-class-component';
import { Vue } from 'vue-property-decorator';
import ContextComponent from '@/prototype/scenario/context/context.vue';
import CalloutComponent from '@/core/callout/callout.vue';

@Component({
  components: {
    ContextComponent,
    CalloutComponent,
  },
})
export default class GuidelinesComponent extends Vue {
  mounted() {
    // @ts-ignore
    this.$refs.next.focus();
    window.scrollTo(0, 0);
  }

  callout() {
    return (
      'These permissions are to be understood under the context described hereafter.\n' +
      'Please again take the time to review this context in order to familiarize yourself with the content of the task.\n' +
      '(This will be repeated before each task.)'
    );
  }

  previous() {
    this.$emit('prev');
  }

  next() {
    this.$emit('next');
  }
}
