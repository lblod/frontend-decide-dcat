import Component from '@glimmer/component';
import QRCode from 'qrcode';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class QrCodeComponent extends Component {
  @tracked isLoading = true;

  constructor() {
    super(...arguments);
    this.generateQr();
  }

  @action
  async generateQr() {
    if (!this.args.link) return;
    this.isLoading = true;
    await new Promise((resolve) => setTimeout(resolve, 250));
    try {
      const canvas = document.getElementById('qrCode');
      if (!canvas) throw new Error('Canvas element not found');

      await QRCode.toCanvas(canvas, this.args.link, {
        width: 300,
        height: 300,
      });
    } catch (error) {
      console.error('QR Code generation error:', error);
    } finally {
      this.isLoading = false;
    }
  }
}
