import { r as registerInstance, h } from './index-efd13af9.js';
import { a1 as collection } from './collection-ba33bbb1.js';
import { c as createElsaClient } from './elsa-client-e01ed0bb.js';
import './_commonjsHelpers-63c253cd.js';
import './domain-b51fc213.js';

const ElsaWorkflowRegistryListScreen = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.workflowBlueprints = { items: [], page: 1, pageSize: 50, totalCount: 0 };
  }
  async componentWillLoad() {
    await this.loadWorkflowBlueprints();
  }
  async loadWorkflowBlueprints() {
    const elsaClient = this.createClient();
    const page = 0;
    const pageSize = 50;
    const versionOptions = { allVersions: true };
    this.workflowBlueprints = await elsaClient.workflowRegistryApi.list(page, pageSize, versionOptions);
  }
  createClient() {
    return createElsaClient(this.serverUrl);
  }
  render() {
    const workflowBlueprints = this.workflowBlueprints.items;
    const groupings = collection.groupBy(workflowBlueprints, 'id');
    return (h("div", null, h("div", { class: "elsa-align-middle elsa-inline-block elsa-min-w-full elsa-border-b elsa-border-gray-200" }, h("table", { class: "elsa-min-w-full" }, h("thead", null, h("tr", { class: "elsa-border-t elsa-border-gray-200" }, h("th", { class: "elsa-px-6 elsa-py-3 elsa-border-b elsa-border-gray-200 elsa-bg-gray-50 elsa-text-left elsa-text-xs elsa-leading-4 elsa-font-medium elsa-text-gray-500 elsa-text-left elsa-uppercase elsa-tracking-wider" }, h("span", { class: "lg:elsa-pl-2" }, "Name")), h("th", { class: "elsa-px-6 elsa-py-3 elsa-border-b elsa-border-gray-200 elsa-bg-gray-50 elsa-text-left elsa-text-xs elsa-leading-4 elsa-font-medium elsa-text-gray-500 elsa-text-left elsa-uppercase elsa-tracking-wider" }, "Instances"), h("th", { class: "hidden md:elsa-table-cell elsa-px-6 elsa-py-3 elsa-border-b elsa-border-gray-200 elsa-bg-gray-50 elsa-text-xs elsa-leading-4 elsa-font-medium elsa-text-gray-500 elsa-text-right elsa-uppercase elsa-tracking-wider" }, "Latest Version"), h("th", { class: "hidden md:elsa-table-cell elsa-px-6 elsa-py-3 elsa-border-b elsa-border-gray-200 elsa-bg-gray-50 elsa-text-xs elsa-leading-4 elsa-font-medium elsa-text-gray-500 elsa-text-right elsa-uppercase elsa-tracking-wider" }, "Published Version"), h("th", { class: "elsa-pr-6 elsa-py-3 elsa-border-b elsa-border-gray-200 elsa-bg-gray-50 elsa-text-xs elsa-leading-4 elsa-font-medium elsa-text-gray-500 elsa-text-left elsa-uppercase elsa-tracking-wider" }))), h("tbody", { class: "elsa-bg-white elsa-divide-y elsa-divide-gray-100" }, collection.map(groupings, group => {
      const versions = collection.orderBy(group, 'version', 'desc');
      const workflowBlueprint = versions[0];
      const latestVersionNumber = workflowBlueprint.version;
      const publishedVersion = versions.find(x => x.isPublished);
      const publishedVersionNumber = !!publishedVersion ? publishedVersion.version : '-';
      let workflowDisplayName = workflowBlueprint.displayName;
      if (!workflowDisplayName || workflowDisplayName.trim().length == 0)
        workflowDisplayName = workflowBlueprint.name;
      if (!workflowDisplayName || workflowDisplayName.trim().length == 0)
        workflowDisplayName = 'Untitled';
      const editUrl = `/workflow-registry/${workflowBlueprint.id}`;
      const instancesUrl = `/workflow-instances?workflow=${workflowBlueprint.id}`;
      const editIcon = (h("svg", { class: "elsa-h-5 elsa-w-5 elsa-text-gray-500", width: "24", height: "24", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }), h("path", { d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" })));
      return (h("tr", null, h("td", { class: "elsa-px-6 elsa-py-3 elsa-whitespace-no-wrap elsa-text-sm elsa-leading-5 elsa-font-medium elsa-text-gray-900" }, h("div", { class: "elsa-flex elsa-items-center elsa-space-x-3 lg:elsa-pl-2" }, h("stencil-route-link", { url: editUrl, anchorClass: "elsa-truncate hover:elsa-text-gray-600" }, h("span", null, workflowDisplayName)))), h("td", { class: "elsa-px-6 elsa-py-3 elsa-text-sm elsa-leading-5 elsa-text-gray-500 elsa-font-medium" }, h("div", { class: "elsa-flex elsa-items-center elsa-space-x-3 lg:elsa-pl-2" }, h("stencil-route-link", { url: instancesUrl, anchorClass: "elsa-truncate hover:elsa-text-gray-600" }, "Instances"))), h("td", { class: "hidden md:elsa-table-cell elsa-px-6 elsa-py-3 elsa-whitespace-no-wrap elsa-text-sm elsa-leading-5 elsa-text-gray-500 elsa-text-right" }, latestVersionNumber), h("td", { class: "hidden md:elsa-table-cell elsa-px-6 elsa-py-3 elsa-whitespace-no-wrap elsa-text-sm elsa-leading-5 elsa-text-gray-500 elsa-text-right" }, publishedVersionNumber), h("td", { class: "elsa-pr-6" }, h("elsa-context-menu", { history: this.history, menuItems: [
          { text: 'Edit', anchorUrl: editUrl, icon: editIcon },
        ] }))));
    }))))));
  }
};

export { ElsaWorkflowRegistryListScreen as elsa_workflow_registry_list_screen };
