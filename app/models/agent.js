import Model, { attr } from '@ember-data/model';

export default class AgentModel extends Model {
  @attr uri;
  @attr name;
  @attr email;

  get label() {
    if (this.name && this.name.trim?.() != '') {
      return this.name;
    }

    return this.uri;
  }
}
