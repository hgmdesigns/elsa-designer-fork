import { Component, Prop, h } from '@stencil/core';
export class ElsaStudioWorkflowInstancesView {
  componentWillLoad() {
    this.id = this.match.params.id;
  }
  render() {
    const id = this.id;
    return h("div", null,
      h("elsa-workflow-instance-viewer-screen", { "server-url": this.serverUrl, workflowInstanceId: id }));
  }
  static get is() { return "elsa-studio-workflow-instances-view"; }
  static get properties() { return {
    "match": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "MatchResults",
        "resolved": "MatchResults",
        "references": {
          "MatchResults": {
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
