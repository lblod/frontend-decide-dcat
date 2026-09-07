import Route from '@ember/routing/route';

import { service } from '@ember/service';

export default class SparqlRoute extends Route {
  @service session;

  async beforeModel(transition) {
    this.session.requireAuthentication(transition, 'auth.buy-access');
  }
}
