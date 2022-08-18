import Component from 'vue-class-component';
import { Vue } from 'vue-property-decorator';
import { Person } from '@/contact/model/person.model';
import PersonComponent from '@/contact/person/person.vue';
import { ANOOP, HADRIEN, ROB } from '@/contact/model/authors.constant';

@Component({
  components: {
    PersonComponent,
  },
})
export default class AuthorsComponent extends Vue {
  authors: Array<Person>;

  data() {
    const authors = [HADRIEN, ANOOP, ROB];
    return {
      authors: authors,
    };
  }
}
