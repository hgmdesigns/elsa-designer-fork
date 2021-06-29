import { r as registerInstance, h } from './index-efd13af9.js';

const ElsaStudioWorkflowDefinitionsEdit = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  componentWillLoad() {
    let id = this.match.params.id;
    if (!!id && id.toLowerCase() == 'new')
      id = null;
    this.id = id;
  }
  render() {
    const id = this.id;
    return h("div", null, h("elsa-workflow-definition-editor-screen", { "server-url": this.serverUrl, "workflow-definition-id": id, "monaco-lib-path": this.monacoLibPath }));
  }
};

export { ElsaStudioWorkflowDefinitionsEdit as elsa_studio_workflow_definitions_edit };
