import Model, { attr, belongsTo } from '@ember-data/model';

export default class DistributionModel extends Model {
  @attr uri;
  @attr title;
  @attr description;
  @attr issued;
  @attr modified;
  @attr license;
  @attr rights;
  @attr accessUrl;
  @attr downloadUrl;
  @attr mediaType;
  @attr byteSize;

  @belongsTo('dataset', { async: true, inverse: 'distributions' }) dataset;
  @belongsTo('format', { async: true, inverse: 'distributions' }) format;
}
