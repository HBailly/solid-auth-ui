import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import { Person } from '@/contact/model/person.model';
import AuthorsComponent from '@/contact/authors/authors.vue';
import { ANOOP, HADRIEN, ROB } from '@/contact/model/authors.constant';

@Component({
  components: {
    AuthorsComponent,
  },
})
export default class ContactComponent extends Vue {
  @Prop({ type: Boolean, default: true })
  standalone: boolean;

  authors: Array<Person>;

  data() {
    const authors = [HADRIEN, ANOOP, ROB];
    return {
      authors: authors,
    };
  }
}
