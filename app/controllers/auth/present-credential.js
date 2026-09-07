import Controller from '@ember/controller';

export default class PresentCredentialController extends Controller {
  uriFetchUrl = `/vc-verifier/build-authorization-request-uri?redirectUri=${window.location.origin}/present-credential-callback`;
  statusPollUrl = '/vc-verifier/authorization-request-status';
  pendingMessage =
    'Scan the QR-code with your connected wallet to receive your credential.';
  prohibitAuth = true;
}
