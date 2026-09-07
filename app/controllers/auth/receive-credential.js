import Controller from '@ember/controller';

export default class ReceiveCredentialController extends Controller {
  uriFetchUrl = '/vc-issuer/build-credential-offer-uri';
  statusPollUrl = '/vc-issuer/issuance-status';
  pendingMessage =
    'Please scan the QR code with your wallet app to prove you have access to the data.';
}
