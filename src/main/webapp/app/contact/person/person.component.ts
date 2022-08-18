import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import { Person } from '@/contact/model/person.model';

@Component
export default class PersonComponent extends Vue {
  @Prop({ type: Person, required: true })
  person: Person;
}
