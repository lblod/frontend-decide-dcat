import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class DcatDistributionsDistributionRoute extends Route {
  @service store;

  async model(params) {
    const dataservices = await this.store.findRecord(
      'data-service',
      params.dataservice_id,
    );
    return dataservices;
  }
}
