import Model, { attr } from '@ember-data/model';

export default class BestuurseenheidModel extends Model {
  @attr uri;
  @attr naam;
}
