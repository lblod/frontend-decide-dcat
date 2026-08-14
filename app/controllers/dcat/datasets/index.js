import Controller from '@ember/controller';

import { tracked } from '@glimmer/tracking';

import { task, timeout } from 'ember-concurrency';

export default class DcatDatasetsController extends Controller {
  queryParams = ['searchTerm', 'page'];

  @tracked searchTerm = '';
  @tracked page = 0;
  @tracked size = 5;

  updateSearch = task({ restartable: true }, async (value) => {
    await timeout(500);
    this.page = 0;
    this.searchTerm = value;
  });
}
