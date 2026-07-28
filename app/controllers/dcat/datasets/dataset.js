import Controller from '@ember/controller';

import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class DcatDatasetsDatasetController extends Controller {
  @service toaster;

  @tracked isDownloadingTriples = false;

  @action
  async downloadODRLTriplesAsText() {
    this.isDownloadingTriples = true;
    let odrlPolicyTtl = null;
    try {
      const odrlPolicyTtlResult = await fetch(
        `/dcat/dataset/${this.model.id}/policy/ttl`,
      );
      const odrlPolicy = await odrlPolicyTtlResult.json();
      odrlPolicyTtl = odrlPolicy?.ttl;

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
    } catch (_error) {
      console.log(_error);
      this.toaster.error(
        'Something went wrong while fetching ODRL-policy for dataset',
        undefined,
        {
          timeOut: 5000,
        },
      );
    } finally {
      this.isDownloadingTriples = false;
    }
  }
}
