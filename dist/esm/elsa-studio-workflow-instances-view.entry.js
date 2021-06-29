import { r as registerInstance, h } from './index-efd13af9.js';

const ElsaStudioWorkflowInstancesView = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  componentWillLoad() {
    this.id = this.match.params.id;
  }
  render() {
    const id = this.id;
    return h("div", null, h("elsa-workflow-instance-viewer-screen", { "server-url": this.serverUrl, workflowInstanceId: id }));
  }
};

export { ElsaStudioWorkflowInstancesView as elsa_studio_workflow_instances_view };