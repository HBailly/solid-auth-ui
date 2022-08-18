import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import ContactComponent from '@/contact/contact.vue';
import PersonComponent from '@/contact/person/person.vue';
import { Context } from '@/shared/model/context.model';
import { ANOOP, HADRIEN, ROB } from '@/contact/model/authors.constant';
import { Person } from '@/contact/model/person.model';
import { Address } from '@/contact/model/address.model';

@Component({
  components: {
    ContactComponent,
    PersonComponent,
  },
})
export default class PlainLanguageStatementComponent extends Vue {
  @Prop({ type: Context, required: true })
  context: Context;

  data() {
    return {
      HADRIEN,
      ANOOP,
      ROB,
      SECRETARY,
      WARD,
    };
  }

  mounted() {
    // @ts-ignore
    this.$refs.next.focus();
    window.scrollTo(0, 0);
  }

  previous() {
    this.$emit('prev');
  }

  next() {
    this.$emit('next');
  }
}

export const COMMITTEE = new Address('c/o Research and Innovation Support', 'Dublin City University', null, 'Dublin 9');
export const DPO = new Address(null, 'Dublin City University', null, 'Dublin 9');

export const SECRETARY = new Person(
  'The Secretary',
  null,
  'Dublin City University Research Ethics Committee',
  COMMITTEE,
  '01-7008000',
  'rec@dcu.ie'
);

export const WARD = new Person('Martin', 'Ward', 'Data Protection Officer', DPO, '7005118/7008257', 'data.protection@dcu.ie');
