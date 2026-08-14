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
    searchTerm: {
      refreshModel: true,
    },
  };

  async model(params) {
    const queryOptions = {
      page: {
        size: params.size < this.max_size ? params.size : this.max_size,
        number: params.page,
      },
      sort: 'modified',
      include: ['distributions', 'data-services'].join(','),
    };
    if (params.searchTerm) {
      queryOptions['filter[:or:]'] = params.searchTerm;
      queryOptions['filter[:or:][distributions]'] = params.searchTerm;
    }
    return this.store.query('dataset', queryOptions);
  }
}
