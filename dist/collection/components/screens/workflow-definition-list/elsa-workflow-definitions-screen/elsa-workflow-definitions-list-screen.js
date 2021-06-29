import { Component, h, Prop, State } from '@stencil/core';
import * as collection from 'lodash/collection';
import { createElsaClient } from "../../../../services/elsa-client";
export class ElsaWorkflowDefinitionsListScreen {
  constructor() {
    this.workflowDefinitions = { items: [], page: 1, pageSize: 50, totalCount: 0 };
  }
  async componentWillLoad() {
    await this.loadWorkflowDefinitions();
  }
  async onDeleteClick(e, workflowDefinition) {
    const result = await this.confirmDialog.show('Delete Workflow Definition', 'Are you sure you wish to permanently delete this workflow, including all of its workflow instances?');
    if (!result)
      return;
    const elsaClient = this.createClient();
    await elsaClient.workflowDefinitionsApi.delete(workflowDefinition.definitionId);
    await this.loadWorkflowDefinitions();
  }
  async loadWorkflowDefinitions() {
    const elsaClient = this.createClient();
    const page = 0;
    const pageSize = 50;
    const versionOptions = { allVersions: true };
    this.workflowDefinitions = await elsaClient.workflowDefinitionsApi.list(page, pageSize, versionOptions);
  }
  createClient() {
    return createElsaClient(this.serverUrl);
  }
  render() {
    const workflowDefinitions = this.workflowDefinitions.items;
    const groupings = collection.groupBy(workflowDefinitions, 'definitionId');
    return (h("div", null,
      h("div", { class: "elsa-align-middle elsa-inline-block elsa-min-w-full elsa-border-b elsa-border-gray-200" },
        h("table", { class: "elsa-min-w-full" },
          h("thead", null,
            h("tr", { class: "elsa-border-t elsa-border-gray-200" },
              h("th", { class: "elsa-px-6 elsa-py-3 elsa-border-b elsa-border-gray-200 elsa-bg-gray-50 elsa-text-left elsa-text-xs elsa-leading-4 elsa-font-medium elsa-text-gray-500 elsa-uppercase elsa-tracking-wider" },
                h("span", { class: "lg:elsa-pl-2" }, "Name")),
              h("th", { class: "elsa-px-6 elsa-py-3 elsa-border-b elsa-border-gray-200 elsa-bg-gray-50 elsa-text-left elsa-text-xs elsa-leading-4 elsa-font-medium elsa-text-gray-500 elsa-uppercase elsa-tracking-wider" }, "Instances"),
              h("th", { class: "hidden md:elsa-table-cell elsa-px-6 elsa-py-3 elsa-border-b elsa-border-gray-200 elsa-bg-gray-50 elsa-text-right elsa-text-xs elsa-leading-4 elsa-font-medium elsa-text-gray-500 elsa-uppercase elsa-tracking-wider" }, "Latest Version"),
              h("th", { class: "hidden md:elsa-table-cell elsa-px-6 elsa-py-3 elsa-border-b elsa-border-gray-200 elsa-bg-gray-50 elsa-text-right elsa-text-xs elsa-leading-4 elsa-font-medium elsa-text-gray-500 elsa-uppercase elsa-tracking-wider" }, "Published Version"),
              h("th", { class: "elsa-pr-6 elsa-py-3 elsa-border-b elsa-border-gray-200 elsa-bg-gray-50 elsa-text-right elsa-text-xs elsa-leading-4 elsa-font-medium elsa-text-gray-500 elsa-uppercase elsa-tracking-wider" }))),
          h("tbody", { class: "elsa-bg-white elsa-divide-y elsa-divide-gray-100" }, collection.map(groupings, group => {
            const versions = collection.orderBy(group, 'version', 'desc');
            const workflowDefinition = versions[0];
            const latestVersionNumber = workflowDefinition.version;
            const publishedVersion = versions.find(x => x.isPublished);
            const publishedVersionNumber = !!publishedVersion ? publishedVersion.version : '-';
            let workflowDisplayName = workflowDefinition.displayName;
            if (!workflowDisplayName || workflowDisplayName.trim().length == 0)
              workflowDisplayName = workflowDefinition.name;
            if (!workflowDisplayName || workflowDisplayName.trim().length == 0)
              workflowDisplayName = 'Untitled';
            const editUrl = `/workflow-definitions/${workflowDefinition.definitionId}`;
            const instancesUrl = `/workflow-instances?workflow=${workflowDefinition.definitionId}`;
            const editIcon = (h("svg", { class: "elsa-h-5 elsa-w-5 elsa-text-gray-500", width: "24", height: "24", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" },
              h("path", { d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }),
              h("path", { d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" })));
            const deleteIcon = (h("svg", { class: "elsa-h-5 elsa-w-5 elsa-text-gray-500", width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" },
              h("path", { stroke: "none", d: "M0 0h24v24H0z" }),
              h("line", { x1: "4", y1: "7", x2: "20", y2: "7" }),
              h("line", { x1: "10", y1: "11", x2: "10", y2: "17" }),
              h("line", { x1: "14", y1: "11", x2: "14", y2: "17" }),
              h("path", { d: "M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" }),
              h("path", { d: "M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" })));
            return (h("tr", null,
              h("td", { class: "elsa-px-6 elsa-py-3 elsa-whitespace-no-wrap elsa-text-sm elsa-leading-5 elsa-font-medium elsa-text-gray-900" },
                h("div", { class: "elsa-flex elsa-items-center elsa-space-x-3 lg:elsa-pl-2" },
                  h("stencil-route-link", { url: editUrl, anchorClass: "elsa-truncate hover:elsa-text-gray-600" },
                    h("span", null, workflowDisplayName)))),
              h("td", { class: "elsa-px-6 elsa-py-3 elsa-text-sm elsa-leading-5 elsa-text-gray-500 elsa-font-medium" },
                h("div", { class: "elsa-flex elsa-items-center elsa-space-x-3 lg:elsa-pl-2" },
                  h("stencil-route-link", { url: instancesUrl, anchorClass: "elsa-truncate hover:elsa-text-gray-600" }, "Instances"))),
              h("td", { class: "hidden md:elsa-table-cell elsa-px-6 elsa-py-3 elsa-whitespace-no-wrap elsa-text-sm elsa-leading-5 elsa-text-gray-500 elsa-text-right" }, latestVersionNumber),
              h("td", { class: "hidden md:elsa-table-cell elsa-px-6 elsa-py-3 elsa-whitespace-no-wrap elsa-text-sm elsa-leading-5 elsa-text-gray-500 elsa-text-right" }, publishedVersionNumber),
              h("td", { class: "elsa-pr-6" },
                h("elsa-context-menu", { history: this.history, menuItems: [
                    { text: 'Edit', anchorUrl: editUrl, icon: editIcon },
                    { text: 'Delete', clickHandler: e => this.onDeleteClick(e, workflowDefinition), icon: deleteIcon }
                  ] }))));
          })))),
      h("elsa-confirm-dialog", { ref: el => this.confirmDialog = el })));
  }
  static get is() { return "elsa-workflow-definitions-list-screen"; }
  static get properties() { return {
    "history": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "RouterHistory",
        "resolved": "RouterHistory",
        "references": {
          "RouterHistory": {
            "location": "import",
            "path": "@stencil/router"
          }
        }
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      }
    },
    "serverUrl": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "server-url",
      "reflect": false
    }
  }; }
  static get states() { return {
    "workflowDefinitions": {}
  }; }
}
