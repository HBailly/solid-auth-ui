import Component from 'vue-class-component';
import { Inject, Vue } from 'vue-property-decorator';
import LoginService from '@/account/login.service';
import CalloutComponent from '@/core/callout/callout.vue';

@Component({
  components: {
    CalloutComponent,
  },
})
export default class Home extends Vue {
  @Inject('loginService')
  private loginService: () => LoginService;

  public get authenticated(): boolean {
    return this.$store.getters.authenticated;
  }

  public get username(): string {
    return this.$store.getters.account?.login ?? '';
  }

  public openLogin(): void {
    this.loginService().openLogin((<any>this).$root);
  }
}
