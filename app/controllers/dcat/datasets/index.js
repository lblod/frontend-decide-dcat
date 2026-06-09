import Controller from '@ember/controller';

import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

import { task, timeout } from 'ember-concurrency';

export default class DcatDatasetsController extends Controller {
  @service store;

  queryParams = ['searchTerm', 'page'];
  @tracked model;
  @tracked searchTerm = '';
  @tracked page = 0;
  @tracked size = 5;
  max_size = 100;

  queryStore = task(async () => {
    const opts = {
      page: {
        size: this.size < this.max_size ? this.size : this.max_size,
        number: this.page,
      },
      sort: 'modified',
      include: 'distributions',
    };
    // Search for the term in in both dataset and distributions, so that a user can find, for
    // example, datasets based on one of the available formats. Details in commit message 9ff8c8b.
    if (this.searchTerm) {
      opts['filter[:or:]'] = this.searchTerm;
      opts['filter[:or:][distributions]'] = this.searchTerm;
    }
    const dataset = await this.store.query('dataset', opts);
    return dataset;
  });

  updateSearch = task({ restartable: true }, async (value) => {
    await timeout(500);
    this.page = 0;
    this.searchTerm = value;
    this.model = await this.queryStore.perform();
  });
}
