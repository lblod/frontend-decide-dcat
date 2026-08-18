import Model, { attr, belongsTo } from '@ember-data/model';

export default class DistributionModel extends Model {
  @attr uri;
  @attr title;
  @attr description;
  @attr('date') issued;
  @attr('date') modified;
  @attr license;
  @attr rights;
  @attr accessUrl;
  @attr downloadUrl;
  @attr mediaType;
  @attr byteSize;
  @attr format;

  @belongsTo('dataset', { async: true, inverse: 'distributions' }) dataset;

  get label() {
    if (this.title && this.title?.trim() !== '') {
      return this.title;
    }

    return this.accessUrl ?? this.id;
  }
}
