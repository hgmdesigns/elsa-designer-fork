import { Component, h, Prop } from '@stencil/core';
export class ElsaStudioWorkflowInstancesList {
  render() {
    return (h("div", null,
      h("div", { class: "elsa-border-b elsa-border-gray-200 elsa-px-4 elsa-py-4 sm:elsa-flex sm:elsa-items-center sm:elsa-justify-between sm:elsa-px-6 lg:elsa-px-8 elsa-bg-white" },
        h("div", { class: "elsa-flex-1 elsa-min-w-0" },
          h("h1", { class: "elsa-text-lg elsa-font-medium elsa-leading-6 elsa-text-gray-900 sm:elsa-truncate" }, "Workflow Instances"))),
      h("elsa-workflow-instance-list-screen", { history: this.history, serverUrl: this.serverUrl })));
  }
  static get is() { return "elsa-studio-workflow-instances-list"; }
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
      "optional": false,
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
}
