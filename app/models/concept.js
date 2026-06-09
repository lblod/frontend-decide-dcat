import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class ConceptModel extends Model {
  @attr uri;
  @hasMany('dataset', { async: true, inverse: 'themes' }) datasets;
  @belongsTo('concept-scheme', { async: true, inverse: 'concepts' })
  conceptScheme;
}
