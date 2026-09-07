import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class AuthBuyAccessController extends Controller {
    @service session;

    @action
    async buyAccess(){

        // Account & group for Jane Doe
        const accountId = "46a90284b5575f02aeea18127d4d0eda";
        const groupId = "7d7122bd82f165e091a36c830d041b59aa48e4be9ea0aa06dc4c67ef381b7505";
        await this.session.authenticate(
            'authenticator:mock-login',
            accountId,
            groupId,
        );
    }
}
