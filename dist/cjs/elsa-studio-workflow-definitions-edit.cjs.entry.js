'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ca95b980.js');

const ElsaStudioWorkflowDefinitionsEdit = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  componentWillLoad() {
    let id = this.match.params.id;
    if (!!id && id.toLowerCase() == 'new')
      id = null;
    this.id = id;
  }
  render() {
    const id = this.id;
    return index.h("div", null, index.h("elsa-workflow-definition-editor-screen", { "server-url": this.serverUrl, "workflow-definition-id": id, "monaco-lib-path": this.monacoLibPath }));
  }
};

exports.elsa_studio_workflow_definitions_edit = ElsaStudioWorkflowDefinitionsEdit;
