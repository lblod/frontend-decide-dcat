import { service } from '@ember/service';
import Route from '@ember/routing/route';
import ENV from 'frontend-decide-dcat/config/environment';
import buildUrlFromConfig from '@lblod/ember-acmidm-login/utils/build-url-from-config';

export default class ReceiveCredentialRoute extends Route {
  @service session;

  async beforeModel(transition) {
    this.session.requireAuthentication(transition, () => {
      console.log('foo');
      window.location.href = buildUrlFromConfig(ENV.acmidm);
    });
  }
}
