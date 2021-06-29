import { Component, h, Prop, State } from '@stencil/core';
import { createElsaClient } from "../../../../services/elsa-client";
import Tunnel from '../../../../data/workflow-editor';
export class ElsaScriptProperty {
  constructor() {
    this.editorHeight = '6em';
    this.singleLineMode = false;
  }
  async componentWillLoad() {
    this.currentValue = this.propertyModel.expressions['Literal'];
  }
  async componentDidLoad() {
    const elsaClient = createElsaClient(this.serverUrl);
    const libSource = await elsaClient.scriptingApi.getJavaScriptTypeDefinitions(this.workflowDefinitionId, this.context);
    const libUri = 'defaultLib:lib.es6.d.ts';
    await this.monacoEditor.addJavaScriptLib(libSource, libUri);
  }
  mapSyntaxToLanguage(syntax) {
    switch (syntax) {
      case 'JavaScript':
        return 'javascript';
      case 'Liquid':
        return 'handlebars';
      case 'Literal':
      default:
        return 'plaintext';
    }
  }
  onMonacoValueChanged(e) {
    this.currentValue = e.value;
  }
  render() {
    const propertyDescriptor = this.propertyDescriptor;
    const syntax = this.syntax;
    const monacoLanguage = this.mapSyntaxToLanguage(syntax);
    const propertyName = propertyDescriptor.name;
    const fieldId = propertyName;
    const fieldName = propertyName;
    const fieldLabel = propertyDescriptor.label || propertyName;
    const fieldHint = propertyDescriptor.hint;
    const value = this.currentValue;
    return h("div", null,
      h("div", { class: "elsa-flex" },
        h("div", { class: "" },
          h("label", { htmlFor: fieldId, class: "elsa-block elsa-text-sm elsa-font-medium elsa-text-gray-700" }, fieldLabel)),
        h("div", { class: "elsa-flex-1" },
          h("div", null,
            h("div", { class: "hidden sm:elsa-block" },
              h("nav", { class: "elsa-flex elsa-flex-row-reverse", "aria-label": "Tabs" },
                h("span", { class: "elsa-bg-blue-100 elsa-text-blue-700 elsa-px-3 elsa-py-2 elsa-font-medium elsa-text-sm elsa-rounded-md" }, syntax)))))),
      h("div", { class: "elsa-mt-1" },
        h("elsa-monaco", { value: value, language: monacoLanguage, "editor-height": this.editorHeight, "single-line": this.singleLineMode, onValueChanged: e => this.onMonacoValueChanged(e.detail), ref: el => this.monacoEditor = el })),
      fieldHint ? h("p", { class: "elsa-mt-2 elsa-text-sm elsa-text-gray-500" }, fieldHint) : undefined,
      h("input", { type: "hidden", name: fieldName, value: value }));
  }
  static get is() { return "elsa-script-property"; }
  static get properties() { return {
    "propertyDescriptor": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "ActivityPropertyDescriptor",
        "resolved": "ActivityPropertyDescriptor",
        "references": {
          "ActivityPropertyDescriptor": {
            "location": "import",
            "path": "../../../../models"
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
    "propertyModel": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "ActivityDefinitionProperty",
        "resolved": "ActivityDefinitionProperty",
        "references": {
          "ActivityDefinitionProperty": {
            "location": "import",
            "path": "../../../../models"
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
    "editorHeight": {
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
      "attribute": "editor-height",
      "reflect": true,
      "defaultValue": "'6em'"
    },
    "singleLineMode": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "single-line",
      "reflect": true,
      "defaultValue": "false"
    },
    "context": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "context",
      "reflect": true
    },
    "syntax": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "syntax",
      "reflect": false
    },
    "serverUrl": {
      "type": "string",
      "mutable": true,
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
    },
    "workflowDefinitionId": {
      "type": "string",
      "mutable": true,
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
      "attribute": "workflow-definition-id",
      "reflect": false
    }
  }; }
  static get states() { return {
    "currentValue": {}
  }; }
}
Tunnel.injectProps(ElsaScriptProperty, ['serverUrl', 'workflowDefinitionId']);
