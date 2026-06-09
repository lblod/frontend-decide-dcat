import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class DcatDistributionsDistributionRoute extends Route {
  @service store;

  async model(params) {
    const distribution = await this.store.findRecord(
      'distribution',
      params.distribution_id,
    );
    return distribution;
  }
}
