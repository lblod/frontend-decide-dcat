import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class DcatCatalogsCatalogRoute extends Route {
  @service store;

  async model(params) {
    const catalog = await this.store.findRecord('catalog', params.catalog_id);
    return catalog;
  }
}
