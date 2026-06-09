import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class SparqlRoute extends Route {
  @service features;
  @service router;

  async beforeModel(/* transition */) {
    if (!this.features.isEnabled('sparql-endpoint')) {
      this.router.replaceWith('index');
    }
  }
}
