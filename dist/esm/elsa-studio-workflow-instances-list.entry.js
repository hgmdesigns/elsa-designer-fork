import { r as registerInstance, h } from './index-efd13af9.js';

const ElsaStudioWorkflowInstancesList = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h("div", null, h("div", { class: "elsa-border-b elsa-border-gray-200 elsa-px-4 elsa-py-4 sm:elsa-flex sm:elsa-items-center sm:elsa-justify-between sm:elsa-px-6 lg:elsa-px-8 elsa-bg-white" }, h("div", { class: "elsa-flex-1 elsa-min-w-0" }, h("h1", { class: "elsa-text-lg elsa-font-medium elsa-leading-6 elsa-text-gray-900 sm:elsa-truncate" }, "Workflow Instances"))), h("elsa-workflow-instance-list-screen", { history: this.history, serverUrl: this.serverUrl })));
  }
};

export { ElsaStudioWorkflowInstancesList as elsa_studio_workflow_instances_list };
