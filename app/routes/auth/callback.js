import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AuthCallbackRoute extends Route {
  @service session;

  beforeModel() {
    // redirect to index if already authenticated
    this.session.prohibitAuthentication('auth.receive-credential');
  }

  async model(params) {
    if (params.code) {
      try {
        await this.session.authenticate('authenticator:acm-idm', params.code);
      } catch (error) {
        throw new Error(
          'Something went wrong while authenticating the user in the backend. The token might be expired.',
          { cause: error },
        );
      }
    } else {
      this.router.replaceWith('auth');
    }
  }
}
