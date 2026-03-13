import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class DcatDatasetsDatasetRoute extends Route {
  @service store;

  async model(params) {
    const dataset = await this.store.findRecord('dataset', params.dataset_id);
    return dataset;
  }
}
