import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class DcatCatalogsCatalogsRoute extends Route {
  @service store;

  async model() {
    const catalogs = await this.store.query('catalog', {
      include: [
        'record',
        'publisher',
        'theme-taxonomy',
        'datasets.distributions',
        'datasets.themes',
        'datasets.publisher',
      ].join(','),
    });
    return { catalogs };
  }
}
