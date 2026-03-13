import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class DcatDatasetsRoute extends Route {
  @service store;
  max_size = 100;

  queryParams = {
    size: {
      refreshModel: true,
    },
    page: {
      refreshModel: true,
    },
  };

  async model(params) {
    // This is a mirror image of <../../../controllers/dcat/datasets/index.js>. The code is duplicated here
    // because when the page is loaded, the `page` and `searchTerm` as they appear in the the query parameters
    // need to be used to restore the paginated search overview. Is there a better way?
    const opts = {
      page: {
        size: params.size < this.max_size ? params.size : this.max_size,
        number: params.page,
      },
      sort: 'modified',
      include: 'distributions',
    };
    if (params.searchTerm) {
      opts['filter[:or:]'] = params.searchTerm;
      opts['filter[:or:][distributions]'] = params.searchTerm;
    };
    return this.store.query('dataset', opts);
  }
}
