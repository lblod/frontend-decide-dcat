import SessionService from 'ember-simple-auth/services/session';
import { service } from '@ember/service';

export default class DecideSessionService extends SessionService {
  @service currentSession;
  @service router;

  get isAcmIdmSession() {
    return this.isAuthenticated
      ? this.data.authenticated.authenticator.includes('acm-idm')
      : false;
  }

  async handleAuthentication(routeAfterAuthentication) {
    await this.currentSession.load();

    // (Workaround:) When we log in through the buy access button, we
    // arrive in a logged in state as expected but we also immediately
    // want to present a QR code for receiving a verifiable credential.
    if (this.router.currentRouteName === 'auth.buy-access'){
      // ember-simple-auth wants to bring us back to the route that we
      // started with before authentication, but in this case we don't
      // want that
      this.attemptedTransition = null;
      super.handleAuthentication('auth.receive-credential');
    }
    else {
      super.handleAuthentication(routeAfterAuthentication);
    }
  }

  async handleInvalidation() {
    // Handled in `logout` route
  }
}
