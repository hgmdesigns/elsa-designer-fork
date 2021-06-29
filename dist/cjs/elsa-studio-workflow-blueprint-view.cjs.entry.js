'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ca95b980.js');

const ElsaStudioWorkflowBlueprintView = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  componentWillLoad() {
    this.id = this.match.params.id;
  }
  render() {
    const id = this.id;
    return index.h("div", null, index.h("elsa-workflow-blueprint-viewer-screen", { "server-url": this.serverUrl, workflowDefinitionId: id }));
  }
};

exports.elsa_studio_workflow_blueprint_view = ElsaStudioWorkflowBlueprintView;
