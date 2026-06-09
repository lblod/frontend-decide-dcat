import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class CatalogModel extends Model {
  @attr uri;
  @attr title;
  @attr description;
  @attr issued;
  @attr modified;
  @attr language;
  @attr license;
  @attr rights;
  @attr spatial;
  @attr homepage;

  @belongsTo('agent', { async: true, inverse: null }) publisher;
  @belongsTo('concept-scheme', { async: true, inverse: 'catalogs' })
  themeTaxonomy;
  @belongsTo('catalog-record', { async: true, inverse: 'catalog' }) record;
  @hasMany('dataset', { async: true, inverse: 'catalog' }) datasets;
}
