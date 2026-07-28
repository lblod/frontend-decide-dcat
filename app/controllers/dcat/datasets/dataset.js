import Controller from '@ember/controller';

import { action } from '@ember/object';
import { service } from '@ember/service';

export default class DcatDatasetsDatasetController extends Controller {
  @service toaster;

  @action
  async downloadODRLTriplesAsText() {
    const odrlPolicyTtlResult = await fetch(
      `/dcat/dataset/${this.model.id}/policy/ttl`,
    );
    const odrlPolicy = await odrlPolicyTtlResult.json();
    const odrlPolicyTtl = odrlPolicy?.ttl;

    if (!odrlPolicyTtl) {
      this.toaster.error('ODRL-policy for dataset not found', undefined, {
        timeOut: 5000,
      });
      return;
    }

    let downloadLink = document.createElement('a');
    downloadLink.download = 'odrl-policy-triples.ttl';

    let blob = new Blob([odrlPolicyTtl], { type: 'text/turtle' });
    downloadLink.href = window.URL.createObjectURL(blob);

    downloadLink.click();
    downloadLink.remove();
  }
}
