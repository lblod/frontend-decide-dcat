import Model, { attr, belongsTo } from '@ember-data/model';

export default class DataServiceModel extends Model {
  @attr uri;
  @attr('string') title;
  @attr('string') description;
  @attr('datetime') issued;
  @attr('datetime') modified;

  @belongsTo('dataset', { async: true, inverse: null }) dataset;
}
