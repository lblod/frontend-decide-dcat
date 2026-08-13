import Model, { attr } from '@ember-data/model';

export default class AgentModel extends Model {
  @attr uri;
  @attr name;
  @attr('string') email;

  get label() {
    if (this.name?.length >= 1 && this.name[0].content.trim() != '') {
      return this.name[0].content;
    }

    return this.uri;
  }
}
