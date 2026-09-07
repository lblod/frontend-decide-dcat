import Route from '@ember/routing/route';

import { service } from '@ember/service';
import { warn } from '@ember/debug';
export default class ApplicationRoute extends Route {
  @service currentSession;
  @service session;
  @service currentSession;
  @service session;

  async beforeModel() {
    await this.session.setup();
    await this._loadCurrentSession();
  }

  async _loadCurrentSession() {
    try {
      await this.currentSession.load();
    } catch (error) {
      warn(error, { id: 'current-session-load-failure' });
      this.router.transitionTo('logout');
    }
  }

  async model() {
    return { account: this.currentSession.account };
  }
}
