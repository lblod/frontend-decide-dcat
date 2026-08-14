import Model, { attr } from '@ember-data/model';

export default class AgentModel extends Model {
  @attr uri;
  @attr name;
  @attr email;

  get label() {
    if (
      Array.isArray(this.name) &&
      this.name.length >= 1 &&
      this.name[0].content.trim() != ''
    ) {
      // If language-string-set is set we show the first value e.g "name"@nl
      return this.name[0].content;
    }

    if (this.name && this.name.trim?.() != '') {
      return this.name;
    }

    return this.uri;
  }
}
