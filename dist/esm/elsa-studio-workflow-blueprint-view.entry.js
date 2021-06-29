import { r as registerInstance, h } from './index-efd13af9.js';

const ElsaStudioWorkflowBlueprintView = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  componentWillLoad() {
    this.id = this.match.params.id;
  }
  render() {
    const id = this.id;
    return h("div", null, h("elsa-workflow-blueprint-viewer-screen", { "server-url": this.serverUrl, workflowDefinitionId: id }));
  }
};

export { ElsaStudioWorkflowBlueprintView as elsa_studio_workflow_blueprint_view };
