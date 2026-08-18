import Model, { attr, belongsTo } from '@ember-data/model';

export default class DataServiceModel extends Model {
  @attr uri;
  @attr('string') title;
  @attr('string') description;
  @attr('string') endpointUrl;
  @attr('date') issued;
  @attr('date') modified;
  @attr('string') conformTo;

  @belongsTo('dataset', { async: true, inverse: null }) dataset;

  get label() {
    if (this.title && this.title?.trim() !== '') {
      return this.title;
    }

    return this.endpointUrl ?? this.id;
  }
}
