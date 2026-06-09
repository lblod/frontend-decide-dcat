import EmberRouter from '@ember/routing/router';
import config from 'frontend-decide-dcat/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('dcat', function () {
    this.route('distributions.distribution', {
      path: '/distributions/:distribution_id',
    });
    this.route('datasets', function () {
      this.route('index', { path: '' });
      this.route('dataset', { path: '/:dataset_id' });
    });
    this.route('catalogs', function () {
      this.route('index', { path: '' });
      this.route('catalog', { path: '/:catalog_id' });
    });
  });

  this.route('sparql');

  this.route('route-not-found', {
    path: '/*wildcard',
  });
});
