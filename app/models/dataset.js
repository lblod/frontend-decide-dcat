import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class DatasetModel extends Model {
  @attr uri;
  @attr title;
  @attr description;
  @attr issued;
  @attr modified;
  @attr identifier;
  @attr('string-array') keyword;
  @attr language;
  @attr contactPoint;
  @attr temporal;
  @attr accrualPeriodicity;
  @attr landingPage;

  @belongsTo('agent', { async: true, inverse: null }) publisher;
  @belongsTo('catalog', { async: true, inverse: 'datasets' }) catalog;
  @belongsTo('catalog-record', { async: true, inverse: 'primaryTopic' })
  primaryTopic;
  @hasMany('concept', { async: true, inverse: 'datasets' }) themes;
  @hasMany('distribution', { async: true, inverse: 'dataset' }) distributions;
}
