import { Component, h, Prop } from '@stencil/core';
export class ElsaStudioWorkflowDefinitionsList {
  render() {
    return (h("div", null,
      h("div", { class: "elsa-border-b elsa-border-gray-200 elsa-px-4 elsa-py-4 sm:elsa-flex sm:elsa-items-center sm:elsa-justify-between sm:elsa-px-6 lg:elsa-px-8 elsa-bg-white" },
        h("div", { class: "elsa-flex-1 elsa-min-w-0" },
          h("h1", { class: "elsa-text-lg elsa-font-medium elsa-leading-6 elsa-text-gray-900 sm:elsa-truncate" }, "Workflow Definitions")),
        h("div", { class: "elsa-mt-4 elsa-flex sm:elsa-mt-0 sm:elsa-ml-4" },
          h("stencil-route-link", { url: "/workflow-definitions/new", class: "elsa-order-0 elsa-inline-flex elsa-items-center elsa-px-4 elsa-py-2 elsa-border elsa-border-transparent elsa-shadow-sm elsa-text-sm elsa-font-medium elsa-rounded-md elsa-text-white elsa-bg-blue-600 hover:elsa-bg-blue-700 focus:elsa-outline-none focus:elsa-ring-2 focus:elsa-ring-offset-2 focus:elsa-ring-blue-500 sm:elsa-order-1 sm:elsa-ml-3" }, "Create Workflow"))),
      h("elsa-workflow-definitions-list-screen", { history: this.history, serverUrl: this.serverUrl })));
  }
  static get is() { return "elsa-studio-workflow-definitions-list"; }
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
