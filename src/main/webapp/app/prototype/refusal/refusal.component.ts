import Component from 'vue-class-component';
import { Vue } from 'vue-property-decorator';

@Component
export default class RefusalComponent extends Vue {
  mounted() {
    // @ts-ignore
    this.$refs.back.focus();
    window.scrollTo(0, 0);
  }
}
