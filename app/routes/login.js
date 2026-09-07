import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class LoginRoute extends Route {
  @service router;
  @service session;

  beforeModel() {
    if (this.session.prohibitAuthentication('index')) {
      this.router.replaceWith('auth');
    }
  }
}
