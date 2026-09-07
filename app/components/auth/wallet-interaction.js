import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class WalletInteractionComponent extends Component {
  interval = 30; // QR refresh interval in seconds
  @service store;
  @service session;
  @service router;

  @tracked qrCodeUrl = '';
  @tracked pin = '';
  @tracked statusObject = null;
  @tracked qrTimeLeft = this.interval;
  @tracked qrExpired = false;

  statusInterval = null;
  qrInterval = null;
  qrTimer = null;

  constructor() {
    super(...arguments);
    if (this.args.prohibitAuth) {
      this.session.prohibitAuthentication('mock-login');
    }

    this.initCredentialFlow();
  }

  get qrMinutes() {
    return Math.floor(this.qrTimeLeft / 60);
  }

  get qrSeconds() {
    return this.qrTimeLeft % 60;
  }

  async initCredentialFlow() {
    this.statusObject = this.store.createRecord('credential-status', {
      status: 'pending',
    });

    await this.fetchUri();
    this.startStatusPolling();
  }

  async fetchUri() {
    const response = await fetch(this.args.uriFetchUrl);
    const data = await response.json();

    this.qrCodeUrl =
      data.credentialOfferUri ?? data.authorizationRequestUri ?? '';
    this.pin = data.pin ?? '';
    this.qrExpired = false;
    this.startQrCountdown();
  }

  startQrCountdown() {
    if (this.qrTimer) clearInterval(this.qrTimer);

    this.qrExpired = false;
    this.qrTimeLeft = this.interval;

    this.qrTimer = setInterval(() => {
      if (this.qrTimeLeft > 0) {
        this.qrTimeLeft -= 1;
      } else {
        clearInterval(this.qrTimer);
        this.qrTimer = null;
        this.qrExpired = true;
      }
    }, 1000);
  }

  startStatusPolling() {
    this.statusInterval = setInterval(async () => {
      const response = await fetch(this.args.statusPollUrl);
      const { status } = await response.json();
      this.statusObject.status = status;

      if (!['pending', 'received'].includes(status)) {
        clearInterval(this.statusInterval);
      }
      if (status === 'received') {
        if (this.qrInterval) clearInterval(this.qrInterval);
        if (this.qrTimer) clearInterval(this.qrTimer);
        this.qrInterval = null;
        this.qrTimer = null;
      }

      if (status === 'accepted') {
        await this.session.authenticate('authenticator:oid4vc');
      }

      if (this.statusObject.status === 'issued') {
        this.router.transitionTo('index');
      }
    }, 3000);
  }

  startQrRefresh() {
    this.qrInterval = setInterval(async () => {
      await this.fetchUri();
    }, this.interval * 1000);
  }

  willDestroy() {
    super.willDestroy(...arguments);
    this.resetAll();
  }

  resetAll() {
    if (this.statusInterval) clearInterval(this.statusInterval);
    if (this.qrInterval) clearInterval(this.qrInterval);
    if (this.qrTimer) clearInterval(this.qrTimer);

    this.qrCodeUrl = '';
    this.pin = '';
    this.statusObject = null;
    this.qrTimeLeft = this.interval;

    this.statusInterval = null;
    this.qrInterval = null;
    this.qrTimer = null;
  }

  @action
  cancelWalletInteraction() {
    this.resetAll();
    this.initCredentialFlow();
  }
}
