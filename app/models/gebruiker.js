import Model, { attr, hasMany } from '@ember-data/model';

export default class GebruikerModel extends Model {
  @attr voornaam;
  @attr achternaam;

  @hasMany('account', { async: false, inverse: 'gebruiker' }) account;
  @hasMany('bestuurseenheid', { async: false, inverse: null }) bestuurseenheden;

  get fullName() {
    return `${this.voornaam} ${this.achternaam}`.trim();
  }

  get group() {
    return this.bestuurseenheden.at(0);
  }
}
