'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ca95b980.js');

const ElsaStudioWorkflowInstancesView = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  componentWillLoad() {
    this.id = this.match.params.id;
  }
  render() {
    const id = this.id;
    return index.h("div", null, index.h("elsa-workflow-instance-viewer-screen", { "server-url": this.serverUrl, workflowInstanceId: id }));
  }
};

exports.elsa_studio_workflow_instances_view = ElsaStudioWorkflowInstancesView;
