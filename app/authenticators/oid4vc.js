import { waitFor } from '@ember/test-waiters';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';

const basePath = '/vc-verifier/sessions';
const contentType = 'application/vnd.api+json';
const supportedCredentials = 'same-origin';

export default class Oid4VcAuthenticator extends BaseAuthenticator {
  @waitFor
  async restore() {
    const url = `${basePath}/current`;
    const result = await fetch(url, {
      credentials: supportedCredentials,
      headers: new Headers({
        'Content-Type': contentType,
      }),
    });
    if (result.ok) return (await result.json());
    else throw result;
  }

  @waitFor
  async authenticate() {
    return this.restore()
  }

  @waitFor
  async invalidate() {
    const url = `${basePath}/current`;
    const result = await fetch(url, {
      method: 'DELETE',
      credentials: supportedCredentials,
      headers: new Headers({
        'Content-Type': contentType,
      }),
    });
    if (result.ok) return result;
    else throw result;
  }
}