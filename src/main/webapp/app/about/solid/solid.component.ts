import Component from 'vue-class-component';
import { Vue } from 'vue-property-decorator';

@Component({})
export default class SolidComponent extends Vue {
  expanded: boolean;

  data() {
    return {
      expanded: false,
    };
  }
}
