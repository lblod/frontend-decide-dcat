import Route from '@ember/routing/route';
import { service } from '@ember/service';
import ENV from 'frontend-decide-dcat/config/environment';

export default class LogoutRoute extends Route {
  @service router;
  @service session;

  async beforeModel(transition) {
    if (this.session.requireAuthentication(transition, 'login')) {
      try {
        let wasAcmIdmSession = this.session.isAcmIdmSession;
        await this.session.invalidate();
        let logoutUrl = wasAcmIdmSession
          ? ENV.acmidm.logoutUrl
          : this.router.urlFor('index');

        window.location.replace(logoutUrl);
      } catch (error) {
        throw new Error(
          'Something went wrong while trying to remove the session on the server',
          {
            cause: error,
          },
        );
      }
    }
  }
}
